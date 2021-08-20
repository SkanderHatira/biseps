const spawnChild = async (body, profile, uniqueDir, homeDir) => {
    const { execFile, exec, spawn } = require("child_process");
    let Client = require("ssh2-sftp-client");
    const path = require("path");
    const env = path.join(__dirname, "../resources/snakemake/bin");
    const remoteScript = path.join(
        __dirname,
        "../resources/remoteSnakemake.sh"
    );
    const localScript = path.join(__dirname, "../resources/snakemake.sh");
    const workflow = path.join(__dirname, "../resources/biseps/");
    const options = {
        slient: false,
        detached: true,
    };
    console.log("so far so good");
    console.log("so far so good");

    console.log("so far so good");
    console.log("so far so good");
    console.log("so far so good");
    console.log("so far so good");

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

        const child = execFile(
            remoteScript,
            [env, profile, uniqueDir],
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
            // throw new Error(`subprocess error exit ${exitCode}, ${error}`);
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
                if (!sftp.exists(path.join(homeDir, "workflow.tar.gz"))) {
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
                            `cd ${homeDir} && tar -xf workflow.tar.gz  &&  rm -rf .snakemake/  && sbatch exec_scripts/${
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
                            `cd ${homeDir} && tar -xf workflow.tar.gz  && rm -rf .snakemake/ && source exec_scripts/script.sh &&  bash exec_scripts/${
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
        console.log("this is env", env);
        console.log("this is profile", profile);
        console.log(options);
        console.log("this is workflow", workflow);
        // const child = spawn(
        //     process.platform === "darwin" ? "bash" : "bash",

        //     [localScript, env, profile, workflow],
        //     options
        // );
        // const child = exec(
        //     `bash ${localScript} ${env} ${profile} ${workflow} > ${logfile}`,
        //     options
        // );

        const child = execFile(localScript, [env, profile, workflow], options);
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
            // throw new Error(`subprocess error exit ${exitCode}, ${error}`);
        }
        return data;
    }
};
module.exports = spawnChild;
