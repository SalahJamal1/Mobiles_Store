import { RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Order from "../orders/Order";
import AccountDetails from "./AccountDetails";
import SelectorPill from "./SelectorPill";
import { getInitial } from "@/utils/helpers";
type Props = {
  contentFadeAnim: any;
  contentSlideAnim: any;
};

export default function ProfileDashBoard({
  contentFadeAnim,
  contentSlideAnim,
}: Props) {
  const { user } = useSelector((store: RootState) => store.user);

  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const triggerLayoutAnim = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  const switchAuthTab = (tab: string) => {
    triggerLayoutAnim();
    setActiveTab(tab);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* ── Profile Hero ── */}
      <LinearGradient
        colors={["#ec4899", "#a855f7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileHero}
      >
        <View style={styles.avatarOutline}>
          <View style={styles.avatarInner}>
            <Text style={styles.avatarInitials}>
              {getInitial(user?.fullName!)}
            </Text>
          </View>
          <Pressable style={styles.avatarEditPencil}>
            <Ionicons name="pencil" size={14} color="#fff" />
          </Pressable>
        </View>

        <Text style={styles.profileNameText}>{user?.fullName}</Text>
        <Text style={styles.profileEmailText}>{user?.email}</Text>

        <View style={styles.vipBadge}>
          <Ionicons name="sparkles" size={12} color="#facc15" />
          <Text style={styles.vipBadgeText}>{user?.role}</Text>
        </View>
      </LinearGradient>

      {/* ── Stats Bar ── */}
      <SelectorPill
        switchAuthTab={switchAuthTab}
        activeAuthTab={activeTab}
        tabs={["dashboard", "orders"]}
      />

      {/* ── Settings ── */}
      <Animated.View
        style={[
          styles.settingsArea,
          {
            opacity: contentFadeAnim,
            transform: [{ translateY: contentSlideAnim }],
          },
        ]}
      >
        {/* ── Account Details ── */}
        {activeTab === "dashboard" ? <AccountDetails /> : <Order />}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileHero: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
  },
  avatarOutline: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    padding: 3,
    position: "relative",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
  },
  avatarEditPencil: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#9333ea",
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileNameText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    textTransform: "capitalize",
  },
  profileEmailText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  vipBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 10,
  },
  vipBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
  statsContainer: {
    backgroundColor: "#ffffff", // light white card
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: -30,
    borderRadius: 22,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#f3f4f6", // light gray border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  statColumn: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1f2937", // dark gray text
  },
  statLabel: {
    fontSize: 11,
    color: "#9ca3af", // muted gray
    fontWeight: "600",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: "60%",
    backgroundColor: "#e5e7eb", // light divider
    alignSelf: "center",
  },
  settingsArea: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
});
