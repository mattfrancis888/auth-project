import { combineReducers } from "redux";
import { reducer as formReducer, FormStateMap } from "redux-form";
export interface StoreState {
    // movies: MovieType[];
    // movieInfo: MovieInfoType[];
    form: FormStateMap;
}
export default combineReducers<{}>({
    // movies: moviesReducer,
    // movieInfo: movieInfoReducer,
    form: formReducer,
});
