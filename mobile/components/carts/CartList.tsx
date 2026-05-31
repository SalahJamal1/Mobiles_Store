import { RootState } from "@/store/store";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import BottomControls from "./BottomControls";
import { Cart } from "./cartSlice";

export default function CartList() {
  const { carts } = useSelector((state: RootState) => state.carts);

  return (
    <View>
      {/* List Items */}
      {carts.map((cart, i) => {
        const currentCart = carts?.find(
          (c: Cart) => c?.item?.id === cart?.item?.id,
        );
        return (
          <View key={i} style={styles.card}>
            <Image source={{ uri: cart.item.image }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.itemCategory}>{cart.item.category}</Text>
                {cart.item.badge && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{cart.item.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.itemName} numberOfLines={1}>
                {cart.item.name}
              </Text>

              <View style={styles.priceRow}>
                <Text style={styles.itemPrice}>
                  ${currentCart?.totalPrice.toFixed(2) || 0}
                </Text>
                {cart.item.originalPrice && (
                  <Text style={styles.itemOriginalPrice}>
                    $
                    {(cart.item.originalPrice * currentCart!.quantity).toFixed(
                      2,
                    )}
                  </Text>
                )}
              </View>

              {/* Item Bottom Controls */}
              <BottomControls quantity={cart.quantity} id={cart.item.id} />
            </View>
          </View>
        );
      })}
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
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    marginRight: 16,
  },
  cardBody: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemCategory: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9333ea",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  badgeContainer: {
    backgroundColor: "#faf5ff",
    borderWidth: 0.5,
    borderColor: "#c084fc",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#9333ea",
  },
  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2937",
    marginTop: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1f2937",
  },
  itemOriginalPrice: {
    fontSize: 13,
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
});
