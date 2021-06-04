function createProfile(body, uniqueDir, uniqueDirRemote) {
    const yaml = require("js-yaml");
    const fs = require("fs");
    const path = require("path");
    console.log("creating profile");
    console.log(body);

    if (!fs.existsSync(path.join(uniqueDir, "config"))) {
        if (body.cluster) {
            fs.mkdirSync(path.join(uniqueDir, "config/profiles/slurm"), {
                recursive: true,
            });
        } else {
            fs.mkdirSync(path.join(uniqueDir, "config/profiles/local"), {
                recursive: true,
            });
        }
    }
    const localProfile = {
        configfile: body.remote
            ? "config/config.yaml"
            : path.join(uniqueDir, "config/config.yaml"),
        "default-resources": ["cpus=1", "mem_mb=10000", "time_min=5440"],
        "use-conda": true,
        "dry-run": body.subsample,
        "keep-going": true,
        cores: body.cpu || "all",
    };
    const slurmProfile = {
        jobs: body.jobs,
        cluster: `sbatch -t {resources.time_min} --mem={resources.mem_mb} -c {resources.cpus} -o logs_slurm/{rule}_{wildcards} -e logs_slurm/{rule}_{wildcards} --mail-user=${body.email} `,
        "default-resources": ["cpus=1", "mem_mb=10000", "time_min=5440"],
        configfile: body.remote
            ? "config/config.yaml"
            : path.join(uniqueDir, "config/config.yaml"),
        "use-conda": true,
        "keep-going": true,
        "dry-run": body.subsample,
    };

    const yamlStrSlurm = yaml.dump(slurmProfile);
    fs.writeFileSync(
        path.join(uniqueDir, "config/profiles/slurm/config.yaml"),
        yamlStrSlurm,
        "utf8"
    );
    const yamlStrLocal = yaml.dump(localProfile);
    fs.writeFileSync(
        path.join(uniqueDir, "config/profiles/local/config.yaml"),
        yamlStrLocal,
        "utf8"
    );
}
module.exports = createProfile;
