import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Hey there,</b> {user.user.name.split(" ")[0]}
            <p className="flow-text grey-text text-darken-1">
              You sdsdsare logged into BiSSProP{" "}
              <span style={{ fontFamily: "monospace" }}>WEB</span> app 👏
            </p>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
