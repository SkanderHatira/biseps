import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    auth.checkauth(history, rest.path);
    console.log(auth);
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.user.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
