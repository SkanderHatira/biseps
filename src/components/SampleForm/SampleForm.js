import React, { useState } from "react";
import classnames from "classnames";
import UnitForm from "../UnitForm/UnitForm";
const SampleForm = () => {
  const blankSample = { sample: " sdsqdqsd", type: " sdqsd" };
  const [sampleState, setSampleState] = useState([{ ...blankSample }]);

  const addSample = () => {
    setSampleState([...sampleState, { ...blankSample }]);
  };
  const handleSampleChange = (e) => {
    const updatedSamples = [...sampleState];
    updatedSamples[e.target.dataset.idx][e.target.className] = e.target.value;
    setSampleState(updatedSamples);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="input-field col s12">
            <input type="button" onClick={addSample} value="Add New Sample" />
          </div>
          {sampleState.map((val, idx) => {
            const sampleId = `sample-${idx}`;
            const typeId = `type-${idx}`;
            return (
              <div key={`sample-${idx}`}>
                <div className="input-field col s12">
                  <input
                    onChange={handleSampleChange}
                    value={sampleState.sample}
                    error={sampleState.sample}
                    data-idx={idx}
                    className={classnames("", {
                      invalid: sampleState.sample,
                    })}
                    id={sampleId}
                    name={sampleId}
                    type="text"
                  />
                  <label htmlFor="name">Name</label>
                  <span className="red-text">{sampleState.sample}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={handleSampleChange}
                    value={sampleState.type}
                    error={sampleState.type}
                    data-idx={idx}
                    className={classnames("", {
                      invalid: sampleState.type,
                    })}
                    id={typeId}
                    name={typeId}
                    type="text"
                  ></input>
                  <label htmlFor="type">Type</label>
                  <span className="red-text">{sampleState.type}</span>
                </div>
                <UnitForm />
              </div>
            );
          })}
          <input type="submit" value="Submit" />
        </div>
      </div>
    </div>
  );
};

export default SampleForm;
