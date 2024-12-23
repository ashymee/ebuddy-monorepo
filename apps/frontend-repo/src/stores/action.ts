export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const SET_USER_DATA = "SET_USER_DATA";
export const TOGGLE_USER_DATA = "TOGGLE_USER_DATA";

export const fetchUserData = () => ({
  type: FETCH_USER_DATA,
});

export const setUserData = (userData: any) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const toggleUserData = () => ({
  type: TOGGLE_USER_DATA,
});

export const setUser = (userData: any) => ({
  type: "SET_USER",
  payload: userData,
});

export const loginRequest = () => ({
  type: "LOGIN_REQUEST",
});

export const loginSuccess = (userData: any) => ({
  type: "LOGIN_SUCCESS",
  payload: userData,
});

export const loginFailure = (errorMessage: string) => ({
  type: "LOGIN_FAILURE",
  payload: errorMessage,
});

export const logout = () => ({
  type: "LOGOUT",
});
