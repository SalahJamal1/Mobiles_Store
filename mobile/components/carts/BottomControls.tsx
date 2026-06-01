import { AppDispatch } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { decCart, incCart, removeFromCart } from "./cartSlice";

type Props = {
  quantity: number;
  id?: number;
  capacityName: string;
};
export default function BottomControls({ quantity, id, capacityName }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handelControllers = (e: any, type: "inc" | "dec" | "remove") => {
    e.stopPropagation();
    if (!id) return;
    switch (type) {
      case "inc":
        dispatch(incCart({ id, capacityName }));
        break;
      case "dec":
        dispatch(decCart({ id, capacityName }));
        break;
      case "remove":
        dispatch(removeFromCart({ id, capacityName }));
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles.controlsRow}>
      <View style={styles.stepperContainer}>
        <Pressable
          style={styles.stepperButton}
          onPress={(e) => handelControllers(e, "dec")}
        >
          <Ionicons name="remove" size={16} color="#9333ea" />
        </Pressable>
        <Text style={styles.stepperValue}>{quantity}</Text>
        <Pressable
          onPress={(e) => handelControllers(e, "inc")}
          style={styles.stepperButton}
        >
          <Ionicons name="add" size={16} color="#9333ea" />
        </Pressable>
      </View>

      <View style={styles.actionButtons}>
        <Pressable
          onPress={(e) => handelControllers(e, "remove")}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={18} color="#ef4444" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  stepperButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1f2937",
    paddingHorizontal: 8,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  heartButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#faf5ff",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    width: 32,
    height: 32,
    marginLeft: 15,
    borderRadius: 10,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
  },
});
