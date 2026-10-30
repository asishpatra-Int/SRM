import {Pressable, StyleSheet, TextInput, View} from "react-native";

import LightSearchIcon from "@/assets/svg/explore/SearchIcon.svg";
import FilterIcon from "@/assets/svg/FilterIcon.svg";
import SearchIcon from "@/assets/svg/SearchIcon.svg";
import {colors} from "@/core/theme";

import type {PracticeTheme} from "./practiceTheme";

type PracticeSearchRowProps = {
  theme: PracticeTheme;
  value: string;
  onChangeText: (value: string) => void;
  onFilterPress: () => void;
  hasActiveFilters: boolean;
};

export function PracticeSearchRow({
  theme,
  value,
  onChangeText,
  onFilterPress,
  hasActiveFilters,
}: PracticeSearchRowProps) {
  const isLight = theme === "light";
  const textColor = isLight ? colors.pillLabelDark : colors.textOnDark;

  return (
    <View style={styles.row}>
      <View style={[styles.searchField, isLight && styles.searchFieldLight]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search Practise Tracks"
          placeholderTextColor={textColor}
          style={[styles.searchInput, {color: textColor}]}
        />
        {isLight ? (
          <LightSearchIcon width={14} height={14} color={textColor} />
        ) : (
          <SearchIcon width={14} height={14} />
        )}
      </View>
      <Pressable
        style={[styles.filterButton, isLight && styles.filterButtonLight]}
        onPress={onFilterPress}
        accessibilityRole="button"
        accessibilityLabel="Filter practice tracks"
        accessibilityState={{selected: hasActiveFilters}}>
        <FilterIcon width={17} height={17} />
        {hasActiveFilters && <View style={styles.activeFilterDot} />}
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
    height: 42,
    paddingHorizontal: 21,
    borderRadius: 999,
    backgroundColor: colors.badgeBackground,
  },
  searchFieldLight: {
    height: 40,
    borderRadius: 80,
    backgroundColor: colors.exploreSearchBackground,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  filterButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.textOnDark,
  },
  // Explore's filter button (ExploreSearchBar): white with a soft shadow.
  filterButtonLight: {
    backgroundColor: colors.exploreBackground,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  activeFilterDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accentGold,
  },
});
