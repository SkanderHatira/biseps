const spawnChild = async (body) => {
    const { spawn } = require("child_process");
    const path = require("path");
    console.log("hereeeeee");
    const script = path.join(__dirname, "../../resources/jbrowse.sh");
    const workflow = path.join(__dirname, "../../resources/jbrowse2");
    const outdir = "/home/shatira/Bureau";
    const bams = "";
    const options = {
        slient: false,
        detached: false,
        stdio: "inherit",
    };
    console.log(script);
    console.log(workflow);

    console.log(outdir);

    console.log(body.port);

    const child = spawn(
        "bash",
        [script, outdir, `${body.genomes}`, bams, workflow, body.port],
        options
    );

    let data = "";
    for await (const chunk of child.stdout) {
        console.log("stdout chunk: " + chunk);
        data += chunk;
    }
    q;
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
};
module.exports = spawnChild;
