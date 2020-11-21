import { ActionTypes } from "./types";
export interface DisplayAuthLoadingAction {
    type: ActionTypes.DISPLAY_AUTH_LOADING;
    payload: boolean;
}

export const displayAuthLoading = (displayLoading: boolean) => {
    return {
        type: ActionTypes.DISPLAY_AUTH_LOADING,
        payload: displayLoading,
    };
};
