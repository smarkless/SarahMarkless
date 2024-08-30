import { StyleSheet, Text, SafeAreaView } from "react-native";

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Sarah Markless</Text>
      <Text>Blah blach blach blahsufhsud saaio ushfli</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    margin: 20,
  },
  text: {
    fontSize: 40,
    textAlign: "left",
  },
});
