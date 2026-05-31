import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RootState } from "@/store/store";
import AnimatedTab from "@/ui/AnimatedTab";
import Header from "@/ui/Header";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { carts } = useSelector((store: RootState) => store.carts);
  const quantity = carts.reduce((acc, cart) => acc + cart.quantity, 0);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        header: () => <Header />,
        tabBarStyle: {
          paddingTop: 15,
          height: 80,
          borderTopColor: "#a855f7",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AnimatedTab focused={focused}>
              <LinearGradient
                colors={
                  focused
                    ? ["#ec4899", "#a855f7"]
                    : ["transparent", "transparent"]
                }
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                }}
              >
                <Ionicons name="home" color={color} size={size ?? 28} />
                <Text
                  style={{
                    color,
                    fontSize: 12,
                    fontWeight: "700",
                    textTransform: "capitalize",
                  }}
                >
                  Home
                </Text>
              </LinearGradient>
            </AnimatedTab>
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          tabBarShowLabel: false,

          tabBarIcon: ({ focused, color, size }) => (
            <AnimatedTab focused={focused}>
              <LinearGradient
                colors={
                  focused
                    ? ["#ec4899", "#a855f7"]
                    : ["transparent", "transparent"]
                }
                style={{
                  alignItems: "center",
                  justifyContent: "center",

                  width: 80,
                  height: 50,
                  borderRadius: 14,
                }}
              >
                <Ionicons
                  name="tablet-landscape"
                  color={color}
                  size={size ?? 28}
                />
                <Text
                  style={{
                    color,
                    fontSize: 12,
                    fontWeight: "700",
                    textTransform: "capitalize",
                  }}
                >
                  Categories
                </Text>
              </LinearGradient>
            </AnimatedTab>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarShowLabel: false,

          tabBarIcon: ({ focused, color, size }) => (
            <AnimatedTab focused={focused}>
              <LinearGradient
                colors={
                  focused
                    ? ["#ec4899", "#a855f7"]
                    : ["transparent", "transparent"]
                }
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",

                  width: 60,
                  height: 55,
                  borderRadius: 14,
                }}
              >
                <Ionicons name="cart" color={color} size={size ?? 28} />
                <Text
                  style={{
                    color,
                    fontSize: 12,
                    fontWeight: "700",
                    textTransform: "capitalize",
                  }}
                >
                  cart
                </Text>
                {quantity > 0 && (
                  <View
                    style={{
                      backgroundColor: focused ? "white" : "#ec4899",
                      height: 18,
                      width: 18,
                      borderRadius: 9,
                      position: "absolute",
                      top: 2,
                      right: 4,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: focused ? "#ec4899" : "white" }}>
                      {quantity}
                    </Text>
                  </View>
                )}
              </LinearGradient>
            </AnimatedTab>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AnimatedTab focused={focused}>
              <LinearGradient
                colors={
                  focused
                    ? ["#ec4899", "#a855f7"]
                    : ["transparent", "transparent"]
                }
                style={{
                  alignItems: "center",
                  justifyContent: "center",

                  width: 55,
                  height: 50,
                  borderRadius: 14,
                }}
              >
                <Ionicons name="person" color={color} size={size ?? 28} />
                <Text
                  style={{
                    color,
                    fontSize: 12,
                    fontWeight: "700",
                    textTransform: "capitalize",
                  }}
                >
                  profile
                </Text>
              </LinearGradient>
            </AnimatedTab>
          ),
        }}
      />
    </Tabs>
  );
}
