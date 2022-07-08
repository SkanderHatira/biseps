const spawnChild = (body) => {
    const { fork } = require("child_process");
    const fs = require("fs");
    const fsPromises = fs.promises;
    const path = require("path");

    const jbrowse = path.join(
        __dirname,
        "..",
        "node_modules",
        "@jbrowse",
        "cli",
        "bin",
        "run"
    );
    const jbrowsebin = path.join(
        "./",
        __dirname,
        "..",
        "node_modules",
        ".bin",
        "jbrowse"
    );
    async function readThenClose() {
        let filehandle = null;

        try {
            // Using the filehandle method
            filehandle = await fsPromises.open(
                path.join(body.jbPath, "config.json"),
                "r+"
            );

            const data = await filehandle.readFile("utf8");

            console.log(data);

            filehandle.close();
            console.log("File Closed!");
        } catch (e) {
            console.log("Error", e);
        }
    }

    async function addTrack(track) {
        const keys = ["track", "cgbw", "chgbw", "chhbw", "bedbw"];
        keys.forEach((key) => {
            console.log(key);

            child = fork(
                jbrowse,
                [
                    "add-track",
                    path.basename(track[key]),
                    "--load",
                    "copy",
                    "--assemblyNames",
                    track.associatedGenome,
                    "--out",
                    body.jbPath,
                    "--category",
                    `Alignment_${track.name}`,
                    "--name",
                    `${path.basename(track[key])}`,
                    "--subDir",
                    track.associatedGenome,
                    "--trackId",
                    `${track.id}_${track[key]}`,
                    "--target",
                    `${path.join(body.jbPath, "config.json")}`,
                ],
                { ...options, cwd: path.dirname(track[key]) }
            );

            child.on("error", (error) => console.log(console.log(error)));
            child.on("close", () => {
                // readThenClose().catch((error) => {
                //     console.log("Error", error);
                // });
                console.log("success alignment");
            });
        });
    }
    const options = {
        silent: true,
        detached: false,
    };

    body.genomes != [] &&
        body.genomes.forEach((genome) => {
            try {
                fork(
                    jbrowse,
                    [
                        "add-assembly",
                        path.basename(genome),
                        "--load",
                        "copy",
                        "--out",
                        body.jbPath,
                    ],
                    { ...options, cwd: path.dirname(genome) }
                );
            } catch (err) {
                console.log(err);
            }
        });
    body.tracks != [] &&
        body.tracks.forEach((track) => {
            // import bam

            addTrack(track);
        });

    body.comparisons != [] &&
        body.comparisons.forEach((comparison) => {
            // import import_bedgz and index

            child = fork(
                jbrowse,
                [
                    "add-track",
                    path.basename(comparison.bed),
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
                { ...options, cwd: path.dirname(comparison.bed) }
            );
            child.on("close", () => console.log("success comparisons"));
        });
};
module.exports = spawnChild;
