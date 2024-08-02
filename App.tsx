import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { useCallback } from "react";

const { height, width } = Dimensions.get("window");
const initialHeight = height / 2;

export default function App() {
  // const onTap = useCallback(() => Gesture.Tap(), []);
  const onHold = useCallback(() => Gesture.LongPress(), []);

  const animatedBackgroundHeight = useSharedValue(initialHeight);
  const onTap = useCallback(() => {
    animatedBackgroundHeight.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, []);
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Animated.View
          style={[styles.topHalf, { height: animatedBackgroundHeight }]}
        />
        <Animated.View
          style={[styles.bottomHalf, { height: animatedBackgroundHeight }]}
        />
        {/* <GestureDetector gesture={Gesture.Exclusive(onTap(), onHold())}> */}
        <Animated.View style={[styles.circle]} onTouchStart={onTap}>
          <Text>Welcome</Text>
        </Animated.View>
        {/* </GestureDetector> */}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topHalf: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
  },
  bottomHalf: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "deeppink",
  },
  circle: {
    height: width * 0.7,
    width: width * 0.7,
    backgroundColor: "orange",
    borderRadius: width * 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
});
