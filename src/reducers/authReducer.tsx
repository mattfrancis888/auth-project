import { ActionTypes, Actions } from "../actions";

export interface AuthStateResponse {
    authenticated: string;
    errorMessage: string;
}

export const AUTH_STATE: AuthStateResponse = {
    authenticated: "",
    errorMessage: "",
};
const authReducer = (
    state: AuthStateResponse = AUTH_STATE,
    action: Actions
) => {
    switch (action.type) {
        case ActionTypes.AUTH_USER:
            console.log({ ...state, errorMessage: action.payload.token });
            return { ...state, authenticated: action.payload.token };
        case ActionTypes.AUTH_ERROR:
            console.log({ ...state, errorMessage: action.payload });
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

export default authReducer;
