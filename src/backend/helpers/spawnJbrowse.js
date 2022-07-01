const spawnChild = (body) => {
    const { fork, exec } = require("child_process");
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
                ],
                { ...options, cwd: path.dirname(track[key]) }
            );
            child.on("close", () => console.log("success alignment"));
        });
    }
    const options = {
        slient: false,
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
