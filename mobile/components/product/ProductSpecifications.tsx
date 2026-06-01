import { CAPACITIES, COLOR_HEX, DEFAULT_COLORS } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Product } from "../carts/cartSlice";
import ColorSwatchSelector from "./ColorSwatchSelector";
import RatingsReviews from "./RatingsReviews";
import StorageCapacity from "./StorageCapacity";
import ThumbnailStripGallery from "./ThumbnailStripGallery";

type Props = {
  product: Product;

  setCurrentImage: (image: string) => void;
  imageFadeAnim: Animated.AnimatedValue;
};

export default function ProductSpecifications({
  product,

  setCurrentImage,
  imageFadeAnim,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Build color list from product data
  const productColors = product?.colorImages
    ? Object.keys(product.colorImages).map((name) => ({
        name,
        value: COLOR_HEX[name] || "#374151",
      }))
    : DEFAULT_COLORS;
  const [selectedColor, setSelectedColor] = useState(productColors[0]);
  // Handle color swatch selection with crossfade
  const selectColor = (color: { name: string; value: string }) => {
    setSelectedColor(color);

    // Get the image URL for this color
    const newImage = product?.colorImages?.[color.name] || product?.image || "";

    // Crossfade: fade out, swap image, fade back in
    Animated.timing(imageFadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentImage(newImage);
      Animated.timing(imageFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };
  // Expand description
  const toggleDescription = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };
  return (
    <View style={styles.detailsContainer}>
      {/* Header info */}
      <View style={styles.categoryRow}>
        <Text style={styles.categoryText}>{product.category}</Text>
        {product.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
      </View>

      <Text style={styles.titleText}>{product.name}</Text>

      {/* Ratings and Reviews */}
      <RatingsReviews product={product} />

      <View style={styles.divider} />

      {/* Color Swatch Selector */}
      <Text style={styles.sectionLabel}>Select Color</Text>
      <Text style={styles.sectionValueSub}>{selectedColor.name}</Text>
      <ColorSwatchSelector
        selectedColor={selectedColor}
        productColors={productColors}
        selectColor={selectColor}
      />

      {/* Thumbnail Strip Gallery */}
      <ThumbnailStripGallery
        product={product}
        selectedColor={selectedColor}
        selectColor={selectColor}
      />

      {/* Storage capacity pills */}
      {product.category === "Electronics" && (
        <>
          <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
            Storage Capacity
          </Text>
          <StorageCapacity />
        </>
      )}

      <View style={styles.divider} />

      {/* Expandable Product Description */}
      <Text style={styles.sectionLabel}>Overview</Text>
      <Text
        style={styles.descriptionText}
        numberOfLines={isExpanded ? undefined : 3}
      >
        {product.description} This cutting-edge {product.name} is engineered
        with the modern user in mind, providing unmatched speeds, crystal clear
        resolutions, and an ultra-durable casing. Ideal for power users
        demanding high-performance capabilities on a day-to-day basis.
        Experience a new era of technology with state-of-the-art craftsmanship
        and flawless operations.
      </Text>
      <Pressable style={styles.readMoreBtn} onPress={toggleDescription}>
        <Text style={styles.readMoreText}>
          {isExpanded ? "Collapse" : "Read Full Description"}
        </Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={14}
          color="#9333ea"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -30,
    paddingTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9333ea",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: "#faf5ff",
    borderWidth: 0.5,
    borderColor: "#c084fc",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9333ea",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1f2937",
    marginTop: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1f2937",
  },
  sectionValueSub: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "600",
    marginTop: 2,
    marginBottom: 10,
  },

  descriptionText: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 20,
    marginTop: 8,
    fontWeight: "500",
  },
  readMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 4,
  },
  readMoreText: {
    fontSize: 12,
    color: "#9333ea",
    fontWeight: "700",
  },
  thumbStrip: {
    marginTop: 14,
    marginBottom: 4,
  },
  thumbCard: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    backgroundColor: "#f3f4f6",
  },
  thumbCardActive: {
    borderColor: "#9333ea",
    borderWidth: 2.5,
    shadowColor: "#9333ea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
