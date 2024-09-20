import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HomeCover } from "./HomeCover";

export const Home = () => {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <HomeCover />
        <SafeAreaView style={styles.innerContainer}>
          <Text style={styles.text}>Sarah Markless</Text>
          <Text>Blah blach blach blahsufhsud saaio ushfli</Text>
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
