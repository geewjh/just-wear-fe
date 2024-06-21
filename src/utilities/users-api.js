import sendRequest from "./send-request";

const apiURL = import.meta.env.VITE_BASE_URL;
const BASE_URL = `${apiURL}/api/users`;

export function signUpAPI(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function loginAPI(loginData) {
  return sendRequest(`${BASE_URL}/login`, "POST", loginData);
}

export function checkTokenAPI() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export async function deleteUserAPI() {
  return sendRequest(`${BASE_URL}/delete`, "DELETE");
}
