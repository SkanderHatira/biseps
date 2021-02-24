import React, { useState } from "react";
import SampleForm from "../SampleForm/SampleForm";
import axios from "axios";

const RunForm = () => {
  const initialState = {
    sampleFile: "",
    unitsFile: "",
    outdir: "",
    genome: "",
    adapters: "",
    subsample: true,
    trimming: true,
    quality: true,
    genome_preparation: true,
    methylation_extraction_bismark: true,
    methylation_calling: true,
  };
  const [runState, setRunState] = useState(initialState);
  const handleRunFiles = (e) =>
    setRunState({
      ...runState,
      [e.target.name]: [e.target.files.webkitRelativePath],
    });
  const handleRunState = (e) =>
    setRunState({
      ...runState,
      [e.target.name]: [e.target.value],
    });
  const handleRunSubmit = () => {
    axios
      .get("http://localhost:5000/api/runs/run")
      .then((res) => history.push("/dashboard"))
      .catch((err) => {
        console.log("failed get request");
      });
  };
  return (
    <form className="container" noValidate onSubmit={handleRunSubmit}>
      <div className="input-field col s12">
        <div className="row">
          <div className="col s6">
            <label htmlFor="Output Directory">Choose an output directory</label>
          </div>
          <div className="col s6">
            <input
              directory=""
              webkitdirectory=""
              type="file"
              name="outdir"
              id="outdir"
              onChange={handleRunFiles}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="Output Directory">Choose A Genome </label>
          </div>
          <div className="col s6">
            <input
              type="file"
              name="genome"
              id="genome"
              onChange={handleRunFiles}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="Output Directory">Upload Adapters </label>
          </div>
          <div className="col s6">
            <input
              type="file"
              name="adapters"
              id="genome"
              multiple
              onChange={handleRunFiles}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <label className="col s4">
              <input
                onChange={handleRunState}
                name="subsample"
                type="checkbox"
              />
              <span>Subsample</span>
            </label>
            <label className="col s4">
              <input
                onChange={handleRunState}
                name="trimming"
                type="checkbox"
              />
              <span>Adapter Trimming</span>
            </label>
            <div className="col s4">
              <label>
                <input
                  onChange={handleRunState}
                  name="quality"
                  type="checkbox"
                />
                <span>Quality Check</span>
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="col s4">
              <label>
                <input
                  onChange={handleRunState}
                  name="methylation_extraction_bismark"
                  type="checkbox"
                />
                <span>Methylation Extraction</span>
              </label>
            </div>
            <div className="col s4">
              <label>
                <input
                  onChange={handleRunState}
                  name="methylation_calling"
                  type="checkbox"
                />
                <span>Methylation Calling</span>
              </label>
            </div>
            <div className="col s4">
              <label>
                <input
                  onChange={handleRunState}
                  name="genome_preparation"
                  type="checkbox"
                />
                <span>Genome Preparation</span>
              </label>
            </div>
          </div>
        </div>

        <SampleForm />
      </div>
    </form>
  );
};

export default RunForm;
