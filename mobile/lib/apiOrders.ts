import { api } from "./apiProducts";

export async function createOrder(order: any) {
  const res = await api.post("/payments/create-checkout-session", order);
  return res;
}
export async function getOrders(): Promise<any[]> {
  const { data } = await api.get("/orders");
  if (!data) throw new Error("Failed to fetch orders");

  return data;
}
