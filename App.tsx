import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { useCallback, useState } from "react";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { Home } from "./src/Home";

const { height, width } = Dimensions.get("window");
const initialbackgroundHeight = height / 2;
const initialCircleHeight = width * 0.7;

export default function App() {
  const [heading, setHeading] = useState("Welcome");
  const [subHeading, setSubHeading] = useState("Tap or hold to enter");

  const animatedBackgroundHeight = useSharedValue(initialbackgroundHeight);
  const animatedViewSize = useSharedValue(initialCircleHeight);
  const onTap = useCallback(
    () =>
      Gesture.Tap().onStart(() => {
        animatedBackgroundHeight.value = withTiming(0, {
          duration: 1000,
          easing: Easing.in(Easing.quad),
        });
        animatedViewSize.value = withTiming(0, {
          duration: 1000,
        });
      }),
    []
  );
  const onHold = useCallback(
    () =>
      Gesture.LongPress()
        .onStart((event) => {
          animatedBackgroundHeight.value = withTiming(0, {
            duration: 1500,
          });
          animatedViewSize.value = withTiming(0, {
            duration: 1500,
          });
        })
        .onEnd((event) => {
          if (animatedBackgroundHeight.value > initialbackgroundHeight / 2) {
            animatedBackgroundHeight.value = withSpring(
              initialbackgroundHeight,
              {
                duration: 1000,
              }
            );
            animatedViewSize.value = withSpring(initialCircleHeight, {
              duration: 1000,
            });
            runOnJS(setHeading)("Gotcha!");
            runOnJS(setSubHeading)("Hold longer or tap to enter");
          }
        }),
    []
  );
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Animated.View
          style={[styles.topHalf, { height: animatedBackgroundHeight }]}
        />
        <Animated.View
          style={[styles.bottomHalf, { height: animatedBackgroundHeight }]}
        />
        <GestureDetector gesture={Gesture.Exclusive(onHold(), onTap())}>
          <Animated.View
            style={[
              styles.circle,
              {
                width: animatedViewSize,
                height: animatedViewSize,
                borderRadius: animatedViewSize,
              },
            ]}
            onTouchStart={onTap}
          >
            <Text>{heading}</Text>
            <Text>{subHeading}</Text>
          </Animated.View>
        </GestureDetector>
        <Home />
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
    position: "absolute",
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
});
