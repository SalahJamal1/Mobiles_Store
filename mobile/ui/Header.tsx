import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  TextInput,
  useAnimatedValue,
  View,
} from "react-native";
import Logo from "./Logo";
export default function Header() {
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState<boolean>(false);
  const anim = useAnimatedValue(0);
  useEffect(() => {
    Animated.timing(anim, {
      toValue: search ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [search]);

  const searchHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 40],
  });

  const searchOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const headerHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [120, 170],
  });
  return (
    <Animated.View
      style={{
        height: headerHeight,
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <LinearGradient
        colors={["#ec4899", "#a855f7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 10,
          borderBottomRightRadius: 35,
          borderBottomLeftRadius: 35,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            backgroundColor: "transparent",
          }}
        >
          <Logo />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
              gap: 10,
            }}
          >
            <Pressable onPress={() => setSearch(!search)}>
              <Ionicons
                name="search"
                color={Colors[colorScheme].background}
                size={24}
              />
            </Pressable>
          </View>
        </View>
        {/* {search && ( */}
        <Animated.View
          style={{
            height: searchHeight,
            opacity: searchOpacity,
            overflow: "hidden",
            marginHorizontal: 12,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: search ? 1 : 0,
            borderRadius: 14,
            borderColor: Colors[colorScheme].background,
            paddingHorizontal: 10,
          }}
        >
          <Ionicons
            name="search"
            size={20}
            color={Colors[colorScheme].tabIconDefault}
          />

          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              color: Colors[colorScheme].background,
            }}
            autoCapitalize="none"
            placeholder="Search"
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
          />
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}
