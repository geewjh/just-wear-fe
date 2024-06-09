import { signUpAPI, loginAPI } from "./users-api";

export async function signUpService(userData) {
  const token = await signUpAPI(userData);
  // persist the "token"
  localStorage.setItem("token", token);
  return getUser();
}

export async function loginService(loginData) {
  const token = await loginAPI(loginData);
  localStorage.setItem("token", token);
  // return token;
  return getUser();
}

export async function logOutService() {
  localStorage.removeItem("token");
}

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem("token");
  if (!token) return null;

  // access the payload which is after the first period
  const jwtPayload = token.split(".")[1];
  // atob(jwtPayload) => '{"username": "wannabedev"}'
  const payload = JSON.parse(atob(jwtPayload));
  const expiry = payload.exp;

  // jwt's exp is in seconds
  // Date.now() is in milliseconds
  // so convert it and compare
  if (expiry < Date.now() / 1000) {
    // token has expired - remove it from localStorage
    localStorage.removeItem("token");
    return null;
  }

  return token;
}

export function getUser() {
  const token = getToken();

  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}
