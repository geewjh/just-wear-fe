import { signUpAPI } from "./users-api";

export async function signUpService(userData) {
  const token = await signUpAPI(userData);
  return token;
}
