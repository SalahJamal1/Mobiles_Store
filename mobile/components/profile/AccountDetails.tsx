import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Logout from "./Logout";
import PersonalInfoModal from "./PersonalInfoModal";

export default function AccountDetails() {
  const [showPersonalInfo, setShowPersonalInfo] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  return (
    <View>
      <Text style={styles.sectionTitle}>Account Details</Text>

      <Pressable
        style={styles.settingRow}
        onPress={() => {
          setShowPersonalInfo(true);
        }}
      >
        <View style={styles.rowLeft}>
          <View style={[styles.iconBox, { backgroundColor: "#faf5ff" }]}>
            <Ionicons name="person-outline" size={18} color="#9333ea" />
          </View>
          <Text style={styles.rowText}>Personal Information</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
      </Pressable>

      <Pressable style={styles.settingRow}>
        <View style={styles.rowLeft}>
          <View style={[styles.iconBox, { backgroundColor: "#eff6ff" }]}>
            <Ionicons name="map-outline" size={18} color="#2563eb" />
          </View>
          <Text style={styles.rowText}>Address Book</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
      </Pressable>

      <Pressable style={styles.settingRow}>
        <View style={styles.rowLeft}>
          <View style={[styles.iconBox, { backgroundColor: "#f0fdf4" }]}>
            <Ionicons name="card-outline" size={18} color="#16a34a" />
          </View>
          <Text style={styles.rowText}>Payment Methods</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
      </Pressable>

      {/* ── Support ── */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Support</Text>

      <Pressable style={styles.settingRow}>
        <View style={styles.rowLeft}>
          <View style={[styles.iconBox, { backgroundColor: "#fdf2f8" }]}>
            <Ionicons name="help-circle-outline" size={18} color="#db2777" />
          </View>
          <Text style={styles.rowText}>Help Center & FAQs</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
      </Pressable>

      {/* ── Logout ── */}
      <Pressable
        style={[styles.settingRow, { marginTop: 20, borderRadius: 14 }]}
        onPress={() => setShowLogout(true)}
      >
        <View style={styles.rowLeft}>
          <View style={[styles.iconBox, { backgroundColor: "#fef2f2" }]}>
            <Ionicons name="log-out-outline" size={18} color="#ef4444" />
          </View>
          <Text style={[styles.rowText, { color: "#ef4444" }]}>
            Log Out Account
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#ef4444" />
      </Pressable>
      <PersonalInfoModal
        showPersonalInfo={showPersonalInfo}
        setShowPersonalInfo={setShowPersonalInfo}
      />
      <Logout showLogout={showLogout} setShowLogout={setShowLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    paddingLeft: 6,
    color: "#6b7280", // medium gray label
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#ffffff", // white card row
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6", // very light separator
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1f2937", // dark text
  },
});
