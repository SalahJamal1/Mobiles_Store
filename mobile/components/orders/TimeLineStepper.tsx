import { Order } from "@/hooks/useOrders";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  order: Order;
};

export default function TimeLineStepper({ order }: Props) {
  return (
    <View style={styles.timelineContainer}>
      <Text style={styles.timelineTitle}>Tracking status</Text>
      <View style={styles.stepperRow}>
        {/* Step 1: Processing */}
        <View style={styles.stepNodeContainer}>
          <View
            style={[
              styles.stepNodeCircle,
              order.step >= 1
                ? styles.stepNodeCircleActive
                : styles.stepNodeCircleInactive,
            ]}
          >
            {order.step >= 1 ? (
              <Ionicons name="checkmark" size={12} color="#fff" />
            ) : (
              <Text style={styles.stepIndexText}>1</Text>
            )}
          </View>
          <Text
            style={[
              styles.stepNodeLabel,
              order.step >= 1 && styles.stepNodeLabelActive,
            ]}
          >
            Placed
          </Text>
        </View>

        {/* Line 1 */}
        <View
          style={[
            styles.stepConnectorLine,
            order.step >= 2
              ? styles.stepConnectorActive
              : styles.stepConnectorInactive,
          ]}
        />

        {/* Step 2: Shipped */}
        <View style={styles.stepNodeContainer}>
          <View
            style={[
              styles.stepNodeCircle,
              order.step >= 2
                ? styles.stepNodeCircleActive
                : styles.stepNodeCircleInactive,
            ]}
          >
            {order.step >= 2 ? (
              <Ionicons name="checkmark" size={12} color="#fff" />
            ) : (
              <Text style={styles.stepIndexText}>2</Text>
            )}
          </View>
          <Text
            style={[
              styles.stepNodeLabel,
              order.step >= 2 && styles.stepNodeLabelActive,
            ]}
          >
            Shipped
          </Text>
        </View>

        {/* Line 2 */}
        <View
          style={[
            styles.stepConnectorLine,
            order.step >= 3
              ? styles.stepConnectorActive
              : styles.stepConnectorInactive,
          ]}
        />

        {/* Step 3: Delivered */}
        <View style={styles.stepNodeContainer}>
          <View
            style={[
              styles.stepNodeCircle,
              order.step >= 3
                ? styles.stepNodeCircleActive
                : styles.stepNodeCircleInactive,
            ]}
          >
            {order.step >= 3 ? (
              <Ionicons name="checkmark" size={12} color="#fff" />
            ) : (
              <Text style={styles.stepIndexText}>3</Text>
            )}
          </View>
          <Text
            style={[
              styles.stepNodeLabel,
              order.step >= 3 && styles.stepNodeLabelActive,
            ]}
          >
            Delivered
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timelineContainer: {
    marginVertical: 4,
  },
  timelineTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  stepNodeContainer: {
    alignItems: "center",
    width: 60,
  },
  stepNodeCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNodeCircleActive: {
    backgroundColor: "#9333ea",
  },
  stepNodeCircleInactive: {
    backgroundColor: "#e5e7eb",
  },
  stepIndexText: {
    fontSize: 10,
    color: "#9ca3af",
    fontWeight: "700",
  },
  stepNodeLabel: {
    fontSize: 10,
    color: "#9ca3af",
    fontWeight: "600",
    marginTop: 4,
  },
  stepNodeLabelActive: {
    color: "#9333ea",
    fontWeight: "700",
  },
  stepConnectorLine: {
    flex: 1,
    height: 2,
    marginHorizontal: -10,
    marginTop: -14, // align with circle centers
  },
  stepConnectorActive: {
    backgroundColor: "#9333ea",
  },
  stepConnectorInactive: {
    backgroundColor: "#e5e7eb",
  },
});
