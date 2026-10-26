import {useEffect, useRef, useState} from "react";

import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import {Image} from "expo-image";

import {colors} from "@/core/theme";

const AUTO_SCROLL_INTERVAL_MS = 4000;

type FeaturedCarouselProps = {
  items: {id: string; image: number}[];
};

export function FeaturedCarousel({items}: FeaturedCarouselProps) {
  const {width: screenWidth} = useWindowDimensions();
  const cardWidth = screenWidth - 48;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }
    const timer = setInterval(() => {
      if (isDragging.current) {
        return;
      }
      setActiveIndex(current => {
        const next = (current + 1) % items.length;
        scrollViewRef.current?.scrollTo({x: next * cardWidth, animated: true});
        return next;
      });
    }, AUTO_SCROLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [items.length, cardWidth]);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setActiveIndex(index);
    isDragging.current = false;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={() => {
          isDragging.current = true;
        }}
        onMomentumScrollEnd={onScrollEnd}
        snapToInterval={cardWidth}
        decelerationRate="fast">
        {items.map(item => (
          <Image
            key={item.id}
            source={item.image}
            style={[styles.card, {width: cardWidth}]}
            contentFit="cover"
          />
        ))}
      </ScrollView>
      {items.length > 1 && (
        <View style={styles.dots}>
          {items.map((item, index) => (
            <View
              key={item.id}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: "center",
  },
  card: {
    height: 138,
    borderRadius: 8,
  },
  dots: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.exploreBackground,
  },
  dotActive: {
    backgroundColor: colors.borderPurple,
  },
});
