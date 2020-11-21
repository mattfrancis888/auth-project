import { combineReducers } from "redux";
import { reducer as formReducer, FormStateMap } from "redux-form";
import authReducer from "./authReducer";
import displayAuthReducer, {
    DisplayFormStateResponse,
} from "./displayAuthReducer";
import { AuthStateResponse } from "./authReducer";
import loadingRreducer from "./loadingReducer";
export interface StoreState {
    authStatus: AuthStateResponse;
    formStatus: DisplayFormStateResponse;
    authLoadingStatus: boolean;
    form: FormStateMap;
}
export default combineReducers<StoreState>({
    authStatus: authReducer,
    formStatus: displayAuthReducer,
    authLoadingStatus: loadingRreducer,
    form: formReducer,
});
