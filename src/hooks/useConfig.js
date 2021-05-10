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
    minlen: 80,
    minscore: -0.6,
    l: 20,
    n: 0,
    subsample: false,
    cluster: false,
    cpu: "1",
    memMb: "10G",
    jobs: "10",
    minTime: "2880",
  };
  const initialComp = {
    method: "bins",
    stat: "score",
    binsize: 200,
    cluster: false,
  };
  const [runState, setRunState] = useState(initialRun);
  const [units, setUnits] = useState([]);
  const [comparisons, setComparisons] = useState([]);
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
  };
};
