import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProductNotFound() {
  const router = useRouter();
  return (
    <View style={styles.errorScreen}>
      <Ionicons name="alert-circle-outline" size={80} color="#ef4444" />
      <Text style={styles.errorTitle}>Product Not Found</Text>
      <Text style={styles.errorSubtitle}>
        We couldn't locate this mobile or item. Please browse other devices on
        our catalog.
      </Text>
      <Pressable style={styles.errorBackBtn} onPress={() => router.back()}>
        <Text style={styles.errorBackText}>Back to Catalog</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  errorScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  errorBackBtn: {
    backgroundColor: "#9333ea",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
  },
  errorBackText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
