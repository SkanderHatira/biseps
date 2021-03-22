function createProfile(body, uniqueDir) {
    const yaml = require("js-yaml");
    const fs = require("fs");
    const path = require("path");
    console.log("creating profile");

    if (!fs.existsSync(uniqueDir)) {
        fs.mkdirSync(path.join(uniqueDir, "config/profile"), {
            recursive: true,
        });
    }
    const localProfile = {
        configfile: path.join(uniqueDir, "config/config.yaml"),
        "default-resources": ["cpus=1", "mem_mb=2000", "time_min=60"],
        "use-conda": true,
        "dry-run": body.subsample,
        "keep-going": true,
        cores: body.cpu || "all",
    };
    const slurmProfile = {
        jobs: body.jobs,
        cluster:
            "sbatch -t {resources.time_min} --mem={resources.mem_mb} -c {resources.cpus} -o logs_slurm/{rule}_{wildcards} -e logs_slurm/{rule}_{wildcards} ",
        "default-resources": ["cpus=1", "mem_mb=5000", "time_min=240"],
        resources: [
            `cpus=${body.cpu}`,
            `mem_mb=${body.memMb}`,
            `time_min=${body.minTime}`,
        ],
        configfile: path.join(uniqueDir, "config/config.yaml"),
        "use-conda": true,
        "keep-going": true,
        "dry-run": body.subsample,
    };
    if (body.cluster) {
        const yamlStr = yaml.dump(slurmProfile);
        fs.writeFileSync(
            path.join(uniqueDir, "config/profile/config.yaml"),
            yamlStr,
            "utf8"
        );
    } else {
        const yamlStr = yaml.dump(localProfile);
        fs.writeFileSync(
            path.join(uniqueDir, "config/profile/config.yaml"),
            yamlStr,
            "utf8"
        );
    }
}
module.exports = createProfile;
