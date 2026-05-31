import useCategories from "@/hooks/useCategories";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
};

export default function Categories({ filter, setFilter }: Props) {
  const params = useLocalSearchParams();

  const { categories } = useCategories();

  const category: string = Array.isArray(params?.category)
    ? params?.category[0]
    : (params?.category ?? "All");
  useEffect(() => {
    setFilter(category);
  }, [category]);

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      style={styles.list}
      renderItem={({ item, index }) => {
        return filter === item.name ? (
          <Pressable key={index} onPress={() => setFilter(item.name)}>
            <LinearGradient
              colors={["#2563eb", "#9333ea"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={styles.activeItem}
            >
              <Text style={styles.activeText}>
                {item.icon} {item.name}
              </Text>
            </LinearGradient>
          </Pressable>
        ) : (
          <Pressable
            key={index}
            style={styles.item}
            onPress={() => setFilter(item.name)}
          >
            <Text style={styles.text}>
              {item.icon} {item.name}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 15,
  },

  separator: {
    width: 10,
  },

  item: {
    backgroundColor: "#eee",
    borderRadius: 14,
    width: 120,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  activeItem: {
    borderRadius: 25,
    width: 120,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#9333ea",
    fontWeight: "bold",
  },

  activeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
