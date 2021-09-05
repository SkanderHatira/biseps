import "./App.css";
import { hot } from "react-hot-loader";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideConfig } from "./hooks/useConfig";
import Landing from "./components/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Visualization from "./components/Visualization/Visualization";
import Comparisons from "./components/Comparisons/Comparisons";
import Comparison from "./components/Comparisons/Comparison";
import Profile from "./pages/Profile/Profile";
import RunBoard from "./components/RunBoard/RunBoard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ProvideAuth>
      <ProvideConfig>
        <Router>
          <div className="App">
            <Switch>
              {sessionStorage.Conda == "true" ? (
                <Route exact path="/" component={Landing} />
              ) : (
                <h1>
                  It seems like you're missing conda , this software is a vital
                  dependancy for BiSePS
                </h1>
              )}
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/newrun" component={RunBoard} />
              <PrivateRoute exact path="/comparison" component={Comparisons} />
              <PrivateRoute exact path="/profile" component={Profile} />

              <PrivateRoute
                exact
                path="/newcomparison"
                component={Comparison}
              />
              <PrivateRoute
                exact
                path="/visualization"
                component={Visualization}
              />

              <PrivateRoute exact path="/alignment" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </ProvideConfig>
    </ProvideAuth>
  );
}

export default hot(module)(App);
