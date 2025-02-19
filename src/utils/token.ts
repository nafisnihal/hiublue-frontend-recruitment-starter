import Cookies from "js-cookie";

export const TOKEN_KEY = "auth_token";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || Cookies.get(TOKEN_KEY);
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  Cookies.set(TOKEN_KEY, token, { expires: 1 });
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};
