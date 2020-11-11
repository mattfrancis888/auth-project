import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

interface IProps {
    initialState?: {};
    //Optional property so that not every file has to use initialState (initialState is used for testing)
    children: any;
    // any other props that come into the component
}
export default ({ initialState = {}, children }: IProps) => {
    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(reduxThunk))
    );
    return <Provider store={store}>{children}</Provider>;
};
