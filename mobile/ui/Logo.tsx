import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

import { useColorScheme } from "../hooks/useColorScheme";

export default function Logo() {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <LinearGradient
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors[colorScheme].background,
        }}
        colors={["#ec4899", "#a855f7"]}
      >
        <MaterialIcons
          name="phone-iphone"
          size={24}
          color={Colors[colorScheme].background}
        />
      </LinearGradient>
      <Text
        style={{
          color: `${Colors[colorScheme].background}`,
          fontSize: 17,
          fontWeight: "700",
          letterSpacing: 2,
        }}
      >
        Luxe Shop
      </Text>
    </View>
  );
}
