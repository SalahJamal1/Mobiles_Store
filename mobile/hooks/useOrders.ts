import { Cart } from "@/components/carts/cartSlice";
import { getOrders } from "@/lib/apiOrders";
import { useQuery } from "@tanstack/react-query";
export interface Order {
  id: number;
  customerName: string;
  phone: string;

  location: {
    lat: number;
    lng: number;
  };

  cart: Cart[];

  date: string;

  status: "Processing" | "Shipped" | "Delivered";

  step: 1 | 2 | 3;

  isPaid: boolean;

  orderReference?: string;

  orderPrice: number;
}
export default function useOrders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: getOrders,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
  return { orders, isLoading, error };
}
