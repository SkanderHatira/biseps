const spawnChild = async (body, profile, uniqueDir, homeDir, unlock) => {
    const { execFile, exec, spawn } = require("child_process");
    let Client = require("ssh2-sftp-client");
    const fs = require("fs");
    const path = require("path");
    const getMostRecentFile = (dir) => {
        const files = orderReccentFiles(dir);
        return files.length ? files[0] : undefined;
    };

    const logfile = path.join(uniqueDir, "biseps.txt");
    console.log(logfile);
    const output = fs.openSync(logfile, "a");
    const workflow = path.join(__dirname, "../resources/biseps/");
    const command = "conda";
    const options = {
        slient: false,
        detached: true,
        shell: true,
        stdio: ["ignore", output, output],
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
        const child = spawn(
            command,
            [
                "run",
                "-n",
                "bisepsSnakemake",
                "--cwd",
                uniqueDir,
                "--no-capture-output",
                "--live-stream",
                "snakemake",
                "--profile",
                profile,
                "--archive",
                "workflow.tar.gz",
            ],
            options
        );
        // const child = execFile(
        //     remoteScript,
        //     [env, profile, uniqueDir, shell],
        //     options
        // );
        let data = "";
        for await (const chunk of child.stdout) {
            console.log("stdout chunk: " + chunk);
            fs.appendFile(logfile, chunk, function (err) {
                if (err) throw err;
                console.log("Saved!");
            });
            data += chunk;
        }
        let error = "";
        for await (const chunk of child.stderr) {
            console.error("stderr chunk: " + chunk);
            fs.appendFile(logfile, chunk, function (err) {
                if (err) throw err;
                console.log("Saved!");
            });
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
            console.log(data, err);
            const filename = `${uniqueDir}/archive.lock`;
            fs.closeSync(fs.openSync(filename, "w"));
        }

        const connect = require("ssh2-connect");
        const exec = require("ssh2-exec");
        connect(host, function (err, ssh) {
            exec("ls > testing.ls.txt", { ssh: ssh }, (err, stdout, stderr) => {
                console.log(stdout);
            });
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
                        exec(
                            `${
                                body.rerun
                                    ? `cd ${homeDir}`
                                    : `cd ${homeDir} && tar -xf workflow.tar.gz  &&  rm -rf .snakemake/`
                            }  && sbatch exec_scripts/${
                                "contexts" in body
                                    ? "slurmComparison.sh"
                                    : "slurmScript.sh"
                            }`,
                            { ssh: ssh },
                            (err, stdout, stderr) => {
                                console.log("stdout is:", stdout);
                                console.log("stderr is:", stderr);
                                console.log("errors is:", err);
                            }
                        );
                        // exec(
                        //     `cd ${homeDir} &&  sbatch slurmScript.sh`,
                        //     { ssh: ssh },
                        //     (err, stdout, stderr) => {
                        //         console.log(stdout);
                        //     }
                        // );
                    });
                    // connect(host, function (err, ssh) {
                    //     child = exec(
                    //         {
                    //             command: `cd ${homeDir} && sbatch slurmScript.sh`,
                    //             ssh: ssh,
                    //         },
                    //         function (err, stdout, stderr) {
                    //             console.log(stdout);
                    //         }
                    //     );
                    //     child.stdout.on("data", function (data) {
                    //         console.log(data);
                    //     });
                    //     child.on("exit", function (code) {
                    //         console.log("Exit", code);
                    //     });
                    // });
                } else {
                    connect(host, function (err, ssh) {
                        exec(
                            `${
                                body.rerun
                                    ? `cd ${homeDir}`
                                    : `cd ${homeDir} && tar -xf workflow.tar.gz  &&  rm -rf .snakemake/`
                            }    &&  bash exec_scripts/${
                                "contexts" in body
                                    ? "localComparison.sh"
                                    : "localScript.sh"
                            } `,
                            { ssh: ssh },
                            (err, stdout, stderr) => {
                                console.log("stdout is:", stdout);
                                console.log("stderr is:", stderr);
                                console.log("errors is:", err);
                            }
                        );
                    });
                    // connect(host, function (err, ssh) {
                    //     child = exec(
                    //         {
                    //             command: `cd ${homeDir} && source localScript.sh`,
                    //             ssh: ssh,
                    //         },
                    //         function (err, stdout, stderr) {
                    //             console.log(stdout);
                    //         }
                    //     );
                    //     child.stdout.on("data", function (data) {
                    //         console.log(data);
                    //     });
                    //     child.on("exit", function (code) {
                    //         console.log("Exit", code);
                    //     });
                    // });
                    // const child = execFile(
                    //     localScript,
                    //     [env, profile, workflow],
                    //     options
                    // );
                }

                sftp.end();
            })
            .catch((err) => {
                console.log(err, "catch error");
            });
    } else {
        // const child = spawn(
        //     process.platform === "darwin" ? "bash" : "bash",

        //     [localScript, env, profile, workflow],
        //     options
        // );
        // const child = exec(
        //     `bash ${localScript} ${env} ${profile} ${workflow} > ${logfile}`,
        //     options
        // );
        const child = spawn(
            command,
            [
                "run",
                "-n",
                "bisepsSnakemake",
                "--cwd",
                workflow,
                "--no-capture-output",
                "--live-stream",
                "snakemake",
                "--profile",
                profile,
            ],
            options
        );
        // var scriptOutput = "";

        // child.stdout.setEncoding("utf8");
        // child.stdout.on("data", function (data) {
        //     //Here is where the output goes

        //     console.log("stdout: " + data);

        //     data = data.toString();
        //     scriptOutput += data;
        //     fs.appendFile(logfile, data, function (err) {
        //         if (err) throw err;
        //         console.log("Saved!");
        //     });
        // });

        // child.stderr.setEncoding("utf8");
        // child.stderr.on("data", function (data) {
        //     //Here is where the error output goes

        //     console.log("stderr: " + data);

        //     data = data.toString();
        //     scriptOutput += data;
        //     fs.appendFile(logfile, data, function (err) {
        //         if (err) throw err;
        //         console.log("Saved!");
        //     });
        // });

        // child.on("close", function (code) {
        //     //Here you can get the exit code of the script

        //     console.log("closing code: " + code);

        //     console.log("Full output of script: ", scriptOutput);
        // });
        // const child = execFile(
        //     localScript,
        //     [env, profile, workflow, shell, unlock],
        //     options
        // );
        let data = "";
        for await (const chunk of child.stdout) {
            console.log("stdout chunk: " + chunk);
            data += chunk;
            // fs.appendFile(logfile, chunk, function (err) {
            //     if (err) throw err;
            //     console.log("Saved!");
            // });
        }
        let error = "";
        for await (const chunk of child.stderr) {
            console.error("stderr chunk: " + chunk);
            error += chunk;
            // fs.appendFile(logfile, chunk, function (err) {
            //     if (err) throw err;
            //     console.log("Saved!");
            // });
        }
        const exitCode = await new Promise((resolve, reject) => {
            child.on("close", resolve);
        });

        if (exitCode) {
            const filename = `${uniqueDir}/failed.lock`;
            fs.closeSync(fs.openSync(filename, "w"));
            // throw new Error(`subprocess error exit ${exitCode}, ${error}`);
        }
        return data;
    }
};
module.exports = spawnChild;
