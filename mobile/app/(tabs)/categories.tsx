import useCategories from "@/hooks/useCategories";
import Error from "@/ui/Error";
import Loading from "@/ui/Loading";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
export default function Categories() {
  const router = useRouter();
  const { categories, isLoading } = useCategories();
  if (isLoading) return <Loading />;
  if (!categories) return <Error message="No categories found 😑" />;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories ?? []}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/(tabs)?category=${item.name}`)}
            style={styles.category}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.subtitle}>{item.name}</Text>
            <Text style={styles.count}>{item.count} items</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  title: {
    color: "#9333ea",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  category: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    width: "45%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 40,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  count: {
    fontSize: 17,
    color: "#888",
  },
});
