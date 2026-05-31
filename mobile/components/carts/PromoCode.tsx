import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  setAppliedPromo: (appliedPromo: string) => void;
  appliedPromo: string;
};
const promoCode = ["MOB50", "WELCOME10"];
export default function PromoCode({ appliedPromo, setAppliedPromo }: Props) {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  return (
    <View style={[styles.card, styles.promoCard]}>
      <Text style={styles.promoTitle}>Promotional Discount</Text>
      <Text style={styles.promoSubtitle}>
        Try entering <Text style={{ fontWeight: "bold" }}>MOB50</Text> or{" "}
        <Text style={{ fontWeight: "bold" }}>WELCOME10</Text>
      </Text>

      {appliedPromo ? (
        <View style={styles.appliedPromoContainer}>
          <View style={styles.appliedPromoTextWrapper}>
            <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
            <Text style={styles.appliedPromoText}>
              Code <Text style={{ fontWeight: "bold" }}>{appliedPromo}</Text>{" "}
              Applied ({appliedPromo === "MOB50" ? "50%" : "10%"} Off)
            </Text>
          </View>
          <Pressable
            style={styles.promoClearBtn}
            onPress={() => setAppliedPromo("")}
          >
            <Text style={styles.promoClearText}>Remove</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.promoInputContainer}>
          <TextInput
            value={promoInput}
            onChangeText={(e) => setPromoInput(e)}
            style={styles.promoInput}
            placeholder="Discount Code"
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect={false}
          />
          <Pressable
            style={styles.promoApplyBtn}
            onPress={() => {
              if (!promoInput) {
                setPromoError("Please enter a promo code");
                return;
              }
              if (!promoCode.includes(promoInput)) {
                setPromoError("Invalid Promo Code");
                return;
              }
              setAppliedPromo(promoInput);
              setPromoError("");
              setPromoInput("");
            }}
          >
            <Text style={styles.promoApplyText}>Apply</Text>
          </Pressable>
        </View>
      )}
      {promoError && <Text style={styles.promoErrorText}>{promoError}</Text>}
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
  promoCard: {
    flexDirection: "column",
    padding: 18,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2937",
  },
  promoSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
    marginBottom: 12,
  },
  promoInputContainer: {
    flexDirection: "row",
    gap: 10,
  },
  promoInput: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 13,
    fontWeight: "600",
    color: "#1f2937",
  },
  promoApplyBtn: {
    backgroundColor: "#9333ea",
    borderRadius: 12,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  promoApplyText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  appliedPromoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 12,
    padding: 10,
  },
  appliedPromoTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  appliedPromoText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },
  promoClearBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  promoClearText: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "700",
  },
  promoErrorText: {
    color: "#ef4444",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 6,
  },
});
