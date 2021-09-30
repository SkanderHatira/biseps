const spawnChild = (body) => {
    const { execFileSync, fork, spawn, exec } = require("child_process");
    const handler = require("serve-handler");
    const http = require("http");
    const path = require("path");
    console.log("hereeeeee");
    const jbrowse = path.join(
        __dirname,
        `../node_modules/@jbrowse/cli/bin/run${
            process.platform == "win32" ? ".cmd" : ""
        }`
    );
    const script = path.join(__dirname, "../../resources/jbrowse.sh");
    const workflow = path.join(__dirname, "../../resources/jbrowse2");
    const bams = path.join(__dirname, "../node_modules/.bin/jbrowse");
    const options = {
        slient: false,
        detached: false,
        cwd: __dirname,
    };

    // const child = execFileSync(
    //     script,
    //     [uniqueDir, `${body.genomes}`, bams, workflow, body.port],
    //     options
    // );
    body.genomes != [] &&
        body.genomes.map((genome) => {
            console.log(path.extname(genome));
            console.log(`Current directory: ${process.cwd()} | ${__dirname}`);

            fork(
                jbrowse,
                [
                    "add-assembly",
                    genome,
                    "--load",
                    "copy",
                    "--out",
                    body.jbPath,
                ],
                options
            );
            // child = fork(path.join(__dirname, "./node_modules/.bin/jbrowse"), [
            //     "add-assembly",
            //     genome,
            //     "--load",
            //     "copy",
            //     "--out",
            //     body.jbPath,
            // ]);
            // exec(
            //     `${path.join(
            //         __dirname,
            //         "../node_modules/@jbrowse/cli/bin/run"
            //     )} add-assembly ${genome} --load copy --out ${body.jbPath}`,
            //     (error, stdout, stderr) => {
            //         if (error) {
            //             console.log("bigerror");

            //             console.error(`exec error: ${error}`);
            //             return;
            //         }
            //         console.log(`stdout: ${stdout}`);
            //         console.error(`stderr: ${stderr}`);
            //         console.log("success");
            //     }
            // );

            // const arrAss = [];
            // console.log("before", arrAss);
            // config.assemblies.map((assembly) => {
            //     arrAss.push(assembly.name);
            // });
            // const assemblies = arrAss.join(",");
            // console.log(assemblies);
            // --assemblyNames \'${assemblies}\' in exec command
            // no need for npx , node modules available in exec commands directly
            // let data = "";
            // for await (const chunk of child.stdout) {
            //     console.log("stdout chunk: " + chunk);
            //     data += chunk;
            // }

            // let error = "";
            // for await (const chunk of child.stderr) {
            //     console.error("stderr chunk: " + chunk);
            //     error += chunk;
            // }
            // const exitCode = await new Promise((resolve, reject) => {
            //     child.on("close", resolve);
            // });

            // if (exitCode) {
            //     // throw new Error(`subprocess error exit ${exitCode}, ${error}`);
            // }
            // return data;
        });
    body.tracks != [] &&
        body.tracks.map((track) => {
            // import bam
            console.log(
                `${body.jbPath}/${track.associatedGenome}/${track.id}_bam.lock`
            );

            fork(
                jbrowse,
                [
                    "add-track",
                    track.track,
                    "--load",
                    "copy",
                    "--assemblyNames",
                    track.associatedGenome,
                    "--out",
                    body.jbPath,
                    "--category",
                    "Alignments",
                    "--name",
                    `${track.name}_bam`,
                    "--subDir",
                    track.associatedGenome,
                ],
                options
            );
            // exec(
            //     `${path.join(
            //         __dirname,
            //         "../node_modules/@jbrowse/cli/bin/run"
            //     )} add-track ${
            //         track.track
            //     } --load copy --category \'Alignments\' --assemblyNames ${
            //         track.associatedGenome
            //     } --name \'${track.name}_bam\' --subDir ${
            //         track.associatedGenome
            //     }   --out ${body.jbPath} && touch ${body.jbPath}/${
            //         track.associatedGenome
            //     }/${track.id}_bam.lock`,
            //     (error, stdout, stderr) => {
            //         if (error) {
            //             console.log("bigerror");

            //             console.error(`exec error: ${error}`);
            //             return;
            //         }
            //         console.log(`stdout: ${stdout}`);
            //         console.error(`stderr: ${stderr}`);
            //         console.log("success");
            //     }
            // );
            // import bigwig_cg

            fork(
                jbrowse,
                [
                    "add-track",
                    track.cgbw,
                    "--load",
                    "copy",
                    "--assemblyNames",
                    track.associatedGenome,
                    "--out",
                    body.jbPath,
                    "--category",
                    "Methylation Count In CG Context",
                    "--name",
                    `${track.name}_cg`,
                    "--subDir",
                    track.associatedGenome,
                ],
                options
            );
            // exec(
            //     `${path.join(
            //         __dirname,
            //         "../node_modules/@jbrowse/cli/bin/run"
            //     )} add-track ${
            //         track.cgbw
            //     } --load copy --category \'Methylation Count In CG Context\' --assemblyNames ${
            //         track.associatedGenome
            //     } --name \'${track.name}_cg\' --subDir ${
            //         track.associatedGenome
            //     }  --out ${body.jbPath}`,
            //     (error, stdout, stderr) => {
            //         if (error) {
            //             console.log("bigerror");
            //             console.error(`exec error: ${error}`);
            //             return;
            //         }
            //         console.log(`stdout: ${stdout}`);
            //         console.error(`stderr: ${stderr}`);
            //         console.log("success");
            //     }
            // );
            // import bigwig_chg
            fork(
                jbrowse,
                [
                    "add-track",
                    track.chgbw,
                    "--load",
                    "copy",
                    "--assemblyNames",
                    track.associatedGenome,
                    "--out",
                    body.jbPath,
                    "--category",
                    "Methylation Count In CHG Context",
                    "--name",
                    `${track.name}_chg`,
                    "--subDir",
                    track.associatedGenome,
                ],
                options
            );
            // exec(
            //     `${path.join(
            //         __dirname,
            //         "../node_modules/@jbrowse/cli/bin/run"
            //     )} add-track ${
            //         track.chgbw
            //     } --load copy --category \'Methylation Count In CHG Context\' --assemblyNames ${
            //         track.associatedGenome
            //     } --name \'${track.name}_chg\' --subDir ${
            //         track.associatedGenome
            //     }  --out ${body.jbPath}`,
            //     (error, stdout, stderr) => {
            //         if (error) {
            //             console.log("bigerror");

            //             console.error(`exec error: ${error}`);
            //             return;
            //         }
            //         console.log(`stdout: ${stdout}`);
            //         console.error(`stderr: ${stderr}`);
            //         console.log("success");
            //     }
            // );
            // import bigwig_chh

            fork(
                jbrowse,
                [
                    "add-track",
                    track.chhbw,
                    "--load",
                    "copy",
                    "--assemblyNames",
                    track.associatedGenome,
                    "--out",
                    body.jbPath,
                    "--category",
                    "Methylation Count In CHH Context",
                    "--name",
                    `${track.name}_chh`,
                    "--subDir",
                    track.associatedGenome,
                ],
                options
            );
            // exec(
            //     `${path.join(
            //         __dirname,
            //         "../node_modules/@jbrowse/cli/bin/run"
            //     )} add-track ${
            //         track.chhbw
            //     } --category \'Methylation Count In CHH Context\' --load copy --assemblyNames ${
            //         track.associatedGenome
            //     } --name \'${track.name}_chh\' --subDir ${
            //         track.associatedGenome
            //     }  --out ${body.jbPath}`,
            //     (error, stdout, stderr) => {
            //         if (error) {
            //             console.log("bigerror");

            //             console.error(`exec error: ${error}`);
            //             return;
            //         }
            //         console.log(`stdout: ${stdout}`);
            //         console.error(`stderr: ${stderr}`);
            //         console.log("success");
            //     }
            // );
            // import bigwig_bedgraph
            fork(
                jbrowse,
                [
                    "add-track",
                    track.bedbw,
                    "--load",
                    "copy",
                    "--assemblyNames",
                    track.associatedGenome,
                    "--out",
                    body.jbPath,
                    "--category",
                    "Global Methylation Profile",
                    "--name",
                    `${track.name}_bedgraph`,
                    "--subDir",
                    track.associatedGenome,
                ],
                options
            );
            // exec(
            //     `${path.join(
            //         __dirname,
            //         "../node_modules/@jbrowse/cli/bin/run"
            //     )} add-track ${
            //         track.bedbw
            //     } --category \'global methylation profile\'  --load copy --assemblyNames ${
            //         track.associatedGenome
            //     } --name \'${track.name}_bedgraph\' --subDir ${
            //         track.associatedGenome
            //     }  --out ${body.jbPath}`,
            //     (error, stdout, stderr) => {
            //         if (error) {
            //             console.log("bigerror");

            //             console.error(`exec error: ${error}`);
            //             return;
            //         }
            //         console.log(`stdout: ${stdout}`);
            //         console.error(`stderr: ${stderr}`);
            //         console.log("success");
            //     }
            // );
        });
    body.comparisons != [] &&
        body.comparisons.map((comparison) => {
            // import import_bedgz and index
            fork(
                jbrowse,
                [
                    "add-track",
                    comparison.bed,
                    "--load",
                    "copy",
                    "--assemblyNames",
                    comparison.associatedGenome,
                    "--out",
                    body.jbPath,
                    "--category",
                    "Differentially Methylated Regions",
                    "--name",
                    `${comparison.id}`,
                    "--subDir",
                    comparison.associatedGenome,
                ],
                options
            );
            // exec(
            //     `${path.join(
            //         __dirname,
            //         "../node_modules/@jbrowse/cli/bin/run"
            //     )} add-track ${
            //         comparison.bed
            //     }   --category \'Differentially Methylated Regions\'  --load copy --assemblyNames ${
            //         comparison.associatedGenome
            //     } --name \'${comparison.id}\' --subDir ${
            //         comparison.associatedGenome
            //     }  --out ${body.jbPath}`,
            //     (error, stdout, stderr) => {
            //         if (error) {
            //             console.log("bigerror");

            //             console.error(`exec error: ${error}`);
            //             return;
            //         }
            //         console.log(`stdout: ${stdout}`);
            //         console.error(`stderr: ${stderr}`);
            //         console.log("success");
            //     }
            // );
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
