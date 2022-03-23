import React, { useState, useContext, createContext } from "react";

const downloadContext = createContext();

export const ProvideDownloads = ({ children }) => {
  const config = useProvideDownloads();
  return (
    <downloadContext.Provider value={config}>
      {children}
    </downloadContext.Provider>
  );
};

export const useDownloads = () => {
  return useContext(downloadContext);
};

const useProvideDownloads = () => {
  const initialState = {};

  const [loading, setLoading] = useState(initialState);
  const [cache, setCache] = useState(0);

  return {
    loading,
    cache,
    setCache,
    setLoading,
  };
};
