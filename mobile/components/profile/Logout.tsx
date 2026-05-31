import { logout } from "@/lib/apiAuth";
import { AppDispatch } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { signout } from "./userSlice";

type Props = {
  showLogout: boolean;
  setShowLogout: (value: boolean) => void;
};

export default function Logout({ showLogout, setShowLogout }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      await SecureStore.deleteItemAsync("jwt");
      await SecureStore.deleteItemAsync("refresh_token");
      dispatch(signout());
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      Alert.alert("Error", message);
      setShowLogout(false);
    },
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showLogout}
      onRequestClose={() => setShowLogout(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { maxWidth: 320 }]}>
          <View style={[styles.modalIconBg, { backgroundColor: "#fef2f2" }]}>
            <Ionicons name="log-out" size={40} color="#ef4444" />
          </View>
          <Text style={styles.modalHeaderTitle}>Logging Out?</Text>
          <Text style={styles.modalHeaderSubtitle}>
            Are you sure you want to end your active session on this device?
          </Text>

          <Pressable style={styles.modalBtnRow} onPress={() => mutate()}>
            <LinearGradient
              colors={["#ef4444", "#f43f5e"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalSaveGradient}
            >
              {isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.modalSaveText}>Confirm Log Out</Text>
              )}
            </LinearGradient>
          </Pressable>

          <Pressable
            style={styles.modalCancelBtn}
            onPress={() => setShowLogout(false)}
          >
            <Text style={styles.modalCancelText}>Stay Logged In</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  /* MODALS STYLING */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  modalIconBg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1f2937",
  },
  modalHeaderSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
    textAlign: "center",
    marginBottom: 16,
  },
  modalFieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b7280",
    alignSelf: "flex-start",
    marginBottom: 6,
    marginTop: 10,
  },
  modalInput: {
    width: "100%",
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
  modalBtnRow: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 16,
  },
  modalSaveGradient: {
    paddingVertical: 12,
    alignItems: "center",
  },
  modalSaveText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  modalCancelBtn: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 6,
  },
  modalCancelText: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "700",
  },
});
