import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

/**
 * Import APP Components
 */
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import Caterer from "./Components/Caterer/Caterer";

/**
 * Route declaration
 */

const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={SignUp} exact={true} />
      <Route path="/login" component={SignIn} />
      <Route path="/caterer" component={Caterer} />
      {/* <Route path="/create" component={AddExpensePage} />
      <Route path="/edit" component={EditExpensePage} />
      <Route path="/help" component={HelpPage} />
      <Route path="/help" component={HelpPage} />
      <Route component={NotFoundPage} /> */}
    </Switch>
  </BrowserRouter>
);

export default routes;
