import { useEffect } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const AUTH_TAB_PADDING = 6;
const AUTH_TAB_CONTAINER_WIDTH = width - 48; // marginHorizontal 24
const AUTH_TAB_WIDTH = (AUTH_TAB_CONTAINER_WIDTH - AUTH_TAB_PADDING * 2) / 2;
type Props = {
  switchAuthTab: (tab: string) => void;
  activeAuthTab: string;
  tabs: [string, string];
};

export default function SelectorPill({
  switchAuthTab,
  activeAuthTab,
  tabs,
}: Props) {
  const authTabTranslateX = useAnimatedValue(0);
  // Handle slide indicator animation for auth tabs
  useEffect(() => {
    Animated.spring(authTabTranslateX, {
      toValue: activeAuthTab === tabs[0] ? 0 : AUTH_TAB_WIDTH,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
  }, [activeAuthTab]);
  return (
    <View style={styles.authTabContainer}>
      {/* Sliding Indicator Tab Background */}
      <Animated.View
        style={[
          styles.slidingAuthPill,
          {
            width: AUTH_TAB_WIDTH,
            transform: [{ translateX: authTabTranslateX }],
          },
        ]}
      />

      <Pressable
        style={styles.authTabButton}
        onPress={() => switchAuthTab(tabs[0])}
      >
        <Text
          style={[
            styles.authTabText,
            activeAuthTab === tabs[0] && styles.authTabTextActive,
          ]}
        >
          {tabs[0] === "login" ? "Sign In" : "Dashboard"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.authTabButton}
        onPress={() => switchAuthTab(tabs[1])}
      >
        <Text
          style={[
            styles.authTabText,
            activeAuthTab === tabs[1] && styles.authTabTextActive,
          ]}
        >
          {tabs[1] === "signup" ? "Create Account" : "Order Details"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  authTabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 24,
    marginTop: -25, // overlap header slightly
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    position: "relative",
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  slidingAuthPill: {
    position: "absolute",
    top: 6,
    bottom: 6,
    left: 6,
    backgroundColor: "#9333ea",
    borderRadius: 14,
  },
  authTabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  authTabText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b7280",
  },
  authTabTextActive: {
    color: "#fff",
  },
});
