import { AppDispatch, RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BottomControls from "../carts/BottomControls";
import { addToCart, Cart, type Product } from "../carts/cartSlice";

type Props = {
  product: Product;
};

export default function StickyBottomBar({ product }: Props) {
  const { carts, selectedCapacity } = useSelector(
    (store: RootState) => store.carts,
  );
  const currentItem = carts?.find((c) =>
    c.item.category === "Electronics"
      ? c.item.id === product.id &&
        c?.storageCapacity?.name === selectedCapacity?.name
      : c.item.id === product.id,
  );
  const dispatch = useDispatch<AppDispatch>();
  const AddToCart = (item: Product) => {
    const newItem: Cart = {
      item,
      quantity: 1,
      totalPrice: Number(item.price) * 1,
      storageCapacity:
        (item.category === "Electronics" && selectedCapacity) || null,
    };

    dispatch(addToCart(newItem));
  };

  return (
    <View style={styles.footerSticky}>
      <View style={styles.priceContainer}>
        <Text style={styles.footerPriceLabel}>Total Price</Text>
        <Text style={styles.footerPriceVal}>
          $
          {currentItem?.totalPrice ??
            Number(product?.price) + selectedCapacity.extra}
        </Text>
      </View>
      {!currentItem?.quantity ? (
        <Pressable
          style={styles.cartButtonPressable}
          onPress={() => AddToCart(product)}
        >
          <LinearGradient
            colors={["#ec4899", "#a855f7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cartGradientBtn}
          >
            <Ionicons name="bag-add" size={20} color="#fff" />

            <Text style={styles.cartButtonText}>Add to Basket</Text>
          </LinearGradient>
        </Pressable>
      ) : (
        <BottomControls
          quantity={currentItem?.quantity}
          capacityName={currentItem?.storageCapacity?.name ?? ""}
          id={product.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footerSticky: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 94,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: Platform.OS === "ios" ? 18 : 0,
  },
  priceContainer: {
    flexDirection: "column",
  },
  footerPriceLabel: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  footerPriceVal: {
    fontSize: 22,
    fontWeight: "900",
    color: "#9333ea",
  },
  cartButtonPressable: {
    borderRadius: 14,
    overflow: "hidden",
    flex: 1,
    marginLeft: 24,
    maxWidth: 220,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cartGradientBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
});
