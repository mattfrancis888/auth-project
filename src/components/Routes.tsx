import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
const Routes: React.FC<{}> = () => {
    return (
        <Switch>
            <Route path="/" exact component={Header} />
        </Switch>
    );
};

export default Routes;
