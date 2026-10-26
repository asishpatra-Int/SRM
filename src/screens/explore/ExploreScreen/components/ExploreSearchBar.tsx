import {Pressable, StyleSheet, TextInput, View} from "react-native";

import SearchIcon from "@/assets/svg/explore/SearchIcon.svg";
import SlidersIcon from "@/assets/svg/explore/SlidersIcon.svg";
import {colors} from "@/core/theme";

type ExploreSearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  onFilterPress?: () => void;
};

export function ExploreSearchBar({
  value,
  onChangeText,
  onFilterPress,
}: ExploreSearchBarProps) {
  return (
    <View style={styles.row}>
      <View style={styles.searchField}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Explore Videos, Bhakti, Events, Blogs"
          placeholderTextColor={colors.pillLabelDark}
          style={styles.searchInput}
        />
        <SearchIcon width={14} height={14} color={colors.pillLabelDark} />
      </View>
      <Pressable
        style={styles.filterButton}
        onPress={onFilterPress}
        accessibilityRole="button"
        accessibilityLabel="Additional filters">
        <SlidersIcon width={17} height={17} color={colors.pillLabelDark} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    height: 40,
    paddingHorizontal: 21,
    borderRadius: 80,
    backgroundColor: colors.exploreSearchBackground,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.pillLabelDark,
    padding: 0,
  },
  filterButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.exploreBackground,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
});
