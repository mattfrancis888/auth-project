import React from "react";
import { Route, Switch } from "react-router-dom";
import Body from "./Body";
import Header from "./Header";
import WalkmanInfo from "./WalkmanInfo";
const Routes: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route path="/" exact component={Body} />
                <Route path="/walkman" exact component={WalkmanInfo} />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;
