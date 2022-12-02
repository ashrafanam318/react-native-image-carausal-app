import React, {useEffect, useMemo, useState} from "react";
import {SafeAreaView, StyleSheet, Text} from "react-native";
import Carousel from "./components/Carousel";
import {getCarouselData} from "./services/dataService";
import {Block} from "./services/models/block";

const App: React.FC = () => {
  const [data, setData] = useState<Block[]>([]);

  useEffect(() => {
    setData(getCarouselData());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Carousel App</Text>
      <Carousel data={data} containerStyle={styles.carouselContainer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    alignItems: "center",
  },
  headerText: {
    marginTop: 30,
    fontSize: 24,
    color: "#FFF",
    letterSpacing: 1.25,
    textAlign: "center",
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 8,
  },
  carouselContainer: {
    marginTop: 50,
    width: "100%",
    backgroundColor: "#000",
  },
});

export default App;
