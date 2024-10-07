import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HomeCover } from "./HomeCover";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const Home = () => {
  const [hasVisited, setHasVisited] = useState<boolean>();
  useEffect(() => {
    AsyncStorage.getItem("hasVisited").then((value) => {
      console.log({ value });
      setHasVisited(value === "true");
    });
  }, []);

  if (hasVisited === undefined) return;

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {!hasVisited && <HomeCover />}
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
