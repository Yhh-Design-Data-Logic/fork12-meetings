import { readMe, withToken } from "@directus/sdk";
import { apiClient } from "../client/browser";
import { setUserTypeInCookie, deleteUserTypeFromCookie } from "@/lib/auth";

async function login({ email, password }: { email: string; password: string }) {
  await apiClient.login(email, password);

  const { type } = await apiClient.request(
    withToken(
      (await apiClient.getToken()) ?? "",
      readMe({
        fields: ["type"],
      })
    )
  );

  setUserTypeInCookie(type);
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

  deleteUserTypeFromCookie();
}

const authApi = { login, logout, userProfile };
export default authApi;
