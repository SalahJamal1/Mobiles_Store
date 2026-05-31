import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  selectedColor: { name: string; value: string };
  productColors: { name: string; value: string }[];
  selectColor: (color: { name: string; value: string }) => void;
};

export default function ColorSwatchSelector({
  selectedColor,
  productColors,
  selectColor,
}: Props) {
  return (
    <View style={styles.colorsRow}>
      {productColors.map((color) => {
        const isSelected = selectedColor.name === color.name;
        return (
          <Pressable
            key={color.name}
            style={[
              styles.colorCircleWrapper,
              isSelected && styles.colorCircleSelected,
            ]}
            onPress={() => selectColor(color)}
          >
            <View
              style={[styles.colorCircle, { backgroundColor: color.value }]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  colorsRow: {
    flexDirection: "row",
    gap: 14,
  },
  colorCircleWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorCircleSelected: {
    borderColor: "#9333ea",
  },
  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
});
