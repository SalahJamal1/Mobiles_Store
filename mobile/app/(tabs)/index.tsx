import Categories from "@/components/home/Categories";
import Products from "@/components/home/Products";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function TabOneScreen() {
  const [filter, setFilter] = useState<string>("All");

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <LinearGradient
        colors={["#2563eb", "#9333ea"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 1 }}
        style={styles.linear_gradient}
      >
        <View style={styles.view_title}>
          <Ionicons name="star" size={17} color="#fff" />
          <Text style={styles.title}>LIMITED OFFER</Text>
        </View>
        <Text style={styles.subtitle}>Weekend Sale!</Text>
        <Text style={styles.separator}>Up to 50% off on selected items</Text>
        <Pressable style={styles.btn}>
          <Text style={styles.btn_text}>Shop Now</Text>
        </Pressable>
      </LinearGradient>

      <Text style={styles.main_title}>Shop by Category</Text>
      <Categories filter={filter} setFilter={setFilter} />

      <Products filter={filter} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  linear_gradient: {
    borderRadius: 10,
    marginBottom: 30,
    padding: 20,
  },
  view_title: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    marginBottom: 10,
  },
  main_title: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    letterSpacing: 1,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    letterSpacing: 1,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  separator: {
    fontSize: 12,
    letterSpacing: 1,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 14,
  },
  btn: {
    backgroundColor: "#eee",
    borderRadius: 14,
    width: 80,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_text: {
    color: "#9333ea",
    fontWeight: "bold",
  },
});
