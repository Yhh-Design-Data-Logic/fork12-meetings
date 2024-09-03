import { apiClient } from "../client/browser";

async function login({ email, password }: { email: string; password: string }) {
  await apiClient.login(email, password);
}

const authApi = { login };
export default authApi;
