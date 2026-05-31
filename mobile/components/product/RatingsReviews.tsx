import { Product } from "@/hooks/useProducts";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  product: Product;
};

export default function RatingsReviews({ product }: Props) {
  return (
    <View style={styles.ratingsRow}>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= Math.floor(product.rating) ? "star" : "star-outline"}
            size={16}
            color="#eab308"
          />
        ))}
      </View>
      <Text style={styles.ratingValue}>{product.rating}</Text>
      <Text style={styles.reviewsCount}>({product.reviews} reviews)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 3,
    marginRight: 6,
  },
  ratingValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1f2937",
  },
  reviewsCount: {
    fontSize: 12,
    color: "#9ca3af",
    marginLeft: 6,
    fontWeight: "500",
  },
});
