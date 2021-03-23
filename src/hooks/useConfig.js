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
  const initialState = {
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
  };

  const [runState, setRunState] = useState(initialState);
  const [units, setUnits] = useState([]);

  return {
    runState,
    setRunState,
    units,
    setUnits,
  };
};
