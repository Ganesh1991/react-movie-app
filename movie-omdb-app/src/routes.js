import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import MovieDetails from "./components/movieDetails";

class Routes extends React.Component {
  render() {
    const username = localStorage.getItem("userApikey") || "";
    const loggedIn = username === "" ? false : true;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
          }
        />
        <Route exact path="/dashboard" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/details" component={MovieDetails} />
      </Switch>
    );
  }
}

export default Routes;
