import { StyleSheet, Text, View } from "react-native";

type Props = {
  message?: string;
};

export default function Error({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message ?? "Something went wrong 😑"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    color: "red",
  },
});
