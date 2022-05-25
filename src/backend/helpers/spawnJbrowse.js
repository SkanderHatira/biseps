const spawnChild = (body) => {
    const { fork } = require("child_process");
    const path = require("path");
    const jbrowse = path.join(
        __dirname,
        "..",
        "node_modules",
        "@jbrowse",
        "cli",
        "bin",
        process.platform == "win32" ? "run.cmd" : "run"
    );

    const options = {
        slient: false,
        detached: false,
    };

    body.genomes != [] &&
        body.genomes.map((genome) => {
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
        });
    body.tracks != [] &&
        body.tracks.map((track) => {
            // import bam
            fork(
                jbrowse,
                [
                    "add-track",
                    path.basename(track.track),
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
                { ...options, cwd: path.dirname(track.track) }
            );

            // import bigwig_cg

            fork(
                jbrowse,
                [
                    "add-track",
                    path.basename(track.cgbw),
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
                { ...options, cwd: path.dirname(track.cgbw) }
            );

            // import bigwig_chg
            fork(
                jbrowse,
                [
                    "add-track",
                    path.basename(track.chgbw),
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
                { ...options, cwd: path.dirname(track.chgbw) }
            );

            // import bigwig_chh

            fork(
                jbrowse,
                [
                    "add-track",
                    path.basename(track.chhbw),
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
                { ...options, cwd: path.dirname(track.chhbw) }
            );

            // import bigwig_bedgraph
            fork(
                jbrowse,
                [
                    "add-track",
                    path.basename(track.bedbw),
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
                { ...options, cwd: path.dirname(track.bedbw) }
            );
        });
    body.comparisons != [] &&
        body.comparisons.map((comparison) => {
            // import import_bedgz and index
            fork(
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
        });
};
module.exports = spawnChild;
