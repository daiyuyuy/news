import React, { Suspense } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import Layout from "../pages/Layout";

// import { Redirect } from "react-router-dom/cjs/react-router-dom";

const Login = React.lazy(() => import("../pages/Login"));
export default function HashRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login" exact component={Login}></Route>

          <Route path="/" render={() => <Layout />}></Route>
          {/* <Route
          path="/"
          render={() =>
            localStorage.getItem("token") ? (
              <Layout></Layout>
            ) : (
              <Redirect to="/login"></Redirect>
            )
          }
        ></Route> */}
        </Switch>
      </Suspense>
    </Router>
  );
}
