import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  useAnimatedValue,
  View,
} from "react-native";

type Props = {
  currentImage: string;
  imageFadeAnim: Animated.Value;
};
const { width } = Dimensions.get("window");
export default function ImageBanner({ currentImage, imageFadeAnim }: Props) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heartScaleAnim = useAnimatedValue(1);

  // Handle wishlist heart spring animation
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

    // Play Spring bounce
    Animated.sequence([
      Animated.spring(heartScaleAnim, {
        toValue: 1.4,
        useNativeDriver: true,
        tension: 80,
        friction: 4,
      }),
      Animated.spring(heartScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 4,
      }),
    ]).start();
  };
  return (
    <View style={styles.imageContainer}>
      <Animated.Image
        source={{ uri: currentImage }}
        style={[styles.heroImage, { opacity: imageFadeAnim }]}
        onError={() => setError(currentImage)}
      />

      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "transparent"]}
        style={styles.gradientOverlay}
      />

      {/* Top Bar Floating Controls */}
      <View style={styles.floatingHeader}>
        <Pressable style={styles.circleBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#1f2937" />
        </Pressable>

        <Pressable style={styles.circleBtn} onPress={toggleFavorite}>
          <Animated.View style={{ transform: [{ scale: heartScaleAnim }] }}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#ef4444" : "#1f2937"}
            />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "#f3f4f6",
    position: "relative",
    width: width,
    height: width * 0.95,
  },
  imageError: {
    fontSize: 250,
    backgroundColor: "#eee",
    textAlign: "center",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  floatingHeader: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
