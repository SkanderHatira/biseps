const spawnChild = async (
    body,
    profile,
    uniqueDir,
    uniqueDirRemote,
    homeDir
) => {
    const { execFile, exec } = require("child_process");
    let Client = require("ssh2-sftp-client");
    const path = require("path");
    const env = path.join(__dirname, "../resources/snakemake/bin");
    const slurmScript = path.join(__dirname, "../resources/slurmScript.sh");
    const remoteScript = path.join(
        __dirname,
        "../resources/remoteSnakemake.sh"
    );
    const localScript = path.join(__dirname, "../resources/snakemake.sh");
    const workflow = path.join(__dirname, "../resources/bissprop/");
    const conda = "/local/env/envconda.sh";
    const options = {
        slient: false,
        detached: true,
    };
    if (body.remote) {
        const host = {
            host: body.machine.hostname,
            port: body.machine.port,
            username: body.machine.username,
            privateKey: require("fs").readFileSync(body.machine.privateKey),
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
            throw new Error(`subprocess error exit ${exitCode}, ${error}`);
        }

        const connect = require("ssh2-connect");
        const exec = require("ssh2-exec");
        connect(host, function (err, ssh) {
            exec("ls > testing.ls.txt", { ssh: ssh }, (err, stdout, stderr) => {
                console.log(stdout);
            });
        });
        console.log(uniqueDir);
        let sftp = new Client();
        sftp.connect(host)
            .then(() => {
                sftp.mkdir(homeDir);
                return sftp.fastPut(
                    path.join(uniqueDir, "workflow.tar.gz"),
                    path.join(homeDir, "workflow.tar.gz")
                );
            })
            .then((data) => {
                console.log("Snakemake in remote");
                if (body.cluster) {
                    connect(host, function (err, ssh) {
                        exec(
                            `cd ${homeDir} && tar -xf workflow.tar.gz  &&  rm -rf ${homeDir}/.snakemake && sbatch slurmScript.sh > slurm.out.txt `,
                            { ssh: ssh },
                            (err, stdout, stderr) => {
                                console.log(stdout);
                            }
                        );
                    });
                } else {
                    connect(host, function (err, ssh) {
                        exec(
                            `cd ${homeDir} && tar -xf workflow.tar.gz  && rm -rf ${homeDir}/.snakemake && bash localScript.sh > local.out.txt`,
                            { ssh: ssh },
                            (err, stdout, stderr) => {
                                console.log(stdout);
                            }
                        );
                    });
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
            throw new Error(`subprocess error exit ${exitCode}, ${error}`);
        }
        return data;
    }
};
module.exports = spawnChild;
