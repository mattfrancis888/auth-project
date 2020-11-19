import {
    AuthUserAction,
    AuthErrorAction,
    DisplaySignInFormAction,
    DisplayRegisterFormAction,
} from "../actions";
export enum ActionTypes {
    AUTH_USER,
    AUTH_ERROR,
    DISPLAY_SIGN_IN_FORM,
    DISPLAY_REGISTER_FORM,
}
export type Actions = AuthUserAction | AuthErrorAction;
export type FormActions = DisplaySignInFormAction | DisplayRegisterFormAction;
