function createProfile(body, uniqueDir, uniqueDirRemote) {
    const yaml = require("js-yaml");
    const fs = require("fs");
    const path = require("path");
    console.log("creating profile");

    if (!fs.existsSync(path.join(uniqueDir, "config"))) {
        fs.mkdirSync(path.join(uniqueDir, "config/profiles/slurmComparison"), {
            recursive: true,
        });

        fs.mkdirSync(path.join(uniqueDir, "config/profiles/localComparison"), {
            recursive: true,
        });
    }
    console.log("creating profile2");

    const localProfile = {
        configfile: body.remote
            ? "config/configComparison.yaml"
            : path.join(uniqueDir, "config/configComparison.yaml"),
        "use-conda": true,
        snakefile: "workflow/comparison/Snakefile",
        "rerun-incomplete": true,
        "conda-prefix": "~/.biseps/conda",
        "latency-wait": 200,
        "keep-going": true,
        cores: body.cpu != "1" ? body.cpu : "all",
    };
    const slurmProfile = {
        jobs: parseInt(body.jobs),
        cluster: body.notification
            ? "sbatch -t {resources.time_min} --mem={resources.mem_mb} -c {resources.cpus} -o logs_slurm/{rule}_{wildcards} -e logs_slurm/{rule}_{wildcards}" +
              "--mail-type=FAIL,END --mail-user=" +
              body.email
            : "sbatch -t {resources.time_min} --mem={resources.mem_mb} -c {resources.cpus} -o logs_slurm/{rule}_{wildcards} -e logs_slurm/{rule}_{wildcards}",
        "default-resources": ["cpus=1", "mem_mb=10000", "time_min=5440"],
        configfile: body.remote
            ? "config/configComparison.yaml"
            : path.join(uniqueDir, "config/configComparison.yaml"),
        "use-conda": true,
        "conda-prefix": "~/.biseps/conda",
        "latency-wait": 200,
        "rerun-incomplete": true,
        "keep-going": true,
        snakefile: "workflow/comparison/Snakefile",
    };
    console.log("creating profilehereeee");

    const yamlStrSlurm = yaml.dump(slurmProfile);
    fs.writeFileSync(
        path.join(
            uniqueDir,
            "config",
            "profiles",
            "slurmComparison",
            "config.yaml"
        ),
        yamlStrSlurm,
        "utf8"
    );
    const yamlStrLocal = yaml.dump(localProfile);
    fs.writeFileSync(
        path.join(
            uniqueDir,
            "config",
            "profiles",
            "localComparison",
            "config.yaml"
        ),
        yamlStrLocal,
        "utf8"
    );
}
module.exports = createProfile;
