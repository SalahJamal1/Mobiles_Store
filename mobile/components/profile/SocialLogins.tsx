import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  triggerLayoutAnim: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export default function SocialLogins({
  triggerLayoutAnim,
  setIsLoggedIn,
}: Props) {
  return (
    <>
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialRow}>
        <Pressable
          style={styles.socialCircle}
          onPress={() => {
            triggerLayoutAnim();
            setIsLoggedIn(true);
          }}
        >
          <Ionicons name="logo-google" size={20} color="#ea4335" />
        </Pressable>

        <Pressable
          style={styles.socialCircle}
          onPress={() => {
            triggerLayoutAnim();
            setIsLoggedIn(true);
          }}
        >
          <Ionicons name="logo-apple" size={20} color="#000" />
        </Pressable>

        <Pressable
          style={styles.socialCircle}
          onPress={() => {
            triggerLayoutAnim();
            setIsLoggedIn(true);
          }}
        >
          <Ionicons name="logo-facebook" size={20} color="#1877f2" />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
});
