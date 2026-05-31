import { COLOR_HEX } from "@/utils/helpers";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { Product } from "../carts/cartSlice";

type Props = {
  product: Product;
  selectedColor: { name: string; value: string };
  selectColor: (color: { name: string; value: string }) => void;
};

export default function ThumbnailStripGallery({
  product,
  selectedColor,
  selectColor,
}: Props) {
  return (
    <>
      {product.colorImages && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbStrip}
          contentContainerStyle={{ gap: 10 }}
        >
          {Object.entries(product.colorImages).map(([colorName, imgUrl]) => {
            const isActive = selectedColor.name === colorName;
            return (
              <Pressable
                key={colorName}
                onPress={() =>
                  selectColor({
                    name: colorName,
                    value: COLOR_HEX[colorName] || "#374151",
                  })
                }
                style={[styles.thumbCard, isActive && styles.thumbCardActive]}
              >
                <Image source={{ uri: imgUrl }} style={styles.thumbImage} />
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
