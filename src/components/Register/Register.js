import React, { useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { UPDATE_FORM } from "../../actions/types";
import classnames from "classnames";
import { formReducer } from "../../reducers/formReducer";
import { useAuth } from "../../hooks/useAuth";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  errors: {},
};
const Register = () => {
  const auth = useAuth();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const history = useHistory();
  useEffect(() => {
    auth.checkauth(history, "/dashboard");
  }, [auth, history]);
  const onChange = (e) => {
    e.persist();
    dispatch({
      type: UPDATE_FORM,
      payload: { ...state, [e.target.id]: e.target.value },
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    auth.signin(state, dispatch, history);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={state.name}
                error={state.errors.name}
                className={classnames("", {
                  invalid: state.errors.name,
                })}
                id="name"
                type="text"
              />
              <label htmlFor="name">Name</label>
              <span className="red-text">{state.errors.name}</span>
            </div>

            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={state.email}
                error={state.errors.email}
                className={classnames("", {
                  invalid: state.errors.email,
                })}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{state.errors.email}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={state.password}
                error={state.errors.password}
                className={classnames("", {
                  invalid: state.errors.password,
                })}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{state.errors.password}</span>
            </div>

            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={state.password2}
                error={state.errors.password2}
                className={classnames("", {
                  invalid: state.errors.password2,
                })}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className="red-text">{state.errors.password2}</span>
            </div>

            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
