import { createOrder } from "@/lib/apiOrders";
import { AppDispatch, RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Cart, clearCart } from "./cartSlice";
type Props = {
  appliedPromo: string;
};

const calculations = (appliedPromo: string, carts: Cart[]) => {
  const subtotal = carts.reduce((acc, item) => acc + item.totalPrice, 0);

  const discount =
    appliedPromo === "MOB50"
      ? subtotal * 0.5
      : appliedPromo === "WELCOME10"
        ? subtotal * 0.1
        : 0;

  const delivery = 5;

  const tax = subtotal * 0.16;

  const total = subtotal - discount + delivery + tax;

  return {
    subtotal,
    discount,
    delivery,
    tax,
    total,
  };
};

export default function PricingSummary({ appliedPromo }: Props) {
  const { carts } = useSelector((state: RootState) => state.carts);
  const { auth, user } = useSelector((store: RootState) => store.user);
  const router = useRouter();
  const calculation = useMemo(
    () => calculations(appliedPromo, carts),
    [appliedPromo, carts],
  );
  const [location, setLocation] = useState<null | { lat: number; lng: number }>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch<AppDispatch>();

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (res: any) => {
      dispatch(clearCart());
      const url = res?.data?.url;

      if (!url) {
        Alert.alert("Error", "No payment URL");
        return;
      }

      router.push({
        pathname: "/payments",
        params: { url },
      });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;

      Alert.alert("Error", message || "Something went wrong");
    },
  });
  const onSubmit = (data: any) => {
    if (!location) {
      Alert.alert("Location Error", "Location is required");
      return;
    }
    const newOrder = {
      customerName: user?.fullName,
      phone: data.phone,
      cart: carts,
      orderPrice: calculation.total,
      location,
    };
    mutate(newOrder);
  };

  const getLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        return;
      }

      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        Alert.alert("GPS is OFF", "Please enable location services");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      console.log("LOCATION ERROR:", error);
      Alert.alert("Error", "Could not get location");
    } finally {
      setLoading(false);
    }
  };
  const onError = (errors: any) => {
    const firstErrorKey = Object.keys(errors)[0];
    const firstErrorValue = (Object.values(errors)[0] as any).message;

    Alert.alert(`Error in ${firstErrorKey}`, firstErrorValue);
  };

  return (
    <View style={[styles.card, styles.summaryCard]}>
      {auth && (
        <>
          <Text style={styles.summaryTitle}>Receiver Information</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone must be 10 digits",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.formRow}>
                  <Text style={styles.summaryLabel}>Phone</Text>
                  <TextInput
                    placeholder="Enter Your Phone"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.textInput}
                  />
                </View>
              )}
            />
            {!location && (
              <Pressable style={styles.locatorButton} onPress={getLocation}>
                <LinearGradient
                  colors={["#ec4899", "#a855f7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.locatorGradient}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Ionicons
                        name="location-outline"
                        size={18}
                        color="#fff"
                      />
                      <Text style={styles.locatorText}>
                        Get Current Location
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </Pressable>
            )}
          </View>

          <View style={styles.divider} />
        </>
      )}
      <Text style={styles.summaryTitle}>Bill Breakdown</Text>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>
          ${calculation.subtotal.toFixed(2)}
        </Text>
      </View>

      {calculation.discount > 0 && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Promo Discount</Text>
          <Text style={[styles.summaryValue, styles.discountText]}>
            -${calculation.discount.toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Shipping Fee</Text>
        <Text style={styles.summaryValue}>
          {calculation.delivery === 0 ? (
            <Text style={{ color: "#22c55e", fontWeight: "bold" }}>FREE</Text>
          ) : (
            <Text style={styles.summaryValue}>
              ${calculation.delivery.toFixed(2)}
            </Text>
          )}
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Estimated Tax (16%)</Text>
        <Text style={styles.summaryValue}>${calculation.tax.toFixed(2)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={[styles.summaryRow, { marginTop: 10 }]}>
        <Text style={styles.grandTotalLabel}>Grand Total</Text>
        <Text style={styles.grandTotalValue}>
          ${calculation.total.toFixed(2)}
        </Text>
      </View>

      {/* Proceed to checkout button */}
      {auth ? (
        <Pressable
          style={styles.checkoutPressable}
          onPress={handleSubmit(onSubmit, onError)}
        >
          <LinearGradient
            colors={["#ec4899", "#a855f7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.checkoutGradient}
          >
            {isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                <Ionicons name="arrow-forward-outline" size={20} color="#fff" />
              </>
            )}
          </LinearGradient>
        </Pressable>
      ) : (
        <Pressable
          style={styles.checkoutPressable}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <LinearGradient
            colors={["#ec4899", "#a855f7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.checkoutGradient}
          >
            <Text style={styles.checkoutText}>Login to Checkout</Text>
            <Ionicons name="arrow-forward-outline" size={20} color="#fff" />
          </LinearGradient>
        </Pressable>
      )}
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
  formRow: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: "40%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    color: "#374151",
    backgroundColor: "#f9fafb",
    marginBottom: 12,
    fontWeight: "500",
  },
  locatorButton: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  locatorGradient: {
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 10,
  },
  locatorText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  summaryCard: {
    flexDirection: "column",
    padding: 18,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 13,
    color: "#1f2937",
    fontWeight: "600",
  },
  discountText: {
    color: "#ef4444",
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 12,
  },
  grandTotalLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1f2937",
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#9333ea",
  },
  checkoutPressable: {
    marginTop: 16,
    borderRadius: 14,
    overflow: "hidden",
  },
  checkoutGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  savedNotice: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  restoreBtn: {
    flex: 1.5,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  restoreGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
  },
  restoreText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  savedDeleteBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#fca5a5",
    backgroundColor: "#fff5f5",
    borderRadius: 10,
    paddingVertical: 8,
  },
  savedDeleteText: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "700",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 380,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalIconBg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  modalIconBgGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeaderTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 6,
  },
  modalHeaderSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
  },
  receiptContainer: {
    width: "100%",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  receiptLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  receiptValue: {
    fontSize: 12,
    color: "#1f2937",
    fontWeight: "600",
  },
});
