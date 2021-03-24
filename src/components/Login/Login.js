import React, { useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { UPDATE_FORM } from "../../actions/types";
import { formReducer } from "../../reducers/formReducer";
import classnames from "classnames";

const Login = () => {
  const { checkauth, signup } = useAuth();

  const initialStateForm = {
    email: "",
    password: "",
    errors: {},
  };
  const history = useHistory();
  const [state, dispatch] = useReducer(formReducer, initialStateForm);

  useEffect(() => {
    checkauth(history, "/alignment");
  }, [checkauth, history]);
  const onChange = (e) => {
    e.persist();
    dispatch({
      type: UPDATE_FORM,
      payload: { ...state, [e.target.id]: e.target.value },
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: state.email,
      password: state.password,
    };
    signup(userData, dispatch, history);
  };
  const { errors } = state;

  return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={state.email}
                error={errors.email}
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound,
                })}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={state.password}
                error={errors.password}
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
