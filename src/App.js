import "./App.css";
import { hot } from "react-hot-loader";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideDownloads } from "./hooks/useDownloads";

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
import EditProfile from "./components/EditProfile/EditProfile";
import RunBoard from "./components/RunBoard/RunBoard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ProvideAuth>
      <ProvideConfig>
        <ProvideDownloads>
          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/newrun" component={RunBoard} />
                <PrivateRoute
                  exact
                  path="/comparison"
                  component={Comparisons}
                />
                <PrivateRoute exact path="/machines" component={Profile} />
                <PrivateRoute exact path="/profile" component={EditProfile} />
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
        </ProvideDownloads>
      </ProvideConfig>
    </ProvideAuth>
  );
}

export default hot(module)(App);
