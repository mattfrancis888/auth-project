import { ActionTypes, DisplayAuthLoadingAction } from "../actions";
const loadingReducer = (
    state: boolean = false,
    action: DisplayAuthLoadingAction
) => {
    switch (action.type) {
        case ActionTypes.DISPLAY_AUTH_LOADING:
            return action.payload;
        default:
            return state;
    }
};

export default loadingReducer;
