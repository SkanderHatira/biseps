import "./App.css";
import { hot } from "react-hot-loader";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import RunForm from "./components/RunForm/RunForm";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/newrun" component={RunForm} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default hot(module)(App);
