const spawnChild = async (body, profile, uniqueDir, homeDir, unlock) => {
    const { exec } = require("child_process");
    let Client = require("ssh2-sftp-client");
    const fs = require("fs");
    const path = require("path");

    const logfile = path.join(uniqueDir, "biseps.txt");
    const output = fs.openSync(logfile, "a");
    const workflow = path.join(__dirname, "../resources/biseps/");
    const command =
        process.platform == "win32"
            ? "conda"
            : `$(head -n 1 $HOME/.conda/environments.txt)/bin/conda`;
    const options = {
        slient: false,
        // detached: true,
        shell: true,
        // stdio: ["ignore", output, output],
    };
    if (body.remote) {
        const host = {
            host: body.machine.hostname,
            port: body.machine.port,
            username: body.machine.username,
            ...(!(body.machine.privateKey === "") && {
                privateKey: require("fs").readFileSync(body.machine.privateKey),
            }),
            password: body.machine.password,
        };
        if (
            !fs.existsSync(path.join(uniqueDir, "workflow.tar.gz")) &&
            !body.rerun
        ) {
            const child = exec(
                `${command} run -n bisepsSnakemake --cwd ${uniqueDir} --no-capture-output --live-stream snakemake --profile ${profile} --config platform="other" --archive workflow.tar.gz`,
                options
            );

            let data = "";
            for await (const chunk of child.stdout) {
                console.log("stdout chunk: " + chunk);

                data += chunk;
            }
            let error = "";
            for await (const chunk of child.stderr) {
                console.error("stderr chunk: " + chunk);

                error += chunk;
            }
            const exitCode = await new Promise((resolve, reject) => {
                child.on("close", resolve);
            });

            if (exitCode) {
                const filename = `${uniqueDir}/failed.archive.lock`;
                fs.closeSync(fs.openSync(filename, "w"));
                // throw new Error(`subprocess error exit ${exitCode}, ${error}`);
            } else {
                const filename = `${uniqueDir}/archive.lock`;
                fs.closeSync(fs.openSync(filename, "w"));
                if (fs.existsSync(filename)) {
                    fs.unlinkSync(filename);
                }
            }
        }
        const connect = require("ssh2-connect");
        const execs = require("ssh2-exec");
        connect(host, function (err, ssh) {
            execs(
                "ls > testing.ls.txt",
                { ssh: ssh },
                (err, stdout, stderr) => {
                    console.log(stdout);
                }
            );
        });
        let sftp = new Client();
        sftp.connect(host)
            .then(() => {
                return sftp.exists(path.join(homeDir, "workflow.tar.gz"));
            })
            .then((data) => {
                if (!data) {
                    sftp.mkdir(homeDir);
                    return sftp.fastPut(
                        path.join(uniqueDir, "workflow.tar.gz"),
                        path.join(homeDir, "workflow.tar.gz")
                    );
                }
            })
            .then((data) => {
                console.log("Snakemake in remote");
                if (body.cluster) {
                    connect(host, function (err, ssh) {
                        execs(
                            `${
                                body.rerun
                                    ? `cd ${homeDir}`
                                    : `cd ${homeDir} && tar -xf workflow.tar.gz  &&  rm -rf .snakemake/`
                            }  && sbatch exec_scripts/${
                                "contexts" in body
                                    ? "slurmComparison.sh " + unlock
                                    : "slurmScript.sh " + unlock
                            }`,
                            { ssh: ssh },
                            (err, stdout, stderr) => {
                                console.log("stdout is:", stdout);
                                console.log("stderr is:", stderr);
                                console.log("errors is:", err);
                            }
                        );
                    });
                } else {
                    connect(host, function (err, ssh) {
                        execs(
                            `${
                                body.rerun
                                    ? `cd ${homeDir}`
                                    : `cd ${homeDir} && tar -xf workflow.tar.gz  &&  rm -rf .snakemake/`
                            }    &&  bash exec_scripts/${
                                "contexts" in body
                                    ? "localComparison.sh " + unlock
                                    : "localScript.sh " + unlock
                            } `,
                            { ssh: ssh },
                            (err, stdout, stderr) => {
                                console.log("stdout is:", stdout);
                                console.log("stderr is:", stderr);
                                console.log("errors is:", err);
                            }
                        );
                    });
                }

                sftp.end();
            })
            .catch((err) => {
                console.log(err, "catch error");
            });
    } else {
        const child = exec(
            `${
                unlock
                    ? `${command} run -n bisepsSnakemake --cwd ${workflow} --no-capture-output --live-stream snakemake --profile ${profile} --unlock 2> ${uniqueDir}/biseps.txt`
                    : `true 2> ${uniqueDir}/biseps.txt `
            }` +
                `&& ${command} run -n bisepsSnakemake --cwd ${workflow} --no-capture-output --live-stream snakemake --profile ${profile} 2>> ${uniqueDir}/biseps.txt &&  ${command} run -n bisepsSnakemake --cwd ${workflow} --no-capture-output --live-stream snakemake --profile ${profile} --report ${uniqueDir}/report.html 2>> ${uniqueDir}/biseps.txt`,
            options
        );

        let data = "";
        for await (const chunk of child.stdout) {
            console.log("stdout chunk: " + chunk);
            data += chunk;
        }
        let error = "";
        for await (const chunk of child.stderr) {
            console.error("stderr chunk: " + chunk);
            error += chunk;
        }
        const exitCode = await new Promise((resolve, reject) => {
            child.on("close", resolve);
        });
        const failed = `${uniqueDir}/failed.lock`;

        if (exitCode) {
            fs.closeSync(fs.openSync(failed, "w"));
            // throw new Error(`subprocess error exit ${exitCode}, ${error}`);
        } else {
            if (fs.existsSync(failed)) {
                fs.unlinkSync(failed);
            }
        }
        return data;
    }
};
module.exports = spawnChild;
