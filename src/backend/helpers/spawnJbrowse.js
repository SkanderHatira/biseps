const spawnChild = (body) => {
    const { fork } = require("child_process");
    const fs = require("fs");
    const fsPromises = fs.promises;
    const path = require("path");
    const bbPromise = require("bluebird");
    const jbrowse = path.join(
        __dirname,
        "..",
        "node_modules",
        "@jbrowse",
        "cli",
        "bin",
        "run"
    );

    function loadTracks(track, key) {
        return new bbPromise(function (resolve, reject) {
            const process = fork(
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

            process.stdout.on("data", function (data) {
                console.log(data.toString());
            });

            process.stderr.on("data", function (err) {
                reject(err.toString());
            });

            process.on("exit", function () {
                resolve();
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
            const commands = ["track", "cgbw", "chgbw", "chhbw", "bedbw"].map(
                function (key) {
                    return loadTracks.bind(null, track, key);
                }
            );

            return bbPromise
                .map(
                    commands,
                    function (command) {
                        return command();
                    },
                    {
                        concurrency: 1,
                    }
                )
                .then(function () {
                    console.log("Child Processes Completed");
                });
            // addTrack(track);
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
