import { combineReducers } from "redux";
import userReducer from "./user-reducer";

const rootReducer = combineReducers({
  // short hand property names
  user: userReducer
});

export default rootReducer;
