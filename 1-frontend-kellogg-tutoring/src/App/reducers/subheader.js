import { SUBHEADER } from "../actions/subheader";

export default function subheader(state = '', action) {
  switch (action.type) {
    case SUBHEADER:
        console.log(`action.text: ${action.text}`)
        console.log(`action: ${action}`)
      return action.text
    default:
      return state;
  }
}
