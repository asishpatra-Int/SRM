import {StyleSheet, TextInput, View} from "react-native";

import SearchIcon from "@/assets/svg/SearchIcon.svg";
import {colors} from "@/core/theme";

type SavedTracksSearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
};

// Same search pill as PracticeSearchRow's searchField, minus the filter
// button — the Bookmarks/Downloads frames show just the search bar.
export function SavedTracksSearchField({
  value,
  onChangeText,
}: SavedTracksSearchFieldProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
  searchField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
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
});
