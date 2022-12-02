import React, {useMemo, useState} from "react";
import {ImageBackground, View, Text, StyleSheet} from "react-native";
import {Block as BlockVM} from "../services/models/block";

const Block: React.FC<{block: BlockVM; containerStyle?: Object}> = ({
  block,
  containerStyle,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [showProgress, setShowProgress] = useState<boolean>(false);

  const styles = useMemo(
    () => getStyles(showProgress, progress),
    [showProgress, progress],
  );

  return (
    <View style={containerStyle}>
      <ImageBackground
        onLoadStart={() => setShowProgress(true)}
        onLoadEnd={() => setShowProgress(false)}
        onError={() => setShowProgress(false)}
        onProgress={({nativeEvent: {loaded, total}}) =>
          setProgress(Math.round((loaded / total) * 100))
        }
        style={styles.imageContainer}
        imageStyle={styles.image}
        source={block.imageUrl ? {uri: block.imageUrl} : 0}
      >
        {showProgress && (
          <View style={styles.progressContainer}>
            <View style={styles.progressFilled} />
          </View>
        )}
      </ImageBackground>

      <Text style={styles.blockTitle} numberOfLines={1}>
        {block.title}
      </Text>
    </View>
  );
};

const getStyles = (showProgress: boolean, progress: number) =>
  StyleSheet.create({
    imageContainer: {
      backgroundColor: "#0F0F0F",
      flex: 1,
      alignItems: "center",
      borderRadius: 6,
      justifyContent: showProgress ? "center" : "flex-end",
    },
    image: {
      flex: 1,
      borderRadius: 6,
    },
    progressContainer: {
      borderWidth: StyleSheet.hairlineWidth,
      height: 4,
      borderColor: "#FAFAFA",
      width: "50%",
      borderRadius: 2,
      zIndex: -1,
    },
    progressFilled: {
      height: 4,
      width: `${progress}%`,
      borderRadius: 2,
      backgroundColor: "#00FF00",
    },
    blockTitle: {
      textAlignVertical: "bottom",
      lineHeight: 16,
      color: "#FAFAFA",
      textAlign: "center",
      fontSize: 8,
      letterSpacing: 0.75,
      textAlignVertical: "center",
    },
  });

export default React.memo(Block);
