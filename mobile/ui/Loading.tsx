import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"#9333ea"} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#9333ea",
    marginTop: 10,
  },
});
