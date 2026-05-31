import { CAPACITIES } from "@/utils/helpers";
import { LinearGradient } from "expo-linear-gradient";
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  selectedCapacity: string;
  setSelectedCapacity: (capacity: string) => void;
};

export default function StorageCapacity({
  selectedCapacity,
  setSelectedCapacity,
}: Props) {
  return (
    <View style={styles.storageRow}>
      {CAPACITIES.map((cap) => {
        const isSelected = selectedCapacity === cap;
        return (
          <Pressable
            key={cap}
            style={styles.storagePillPressable}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setSelectedCapacity(cap);
            }}
          >
            {isSelected ? (
              <LinearGradient
                colors={["#ec4899", "#a855f7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.storagePillActive}
              >
                <Text style={styles.storagePillTextActive}>{cap}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.storagePillInactive}>
                <Text style={styles.storagePillTextInactive}>{cap}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  storageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  storagePillPressable: {
    borderRadius: 12,
    overflow: "hidden",
  },
  storagePillActive: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  storagePillTextActive: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },
  storagePillInactive: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  storagePillTextInactive: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "700",
  },
});
