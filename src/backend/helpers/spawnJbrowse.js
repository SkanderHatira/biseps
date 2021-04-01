const spawnChild = async (body, uniqueDir) => {
    const { execFileSync } = require("child_process");
    const handler = require("serve-handler");
    const http = require("http");
    const path = require("path");
    console.log("hereeeeee");

    console.log(uniqueDir);

    const script = path.join(__dirname, "../../resources/jbrowse.sh");
    const workflow = path.join(__dirname, "../../resources/jbrowse2");
    const bams = "";
    const options = {
        slient: false,
        detached: false,
        stdio: "inherit",
    };

    const child = execFileSync(
        script,
        [uniqueDir, `${body.genomes}`, bams, workflow, body.port],
        options
    );
    console.log(body.port);
    const server = http.createServer((request, response) => {
        // You pass two more arguments for config and middleware
        // More details here: https://github.com/vercel/serve-handler#options
        return handler(request, response, { public: uniqueDir });
    });
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
    server.listen(body.port, () => {
        console.log(`Running at http://localhost:${body.port}`);
    });
};
module.exports = spawnChild;
