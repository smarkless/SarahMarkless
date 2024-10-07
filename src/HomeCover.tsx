import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useCallback, useState } from "react";

const { height, width } = Dimensions.get("window");
const initialBackgroundHeight = height / 2;
const initialCircleHeight = width * 0.7;

const storeData = async () => {
  try {
    await AsyncStorage.setItem("hasVisited", "true");
    console.log("Data stored successfully!");
  } catch (e) {
    console.error("Failed to store data", e);
  }
};

export const HomeCover = () => {
  const [heading, setHeading] = useState("Welcome");
  const [subHeading, setSubHeading] = useState("Tap or hold to enter");

  const animatedBackgroundHeight = useSharedValue(initialBackgroundHeight);
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
        runOnJS(storeData)();
      }),
    []
  );
  const onHold = useCallback(
    () =>
      Gesture.LongPress()
        .onStart(() => {
          animatedBackgroundHeight.value = withTiming(0, {
            duration: 1500,
          });
          animatedViewSize.value = withTiming(0, {
            duration: 1500,
          });
        })
        .onEnd(() => {
          if (animatedBackgroundHeight.value > initialBackgroundHeight / 2) {
            animatedBackgroundHeight.value = withSpring(
              initialBackgroundHeight,
              {
                duration: 1000,
              }
            );
            animatedViewSize.value = withSpring(initialCircleHeight, {
              duration: 1000,
            });
            runOnJS(setHeading)("Gotcha!");
            runOnJS(setSubHeading)("Hold longer or tap to enter");
          } else {
            runOnJS(storeData)();
          }
        }),
    []
  );
  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
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
