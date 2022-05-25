import { combineReducers } from "redux";
import { postsReducer } from "./posts";
import { accountReducer } from "./accounts";

export default combineReducers({
  postsReducer,
  accountReducer,
});
