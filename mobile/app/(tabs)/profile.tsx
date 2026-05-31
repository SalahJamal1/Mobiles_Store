import AuthPanel from "@/components/profile/AuthPanel";
import ProfileDashBoard from "@/components/profile/ProfileDashBoard";
import { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { Animated, LayoutAnimation, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

export default function Profile() {
  // Authentication State
  const [activeAuthTab, setActiveAuthTab] = useState<string>("login");
  const { auth } = useSelector((store: RootState) => store.user);
  // Animated values
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const contentSlideAnim = useRef(new Animated.Value(20)).current;

  // Handle content entry fade and slide-up transitions
  useEffect(() => {
    contentFadeAnim.setValue(0);
    contentSlideAnim.setValue(20);

    Animated.parallel([
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeAuthTab]);

  // Trigger LayoutAnimation
  const triggerLayoutAnim = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  // Switch active auth tab
  const switchAuthTab = (tab: string) => {
    triggerLayoutAnim();
    setActiveAuthTab(tab);
  };

  return (
    <View style={[styles.screen]}>
      {/* ----------------- STATE 1: LOGGED-OUT AUTH PANEL ----------------- */}
      {!auth ? (
        <AuthPanel
          contentFadeAnim={contentFadeAnim}
          contentSlideAnim={contentSlideAnim}
          activeAuthTab={activeAuthTab}
          switchAuthTab={switchAuthTab}
        />
      ) : (
        /* ----------------- STATE 2: LOGGED-IN PROFILE DASHBOARD ----------------- */
        <ProfileDashBoard
          contentFadeAnim={contentFadeAnim}
          contentSlideAnim={contentSlideAnim}
        />
      )}

      {/* ----------------- LOGOUT CONFIRMATION MODAL ----------------- */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authHeader: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  authLogoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  authTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  authSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
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
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
  },
});
