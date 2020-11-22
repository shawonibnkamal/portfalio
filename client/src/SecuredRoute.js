import React from "react";
import { Route, Redirect } from "react-router-dom";

function SecuredRoute({ component: Component, loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default SecuredRoute;
