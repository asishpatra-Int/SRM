import {Pressable, StyleSheet, TextInput, View} from "react-native";

import FilterIcon from "@/assets/svg/FilterIcon.svg";
import SearchIcon from "@/assets/svg/SearchIcon.svg";
import {colors} from "@/core/theme";

type PracticeSearchRowProps = {
  value: string;
  onChangeText: (value: string) => void;
  onFilterPress: () => void;
  hasActiveFilters: boolean;
};

export function PracticeSearchRow({
  value,
  onChangeText,
  onFilterPress,
  hasActiveFilters,
}: PracticeSearchRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.searchField}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search Practise Tracks"
          placeholderTextColor={colors.textOnDark}
          style={styles.searchInput}
        />
        <SearchIcon width={14} height={14} />
      </View>
      <Pressable
        style={styles.filterButton}
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textOnDark,
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
