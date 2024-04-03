import { httpsAxios } from "../helper/httpHelper";

export async function signUp(user) {
  const result = await httpsAxios
    .post("/api/user", user)
    .then((response) => response.data);

  return result;
}
export async function signIn(logindata) {
  const result = await httpsAxios
    .post("/api/login", logindata)
    .then((response) => response.data);

  return result;
}

export async function currentUser() {
  const result = await httpsAxios
    .get("/api/current")
    .then((response) => response.data);

  return result;
}

export async function logOut() {
  const result = await httpsAxios
    .post("/api/logout")
    .then((response) => response.data);

  return result;
}
