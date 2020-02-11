import * as React from "react";
import { Switch } from "react-router";
import { Link, Route } from "react-router-dom";
import Hello from "./Hello";
import Search from "./Search";
import NotFound from "./NotFound";

export class Routes extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>algolia-search-users</h1>
        <li>
          <Link to="/">Hello</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <Switch>
          <Route exact path="/" component={Hello} />
          <Route exact path="/search" component={Search} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
