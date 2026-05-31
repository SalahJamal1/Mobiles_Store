import useProducts from "@/hooks/useProducts";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Error from "../../ui/Error";
import Loading from "../../ui/Loading";
import { Product } from "../carts/cartSlice";
import ProductCard from "./ProductCard";
type Props = {
  filter: string;
};

export default function Products({ filter }: Props) {
  const { data, productsLoading } = useProducts();
  const products: Product[] = useMemo(() => {
    return filter === "All"
      ? (data ?? [])
      : ((data?.filter((item: Product) => item.category === filter) ??
          []) as Product[]);
  }, [data, filter]);

  if (productsLoading) {
    return <Loading />;
  }
  if (!data) {
    return <Error />;
  }
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>
          {filter === "All" ? "All Products" : filter}
        </Text>
        <Text style={styles.count}>{products?.length ?? 0} items</Text>
      </View>

      <View style={styles.list}>
        {products?.map((item: Product) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
  },

  count: {
    fontWeight: "500",
    color: "#888",
  },

  list: {
    paddingBottom: 20,
  },
});
