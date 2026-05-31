import CartEmpty from "@/components/carts/CartEmpty";
import CartList from "@/components/carts/CartList";
import PricingSummary from "@/components/carts/PricingSummary";
import PromoCode from "@/components/carts/PromoCode";
import { RootState } from "@/store/store";
import { useState } from "react";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Cart() {
  const { carts } = useSelector((state: RootState) => state.carts);
  const [appliedPromo, setAppliedPromo] = useState("");
  if (!carts?.length) return <CartEmpty />;
  return (
    <View style={styles.screen}>
      {/* App Header Area */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Desk</Text>
        <Text style={styles.headerSubtitle}>Manage your devices & orders</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ACTIVE CART TAB */}
        <CartList />

        {/* Promo Code Card */}
        <PromoCode
          setAppliedPromo={setAppliedPromo}
          appliedPromo={appliedPromo}
        />

        {/* Pricing Summary Card */}
        <PricingSummary appliedPromo={appliedPromo} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1f2937",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
