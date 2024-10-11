import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NumberRoll from "./NumberRoll";
import RollingNumberTicker from "./NumberRoll";

export const Piggybank = () => {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <SafeAreaView style={styles.innerContainer}>
          <Text style={styles.text}>Piggybank here</Text>
          <NumberRoll />
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    margin: 20,
  },
  text: {
    fontSize: 40,
    textAlign: "left",
  },
});
