import { ActionTypes } from "./types";
import auth from "./axiosConfig";
import axios from "axios";
import { Dispatch } from "redux";

export interface JWTType {
    token: string;
}
export interface AuthUserAction {
    type: ActionTypes.AUTH_USER;
    payload: JWTType;
}
export interface AuthErrorAction {
    type: ActionTypes.AUTH_ERROR;
    payload: string;
}

export const signUp = (formValues: any) => async (dispatch: Dispatch) => {
    try {
        const response = await auth.post<JWTType>("/signup", { ...formValues });
        dispatch<AuthUserAction>({
            type: ActionTypes.AUTH_USER,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        dispatch<AuthErrorAction>({
            type: ActionTypes.AUTH_ERROR,
            payload: "- Email is in use",
        });
    }
};
