import React from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
//refresh tokens for reading later:
//https://stackoverflow.com/questions/32060478/is-a-refresh-token-really-necessary-when-using-jwt-token-authentication
const App: React.FC<{}> = () => {
    return (
        <Router history={history}>
            <Routes />
        </Router>
    );
};

export default App;
