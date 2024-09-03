import { readMe, withToken } from "@directus/sdk";
import { apiClient } from "../client/browser";

async function login({ email, password }: { email: string; password: string }) {
  await apiClient.login(email, password);
}

async function userProfile() {
  const data = await apiClient.request(
    withToken(
      (await apiClient.getToken()) ?? "",
      readMe({
        fields: ["id", "first_name", "email", "type"],
      })
    )
  );

  return {
    id: data.id,
    name: data.first_name,
    email: data.email,
    type: data.type,
  };
}

async function logout() {
  await apiClient.logout();
}

const authApi = { login, logout, userProfile };
export default authApi;
