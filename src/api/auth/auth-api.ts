import { readMe, withToken } from "@directus/sdk";
import { apiClient } from "../client/browser";
import {
  deleteUserSessionFromStorage,
  saveUserSessionToStorage,
} from "@/lib/auth";

async function login({ email, password }: { email: string; password: string }) {
  await apiClient.login(email, password);

  const user = await apiClient.request(
    withToken(
      (await apiClient.getToken()) ?? "",
      readMe({
        fields: ["first_name", "type", { teacher: ["id"] }, { parent: ["id"] }],
      })
    )
  );

  saveUserSessionToStorage({
    name: user.first_name ?? "-",
    type: user.type,
    teacher: user.teacher?.id,
    parent: user.parent?.id,
  });
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

  deleteUserSessionFromStorage();
}

const authApi = { login, logout, userProfile };
export default authApi;
