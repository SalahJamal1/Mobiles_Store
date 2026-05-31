import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function CartEmpty() {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Ionicons name="cart-outline" size={60} color="#c084fc" />
      </View>
      <Text style={styles.emptyTitle}>Your Basket is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Looks like you haven't added any high-tech gadgets yet. Let's add some!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",

    paddingHorizontal: 32,
    flex: 1,
    justifyContent: "center",
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ede9fe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 3,
    borderColor: "#a78bfa",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
});
