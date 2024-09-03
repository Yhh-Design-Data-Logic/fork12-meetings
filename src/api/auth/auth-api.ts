import { apiClient } from "../client/browser";

async function login({ email, password }: { email: string; password: string }) {
  await apiClient.login(email, password);
}

async function logout() {
  await apiClient.logout();
}

const authApi = { login, logout };
export default authApi;
