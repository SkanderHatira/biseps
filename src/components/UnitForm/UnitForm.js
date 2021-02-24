import React, { useState } from "react";

const UnitForm = () => {
  const blankUnit = { r1: "", r2: "" };
  const [unitState, setUnitState] = useState([{ ...blankUnit }]);

  const addUnit = () => {
    setUnitState([...unitState, { ...blankUnit }]);
  };
  const handleUnitChange = (e) => {
    const updatedUnits = [...unitState];
    updatedUnits[e.target.dataset.idx][e.target.name] = e.target.files;
    setUnitState(updatedUnits);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 ">
          <div className="input-field col s12">
            <input type="button" onClick={addUnit} value="Add Unit Pair" />
          </div>
          {unitState.map((val, idx) => {
            const r1Id = `read1-${idx}`;
            const r2Id = `read2-${idx}`;
            return (
              <div key={`unit-${idx}`}>
                <div className="s12">
                  <label>
                    Select Left read(s) , different lanes will be joined into a
                    single r1 file
                  </label>
                  <input
                    type="file"
                    id={r1Id}
                    name="r1"
                    data-idx={idx}
                    multiple
                    onChange={handleUnitChange}
                  />
                </div>
                <div className="s12">
                  <label>
                    Select Right read(s) , different lanes will be joined into a
                    single r2 file
                  </label>
                  <input
                    type="file"
                    id={r2Id}
                    name="r2"
                    data-idx={idx}
                    multiple
                    onChange={handleUnitChange}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UnitForm;
