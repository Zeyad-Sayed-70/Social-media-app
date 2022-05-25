import * as api from "../api/index";

export const postSignup = (account) => async (dispatch) => {
  try {
    const { data } = await api.post_signup(account);
    dispatch({ type: "SIGN_UP", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const postSignin = (account) => async (dispatch) => {
  try {
    const { data } = await api.post_signin(account);
    dispatch({ type: "SIGN_IN", payload: data });
  } catch (error) {
    console.log(error);
  }
};
