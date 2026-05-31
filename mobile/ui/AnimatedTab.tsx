import { ReactNode, useEffect } from "react";
import { Animated, useAnimatedValue } from "react-native";

type Props = {
  focused: boolean;
  children: ReactNode;
};
export default function AnimatedTab({ focused, children }: Props) {
  const scale = useAnimatedValue(0);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1 : 0.9,
      useNativeDriver: true,
      friction: 6,
    }).start();
  }, [focused]);

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        opacity: focused ? 1 : 0.7,
      }}
    >
      {children}
    </Animated.View>
  );
}
