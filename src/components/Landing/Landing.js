import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Landing = () => {
  const history = useHistory();
  const { checkauth } = useAuth();
  useEffect(() => {
    checkauth(history, "/dashboard");
  }, [checkauth, history]);
  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Run</b> our powerful DMR Identification Pipeline{" "}
            <b>
              <span style={{ fontFamily: "monospace" }}>BiSSProP</span>
            </b>{" "}
            from a User-Friendly <b>GUI!</b>
          </h4>
          <p className="flow-text grey-text text-darken-1">
            Configure, Run and visualize your data from one spot
          </p>
          <br />
          <div className="col s6">
            <Link
              to="/register"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </Link>
          </div>
          <div className="col s6">
            <Link
              to="/login"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              className="btn btn-large btn-flat waves-effect hoverable  white black-text"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
