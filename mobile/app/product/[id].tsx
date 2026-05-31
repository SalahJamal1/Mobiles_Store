import { Product } from "@/components/carts/cartSlice";
import ImageBanner from "@/components/product/ImageBanner";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import StickyBottomBar from "@/components/product/StickyBottomBar";
import { getProduct } from "@/lib/apiProducts";
import Loading from "@/ui/Loading";
import ProductNotFound from "@/ui/ProductNotFound";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  useAnimatedValue,
  View,
} from "react-native";

export const { width } = Dimensions.get("window");

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  // Find product by id
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => await getProduct(Number(id)),
    enabled: !!id,
  });

  // Selection states
  const [currentImage, setCurrentImage] = useState(product?.image || "");
  // Animations
  const entryFadeAnim = useAnimatedValue(0);
  const entrySlideAnim = useAnimatedValue(30);
  const imageFadeAnim = useAnimatedValue(1);

  // Run screen entrance transition
  useEffect(() => {
    if (product?.image) {
      setCurrentImage(product.image);
    }
    Animated.parallel([
      Animated.timing(entryFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(entrySlideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [product]);

  if (isLoading) return <Loading />;
  if (!product) return <ProductNotFound />;

  return (
    <View style={styles.screen}>
      {/* Dynamic Entry Animation Wrapper */}
      <Animated.View
        style={{
          flex: 1,
          opacity: entryFadeAnim,
          transform: [{ translateY: entrySlideAnim }],
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
        >
          {/* Parallax Hero Image Banner */}
          <ImageBanner
            currentImage={currentImage}
            imageFadeAnim={imageFadeAnim}
          />

          {/* Product Specifications Desk */}
          <ProductSpecifications
            product={product}
            setCurrentImage={setCurrentImage}
            imageFadeAnim={imageFadeAnim}
          />
        </ScrollView>
      </Animated.View>

      {/* Sticky Bottom Actions Bar */}
      <StickyBottomBar product={product} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  toastContainer: {
    position: "absolute",
    bottom: 110,
    left: 24,
    right: 24,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#22c55e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  toastGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  toastText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },
});
