import { combineReducers } from "redux";
import { reducer as formReducer, FormStateMap } from "redux-form";
import authReducer from "./authReducer";
import displayReducer, { DisplayFormStateResponse } from "./displayReducer";
import { AuthStateResponse } from "./authReducer";
export interface StoreState {
    authStatus: AuthStateResponse;
    formStatus: DisplayFormStateResponse;
    form: FormStateMap;
}
export default combineReducers<StoreState>({
    authStatus: authReducer,
    formStatus: displayReducer,
    form: formReducer,
});
