import { getCategories } from "@/lib/apiProducts";

import { useQuery } from "@tanstack/react-query";
export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
};
export default function useCategories() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return {
    categories,
    isLoading,
  };
}
