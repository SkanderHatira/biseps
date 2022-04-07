const { dirname } = require("path");

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
        "run" 
    );

    const options = {
        slient: false,
        detached: false,
    };

    body.genomes != [] &&
        body.genomes.map((genome) => {
            console.log(`Current directory: ${process.cwd()} | ${__dirname}`);
            console.log(process.platform)
            console.log(genome)
            console.log(body.jbPath)
            const dirName = path.dirname(genome)
            console.log(dirName)
            const fileName= path.basename(genome)
            console.log(jbrowse,"add-assembly",
            fileName,
            "--load",
            "copy",
            "--out",
            body.jbPath)
            fork(
                jbrowse,
                [
                    "add-assembly",
                    fileName,
                    "--load",
                    "copy",
                    "--overwrite",
                    "--out",
                    body.jbPath
                ],
                { cwd : dirName,
                windowsVerbatimArguments: true }
            );
        });
    body.tracks != [] &&
        body.tracks.map((track) => {
            const dirName = path.dirname(track.track)
            const fileName= path.basename(track.track)
            // import bam
            fork(
                jbrowse,
                [
                    "add-track",
                    fileName,
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
                {...options ,     
                    cwd: dirName,
                }
            );

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
        });
};
module.exports = spawnChild;
