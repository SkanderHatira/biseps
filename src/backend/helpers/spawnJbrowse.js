const spawnChild = (body) => {
    const { execFileSync, fork, spawn, exec } = require("child_process");
    const handler = require("serve-handler");
    const http = require("http");
    const path = require("path");
    console.log("hereeeeee");

    const script = path.join(__dirname, "../../resources/jbrowse.sh");
    const workflow = path.join(__dirname, "../../resources/jbrowse2");
    const bams = "";
    const options = {
        slient: false,
        detached: false,
    };

    // const child = execFileSync(
    //     script,
    //     [uniqueDir, `${body.genomes}`, bams, workflow, body.port],
    //     options
    // );
    body.genomes.map((genome) => {
        console.log(path.extname(genome));

        exec(
            `jbrowse add-assembly ${genome} --load copy --out ${body.jbPath}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
            }
        );

        // const arrAss = [];
        // console.log("before", arrAss);
        // config.assemblies.map((assembly) => {
        //     arrAss.push(assembly.name);
        // });
        // const assemblies = arrAss.join(",");
        // console.log(assemblies);
        // --assemblyNames \'${assemblies}\' in exec command
        // no need for npx , node modules available in exec commands directly
    });
    body.tracks.map((track) => {
        exec(
            `jbrowse add-track ${track.track} --load copy --assemblyNames ${track.associatedGenome} --name \'${track.name}\' --subDir ${track.associatedGenome}   --trackId ${track.id} --out ${body.jbPath}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.log("bigerror");

                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                console.log("success");
            }
        );
    });

    // const child = spawn("npx", ["jbrowse", "-h"], options);
    // console.log(body.port);

    // const server = http.createServer((request, response) => {
    //     // You pass two more arguments for config and middleware
    //     // More details here: https://github.com/vercel/serve-handler#options
    //     return handler(request, response, { public: uniqueDir });
    // });
    // const child = spawn(
    //     "bash",
    //     [script, outdir, `${body.genomes}`, bams, workflow, body.port],
    //     options
    // );

    // let data = "";
    // for await (const chunk of child.stdout) {
    //     console.log("stdout chunk: " + chunk);
    //     data += chunk;
    // }
    // q;
    // let error = "";
    // for await (const chunk of child.stderr) {
    //     console.error("stderr chunk: " + chunk);
    //     error += chunk;
    // }
    // const exitCode = await new Promise((resolve, reject) => {
    //     child.on("close", resolve);
    // });

    // if (exitCode) {
    //     throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    // }
    // return data;
    // server.listen(body.port, () => {
    //     console.log(`Running at http://localhost:${body.port}`);
    // });
};
module.exports = spawnChild;