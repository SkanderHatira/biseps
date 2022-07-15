## **BiSePS: Bisulfite Sequencing Processing**

BiSePS is a desktop application for analyzing Whole Genome Bisulfite Sequencing data. It's a Mongodb/express/React/Nodejs app bundled with webpack and packaged into a desktop app using Electron. It runs a [snakemake pipeline](https://forgemia.inra.fr/skander.hatira/biseps.git) under the hood for processing data locally or on remote machines using ssh credentials.
It relies on git and conda for workflow retrieval and dependencies management. It also supports SLURM cluster execution.

**Use this app along with the [BiSePS documentation]() for configuration examples to help you get started.**

## Dependencies

For BiSePS to run you need these dependencies installed on your machine.

- `conda` - [miniconda](https://docs.conda.io/en/latest/miniconda.html) for package management.
- `git` - [git](https://git-scm.com/) to get latest release of the workflow.

## To Use

To use this app you can either download executables from the [releases page](https://github.com/SkanderHatira/biseps/releases/).
Or build it on your machine from the command line:

```bash
# Clone this repository
git clone https://forgemia.inra.fr/skander.hatira/bisepsgui.git
# Go into the repository
cd bisepsgui
```

Next, install dependencies with [`yarn`](https://yarnpkg.comg):

```bash
# Install Electron dependencies
yarn
# Go into the backend folder
cd src/backend
# Install dependencies
yarn
```

Then start the app:

```bash
# Go into repository folder
cd ../../
# Start application
yarn start
```

## To Build

### Linux

```bash
apt-get update -y
apt-get install -y cmake rpm fakeroot dpkg
yarn make
```

### Windows/Macos

```bash
yarn make
```

## References

- [BiSePS Workflow](https://forgemia.inra.fr/skander.hatira/biseps)
- [Snakemake](https://github.com/snakemake/snakemake)
- [Bismark](https://www.bioinformatics.babraham.ac.uk/projects/bismark/)
- [Methylkit](https://genomebiology.biomedcentral.com/articles/10.1186/gb-2012-13-10-r87)
- [Bedtools](https://academic.oup.com/bioinformatics/article/26/6/841/244688)
- [MultiQC](https://multiqc.info/)
- [FastQC](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/)
- [MethGet](https://github.com/Jason-Teng/MethGET)
- [Jbrowse2](https://jbrowse.org/jb2/)

## License

[MIT](LICENSE.md)
