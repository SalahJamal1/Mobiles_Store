import { Product } from "@/components/carts/cartSlice";
import { getProducts } from "@/lib/apiProducts";
import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
  const { data, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return {
    data,
    productsLoading,
  };
}
