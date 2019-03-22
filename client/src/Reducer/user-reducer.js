import { USER } from "../Actions/types";
const initState = {};

export default function userReducer(state = initState, { type, payload }) {
  switch (type) {
    case USER:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}
