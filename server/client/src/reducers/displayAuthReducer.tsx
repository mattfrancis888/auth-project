import { ActionTypes, FormActions } from "../actions";
export interface DisplayFormStateResponse {
    displaySignInForm?: boolean;
    //it can be null if local storage is empty and dosent contain the token (refer to Root.tsx);
    displayRegisterForm?: boolean;
}

export const FORM_STATE: DisplayFormStateResponse = {
    displaySignInForm: false,
    displayRegisterForm: false,
};

const displayAuthReducer = (
    state: DisplayFormStateResponse = FORM_STATE,
    action: FormActions
) => {
    switch (action.type) {
        case ActionTypes.DISPLAY_SIGN_IN_FORM:
            return {
                ...state,
                displaySignInForm: true,
                displayRegisterForm: false,
            };
        case ActionTypes.DISPLAY_REGISTER_FORM:
            return {
                ...state,
                displayRegisterForm: true,
                displaySignInForm: false,
            };
        default:
            return state;
    }
};

export default displayAuthReducer;
