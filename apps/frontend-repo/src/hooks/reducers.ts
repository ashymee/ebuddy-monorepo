import {
  FETCH_USER_DATA,
  SET_USER_DATA,
  TOGGLE_USER_DATA,
} from "@stores/action";

const initialState = {
  user: null,
  userData: null,
  isUserDataVisible: false,
  loading: false,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case "LOGOUT":
      return initialState; // Reset state saat logout
    case FETCH_USER_DATA:
      return { ...state, loading: true };
    case SET_USER_DATA:
      return { ...state, loading: false, userData: action.payload };
    case TOGGLE_USER_DATA:
      return { ...state, isUserDataVisible: !state.isUserDataVisible };

    default:
      return state;
  }
};

export default userReducer;
