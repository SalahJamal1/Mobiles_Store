import { RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";

type Props = {
  showPersonalInfo: boolean;
  setShowPersonalInfo: (showPersonalInfo: boolean) => void;
};

export default function PersonalInfoModal({
  showPersonalInfo,
  setShowPersonalInfo,
}: Props) {
  const { user } = useSelector((store: RootState) => store.user);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPersonalInfo}
      onRequestClose={() => setShowPersonalInfo(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { maxWidth: 320 }]}>
          <View style={[styles.modalIconBg, { backgroundColor: "#faf5ff" }]}>
            <Ionicons name="person-outline" size={40} color="#9333ea" />
          </View>
          <Text style={styles.modalHeaderTitle}>Account Details</Text>
          <Text style={styles.modalHeaderSubtitle}>
            Your profile information (read-only)
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#facc15"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Email Address"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              keyboardType="email-address"
              value={user?.email ?? ""}
              editable={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Ionicons
              style={styles.inputIcon}
              name="sparkles"
              size={20}
              color="#facc15"
            />
            <TextInput
              style={styles.inputField}
              placeholder="Role"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              keyboardType="default"
              value={`Role / ${user?.role ?? ""}`}
              editable={false}
            />
          </View>
          <Pressable
            style={styles.modalBtnRow}
            onPress={() => {
              setShowPersonalInfo(false);
            }}
          >
            <LinearGradient
              colors={["#a855f7", "#ec4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalSaveGradient}
            >
              <Text style={styles.modalSaveText}>Done</Text>
            </LinearGradient>
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 2,
    position: "relative",
  },
  inputIcon: {
    marginRight: 12,
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
});
