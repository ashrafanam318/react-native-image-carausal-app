import React, {useRef, useState} from "react";
import Block from "./Block";
import {Block as BlockVM} from "../services/models/block";
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

const Carousel: React.FC<{
  data: BlockVM[];
  containerStyle?: Object;
}> = ({data, containerStyle}) => {
  const [firstIndexOnDisplay, setFirstIndexOnDisplay] = useState(0);
  const carousel = useRef<FlatList>(null);
  const remainder = data.length % 4;
  const disablePrev = firstIndexOnDisplay === 0;
  const disableNext = firstIndexOnDisplay + remainder >= data.length;

  const next = () => {
    let newFirst = firstIndexOnDisplay + 4;
    if (newFirst >= data.length) {
      newFirst = firstIndexOnDisplay + remainder;
    }
    carousel.current?.scrollToIndex({index: newFirst});
    setFirstIndexOnDisplay(newFirst);
  };

  const previous = () => {
    const newFirst = firstIndexOnDisplay - 4;
    carousel.current?.scrollToIndex({index: newFirst});
    setFirstIndexOnDisplay(newFirst);
  };

  return (
    <>
      <View style={containerStyle}>
        <FlatList
          ref={carousel}
          horizontal={true}
          data={data}
          ListEmptyComponent={
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyText}>
                Sorry, no blocks available for display!
              </Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          getItemLayout={(_, index) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
          renderItem={({item}) => (
            <Block block={item} containerStyle={styles.block} />
          )}
        />
      </View>
      {data.length > 4 && (
        <View style={styles.buttonGroupContainer}>
          <TouchableWithoutFeedback onPress={previous} disabled={disablePrev}>
            <View style={styles.button}>
              <Text style={[styles.buttonText, disablePrev && styles.disabled]}>
                Previous
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.devider} />
          <TouchableWithoutFeedback onPress={next} disabled={disableNext}>
            <View style={styles.button}>
              <Text style={[styles.buttonText, disableNext && styles.disabled]}>
                Next
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </>
  );
};

const {width: DEVICE_WIDTH} = Dimensions.get("window");
const ITEM_WIDTH = DEVICE_WIDTH / 4;
const ITEM_HEIGHT = 200;

const styles = StyleSheet.create({
  block: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
    paddingHorizontal: 6,
    paddingTop: 8,
  },
  buttonGroupContainer: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    borderColor: "#FAFAFA",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  button: {
    height: 30,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  disabled: {opacity: 0.5},
  devider: {
    height: 30,
    width: StyleSheet.hairlineWidth,
    backgroundColor: "#FAFAFA",
  },
  emptyTextContainer: {
    height: ITEM_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

export default Carousel;
