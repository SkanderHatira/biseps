function createProfile(body, uniqueDir, uniqueDirRemote) {
    const yaml = require("js-yaml");
    const fs = require("fs");
    const path = require("path");
    console.log("creating profile");
    console.log(body);

    if (!fs.existsSync(path.join(uniqueDir, "config"))) {
        fs.mkdirSync(path.join(uniqueDir, "config/profiles/slurmComparison"), {
            recursive: true,
        });

        fs.mkdirSync(path.join(uniqueDir, "config/profiles/localComparison"), {
            recursive: true,
        });
    }
    const localProfile = {
        configfile: body.remote
            ? "config/config.yaml"
            : path.join(uniqueDir, "config/configComparison.yaml"),
        "use-conda": true,
        snakefile: "workflow/comparison/Snakefile",
        "rerun-incomplete": true,
        "latency-wait": 20,
        "keep-going": true,
        cores: body.cpu || "all",
    };
    const slurmProfile = {
        jobs: parseInt(body.jobs),
        cluster: `"sbatch -t {resources.time_min} --mem={resources.mem_mb} -c {resources.cpus} -o logs_slurm/{rule}_{wildcards} -e logs_slurm/{rule}_{wildcards} --mail-user=${body.email}"`,
        "default-resources": ["cpus=1", "mem_mb=10000", "time_min=5440"],
        configfile: body.remote
            ? "config/config.yaml"
            : path.join(uniqueDir, "config/config.yaml"),
        "use-conda": true,
        "latency-wait": 20,
        "rerun-incomplete": true,
        "keep-going": true,
    };

    const yamlStrSlurm = yaml.dump(slurmProfile);
    fs.writeFileSync(
        path.join(uniqueDir, "config/profiles/slurmComparison/config.yaml"),
        yamlStrSlurm,
        "utf8"
    );
    const yamlStrLocal = yaml.dump(localProfile);
    fs.writeFileSync(
        path.join(uniqueDir, "config/profiles/localComparison/config.yaml"),
        yamlStrLocal,
        "utf8"
    );
}
module.exports = createProfile;