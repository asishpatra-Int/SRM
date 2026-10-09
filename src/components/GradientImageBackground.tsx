import type {ReactNode} from "react";

import {StyleSheet, View, type ViewStyle} from "react-native";

import {Image, type ImageSource} from "expo-image";
import {LinearGradient, type LinearGradientProps} from "expo-linear-gradient";

type GradientImageBackgroundProps = {
  image: ImageSource | number;
  imageStyle: ViewStyle;
  gradientColors: LinearGradientProps["colors"];
  gradientLocations?: LinearGradientProps["locations"];
  children?: ReactNode;
};

export function GradientImageBackground({
  image,
  imageStyle,
  gradientColors,
  gradientLocations,
  children,
}: GradientImageBackgroundProps) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={imageStyle}>
        <Image
          source={image}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
        <LinearGradient
          colors={gradientColors}
          locations={gradientLocations}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={StyleSheet.absoluteFill}
        />
      </View>
      {children}
    </View>
  );
}
