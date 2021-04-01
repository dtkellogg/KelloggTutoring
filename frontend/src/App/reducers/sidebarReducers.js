import { SIDEBAR_DETAILS_REQUEST, SIDEBAR_DETAILS_SUCCESS, SIDEBAR_DETAILS_FAIL } from "../constants/sidebarConstants";

export const sidebarDetailsReducer = (
  state = { sidebar: {} },
  action
) => {
  switch (action.type) {
    case SIDEBAR_DETAILS_REQUEST:
      return { ...state, loading: true };

    case SIDEBAR_DETAILS_SUCCESS:
      return { loading: false, sidebar: action.payload };

    case SIDEBAR_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
