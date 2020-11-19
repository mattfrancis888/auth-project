import { ActionTypes } from "./types";

export interface DisplaySignInFormAction {
    type: ActionTypes.DISPLAY_SIGN_IN_FORM;
    payload: boolean;
}

export interface DisplayRegisterFormAction {
    type: ActionTypes.DISPLAY_REGISTER_FORM;
    payload: boolean;
}

export const displaySignInForm = (displayForm: boolean) => {
    return {
        type: ActionTypes.DISPLAY_SIGN_IN_FORM,
        payload: displayForm,
    };
};

export const displayRegisterForm = (displayForm: boolean) => {
    return {
        type: ActionTypes.DISPLAY_REGISTER_FORM,
        payload: displayForm,
    };
};
