import { Order } from "@/hooks/useOrders";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  order: Order;
};

export default function OrderProductList({ order }: Props) {
  return (
    <View style={styles.orderProductsContainer}>
      {order?.cart?.map((cartItem, i) => (
        <View key={i} style={styles.orderProductRow}>
          <Image
            source={{ uri: cartItem.item.image }}
            style={styles.orderProductImg}
          />
          <View style={styles.orderProductDetails}>
            <Text style={styles.orderProductName} numberOfLines={1}>
              {cartItem.item.name} {cartItem.storageCapacity?.name}
            </Text>
            <Text style={styles.orderProductSub}>
              Qty: {cartItem.quantity} • $
              {Number(cartItem.item.price) +
                Number(cartItem.storageCapacity?.extra || 0)}{" "}
              each
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  orderProductsContainer: {
    marginVertical: 4,
  },
  orderProductRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  orderProductImg: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    marginRight: 10,
  },
  orderProductDetails: {
    flex: 1,
  },
  orderProductName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1f2937",
  },
  orderProductSub: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2,
  },
});
