import { jwtDecode } from "jwt-decode";

import { Product } from "@/components/carts/cartSlice";
import { Category } from "@/hooks/useCategories";
import axios, { InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
export const api = axios.create({
  baseURL:
    Platform.OS === "ios"
      ? "http://localhost:3000/api/v1"
      : "http://192.168.1.27:3000/api/v1",
  withCredentials: true,
});

async function getValidToken() {
  const token: string | null = await SecureStore.getItemAsync("jwt");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      await SecureStore.deleteItemAsync("jwt");
      return null;
    }
    const exp = new Date(decoded.exp! * 1000);
    if (exp < new Date()) {
      await SecureStore.deleteItemAsync("jwt");
      return null;
    }

    return token;
  } catch {
    await SecureStore.deleteItemAsync("jwt");
    return null;
  }
}

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getValidToken();
    const refreshToken = await SecureStore.getItemAsync("refresh_token");
    const deviceId = await SecureStore.getItemAsync("deviceid");
    config.headers = config.headers ?? {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (refreshToken) {
      config.headers.set("refresh_token", refreshToken);
    }
    if (deviceId) {
      config.headers.set("deviceid", deviceId);
    }
    return config;
  },
  (err) => Promise.reject(err),
);
export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get("/products");
  if (!data) throw new Error("Failed to fetch products");

  return data;
}
export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get(`/products/${id}`);
  if (!data) throw new Error("Failed to fetch product");

  return data;
}
export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get("/categories");
  if (!data) throw new Error("Failed to fetch Categories");
  return data;
}
