import { AppDispatch, RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BottomControls from "../carts/BottomControls";
import { addToCart, type Cart, type Product } from "../carts/cartSlice";

type Props = {
  item: Product;
};

export default function ProductCard({ item }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const anim = useAnimatedValue(0);
  const dispatch = useDispatch<AppDispatch>();
  const { carts } = useSelector((store: RootState) => store.carts);
  const currentQty = carts?.find(
    (c: Cart) => c?.item?.id === item?.id,
  )?.quantity;
  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  const opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const blur = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 0],
  });

  const AddToCart = (item: Product) => {
    const newItem: Cart = { item, quantity: 1, totalPrice: item.price * 1 };

    dispatch(addToCart(newItem));
  };
  return (
    <Pressable
      key={item.id}
      onPress={() => router.push(`/product/${item.id}`)}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        {loading ? (
          <Text style={styles.imageError}>🌅</Text>
        ) : (
          <Animated.Image
            source={{ uri: item.image }}
            alt={item.name}
            style={[styles.image, { opacity }]}
            blurRadius={blur}
            onError={() => setLoading(true)}
          />
        )}
        <View style={styles.badgesContainer}>
          {!loading && item.badge ? (
            <LinearGradient
              colors={["#ec4899", "#a855f7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.badge}
            >
              <Text style={styles.badgeText}>{item.badge}</Text>
            </LinearGradient>
          ) : (
            <Text></Text>
          )}
          {!loading && item.discount && (
            <LinearGradient
              colors={["#ec4899", "#a855f7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.discountBadge}
            >
              <Text style={styles.badgeText}>%{item.discount}</Text>
            </LinearGradient>
          )}
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.description}>{item?.description}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" color="gold" size={20} />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.oldPrice}>${item.originalPrice}</Text>
          )}
        </View>
        {!currentQty ? (
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              AddToCart(item);
            }}
          >
            <LinearGradient
              colors={["#2563eb", "#9333ea"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={styles.addButton}
            >
              <Text style={styles.addText}>+ Add</Text>
            </LinearGradient>
          </Pressable>
        ) : (
          <BottomControls quantity={currentQty} id={item.id} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderColor: "#9333ea",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#9333ea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 3,
  },

  imageContainer: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
    borderBottomWidth: 1,
    display: "flex",
    height: 300,
  },
  imageError: {
    fontSize: 250,
    backgroundColor: "#eee",
    height: "100%",
    width: "100%",
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  badgesContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  badge: {
    borderRadius: 25,
    width: 85,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  discountBadge: {
    borderRadius: 25,
    width: 50,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  content: {
    padding: 10,
    flexDirection: "column",
    gap: 10,
  },

  title: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  description: {
    fontWeight: "300",
    color: "#6b7280",
    fontSize: 12,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    marginLeft: 4,
    fontSize: 13,
  },

  reviews: {
    marginLeft: 5,
    color: "#888",
    fontSize: 12,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  price: {
    color: "#9333ea",
    fontWeight: "bold",
    fontSize: 18,
  },

  oldPrice: {
    textDecorationLine: "line-through",
    color: "#888",
  },

  addButton: {
    borderRadius: 25,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
