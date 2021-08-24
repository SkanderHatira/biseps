import React, { useState, useContext, createContext } from "react";

const configContext = createContext();

export const ProvideConfig = ({ children }) => {
  const config = useProvideConfig();
  return (
    <configContext.Provider value={config}>{children}</configContext.Provider>
  );
};

export const useConfig = () => {
  return useContext(configContext);
};

const useProvideConfig = () => {
  const initialRun = {
    aligner: "bowtie2",
    adapters: "TruSeq2-SE",
    genome: "",
    outdir: "",
    remoteDir: "",
    machine: {
      hostname: "",
      username: "",
      port: 22,
      privateKey: "",
      script: "",
      password: "",
      homepath: "",
    },
    minlen: 80,
    minscore: -0.6,
    l: 20,
    n: 0,
    subsample: false,
    cluster: false,
    remote: false,
    cpu: "1",
    memMb: "10G",
    jobs: "10",
    minTime: "2880",
  };
  const initialComp = {
    machine: {
      hostname: "",
      username: "",
      port: 22,
      privateKey: "",
      script: "",
      password: "",
      homepath: "",
    },
    method: "bins",
    stat: "score",
    annot: "",
    genome: "",
    remoteDir: "",
    binsize: 200,
    pseudocountN: 2,
    pseudocountM: 1,
    pValueThreshold: 0.05,
    minCytosinesCount: 4,
    minProportionDifference: 0.4,
    minGap: 0,
    minSize: 50,
    minReadsPerCytosine: 4,
    outdir: "",
    remote: false,
    cluster: false,
    contexts: ["CG"],
    kernelFunction: "triangular",
    jobs: "10",
  };
  const [runState, setRunState] = useState(initialRun);
  const [units, setUnits] = useState([]);
  const [remoteunits, setRemoteUnits] = useState([]);
  const [comparisons, setComparisons] = useState([]);
  const [remotecomparisons, setRemoteComparisons] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(true);

  const [compState, setCompState] = useState(initialComp);

  return {
    runState,
    setRunState,
    units,
    setUnits,
    initialRun,
    comparisons,
    setComparisons,
    compState,
    setCompState,
    initialComp,
    remoteunits,
    setRemoteUnits,
    remotecomparisons,
    setRemoteComparisons,
    openDrawer,
    setOpenDrawer,
  };
};
