import React from "react";
import { Route, Switch } from "react-router-dom";
import Body from "./Body";
const Routes: React.FC<{}> = () => {
    return (
        <Switch>
            <Route path="/" exact component={Body} />
        </Switch>
    );
};

export default Routes;
