import { AuthLogin } from "@/components/profile/Login";
import type { CreateUser } from "@/components/profile/SignUp";
import { api } from "./apiProducts";

export async function signup(user: CreateUser) {
  const res = await api.post("/auth/register", user);
  return res;
}
export async function login(user: AuthLogin) {
  const res = await api.post("/auth/login", user);
  return res;
}
export async function logout() {
  const res = await api.post("/auth/logout");
  return res;
}
export async function refresh() {
  const res = await api.post("/auth/refresh");
  return res;
}
