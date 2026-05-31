import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import Login from "./Login";
import SelectorPill from "./SelectorPill";
import SignUp from "./SignUp";

type Props = {
  contentFadeAnim: Animated.Value;
  contentSlideAnim: Animated.Value;
  activeAuthTab: string;
  switchAuthTab: (tab: string) => void;
};

export default function AuthPanel({
  contentFadeAnim,
  contentSlideAnim,
  activeAuthTab,
  switchAuthTab,
}: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header Hero Banner */}
      <LinearGradient
        colors={["#ec4899", "#a855f7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.authHeader}
      >
        <View style={styles.authLogoCircle}>
          <Ionicons name="phone-portrait-outline" size={40} color="#fff" />
        </View>
        <Text style={styles.authTitle}>Mobile Desk Account</Text>
        <Text style={styles.authSubtitle}>
          Unlock loyalty rewards & track purchases
        </Text>
      </LinearGradient>

      {/* Login / Signup Selector Pill */}
      <SelectorPill
        switchAuthTab={switchAuthTab}
        activeAuthTab={activeAuthTab}
        tabs={["login", "signup"]}
      />
      {/* Form Container with slide & fade anim */}
      <Animated.View
        style={[
          styles.formContainer,
          {
            opacity: contentFadeAnim,
            transform: [{ translateY: contentSlideAnim }],
          },
        ]}
      >
        {activeAuthTab === "login" /* LOGIN TAB FORM */ ? (
          <Login />
        ) : (
          /* SIGNUP TAB FORM */
          <SignUp switchAuthTab={switchAuthTab} />
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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

  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
  },
});
