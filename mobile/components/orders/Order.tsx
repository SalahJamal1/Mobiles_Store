import useOrders from "@/hooks/useOrders";
import Error from "@/ui/Error";
import Loading from "@/ui/Loading";
import { formatDate } from "@/utils/helpers";
import { StyleSheet, Text, View } from "react-native";
import OrderEmpty from "./OrderEmpty";
import OrderProductList from "./OrderProductList";
import TimeLineStepper from "./TimeLineStepper";

export default function Order() {
  const { orders, isLoading, error } = useOrders();
  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!orders?.length) return <OrderEmpty />;

  return (
    <View>
      {orders?.map((order, idx) => (
        <View key={order.id || idx} style={[styles.card, styles.orderCard]}>
          {/* Order Details Header */}
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderIdText}>Order {order.id}</Text>
              <Text style={styles.orderDateText}>
                {formatDate(order?.date)}
              </Text>
            </View>
            <View
              style={[
                styles.orderStatusBadge,
                order.status === "Delivered"
                  ? styles.statusDelivered
                  : order.status === "Shipped"
                    ? styles.statusShipped
                    : styles.statusProcessing,
              ]}
            >
              <Text
                style={[
                  styles.orderStatusText,
                  order.status === "Delivered"
                    ? styles.textDelivered
                    : order.status === "Shipped"
                      ? styles.textShipped
                      : styles.textProcessing,
                ]}
              >
                {order.status}
              </Text>
            </View>
          </View>

          {/* Order Products List */}
          <OrderProductList order={order} />

          <View style={styles.divider} />

          {/* Timeline stepper */}
          <TimeLineStepper order={order} />

          <View style={styles.divider} />

          <View style={styles.orderFooter}>
            <Text style={styles.orderTotalLabel}>Grand Paid</Text>
            <View style={styles.originalPriceContainer}>
              <Text style={styles.orderOriginalPrice}>
                $
                {Number(
                  order?.cart?.reduce((acc, cur) => acc + cur.totalPrice, 0),
                ).toFixed(2)}
              </Text>
              <Text style={styles.orderTotalVal}>
                ${Number(order.orderPrice).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 3,
  },
  orderCard: {
    flexDirection: "column",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1f2937",
  },
  orderDateText: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  orderStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDelivered: {
    backgroundColor: "#f0fdf4",
  },
  statusShipped: {
    backgroundColor: "#eff6ff",
  },
  statusProcessing: {
    backgroundColor: "#fffbeb",
  },
  orderStatusText: {
    fontSize: 10,
    fontWeight: "800",
  },
  textDelivered: {
    color: "#16a34a",
  },
  textShipped: {
    color: "#2563eb",
  },
  textProcessing: {
    color: "#d97706",
  },

  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTotalLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b7280",
  },
  orderTotalVal: {
    fontSize: 18,
    fontWeight: "800",
    color: "#9333ea",
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 12,
  },
  orderOriginalPrice: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  originalPriceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
});
