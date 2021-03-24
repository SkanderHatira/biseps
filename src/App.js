import "./App.css";
import { hot } from "react-hot-loader";
import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideConfig } from "./hooks/useConfig";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Comparisons from "./components/Comparisons/Comparisons";

import RunBoard from "./components/RunBoard/RunBoard";
import RunForm from "./components/Stepper/RunForm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ProvideAuth>
      <ProvideConfig>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/newrun" component={RunForm} />
              <PrivateRoute exact path="/runs" component={RunBoard} />
              <PrivateRoute exact path="/comparison" component={Comparisons} />
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
