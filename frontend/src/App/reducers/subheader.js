import { SUBHEADER } from "../actions/subheader";

export default function subheader(state = '', action) {
  switch (action.type) {
    case SUBHEADER:
      return action.text
    default:
      return state;
  }
}
