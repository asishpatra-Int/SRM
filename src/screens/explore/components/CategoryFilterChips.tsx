import type {ComponentType} from "react";

import {Pressable, ScrollView, StyleSheet, Text} from "react-native";

import CalendarIcon from "@/assets/svg/explore/CalendarIcon.svg";
import FileTextIcon from "@/assets/svg/explore/FileTextIcon.svg";
import GridIcon from "@/assets/svg/explore/GridIcon.svg";
import HeartIcon from "@/assets/svg/explore/HeartIcon.svg";
import VideoIcon from "@/assets/svg/explore/VideoIcon.svg";
import {colors, radii, spacing, typography} from "@/core/theme";

import type {ExploreCategoryId} from "../mockData";
import type {SvgProps} from "react-native-svg";

const CATEGORIES: {
  id: ExploreCategoryId;
  label: string;
  Icon: ComponentType<SvgProps>;
}[] = [
  {id: "all", label: "All", Icon: GridIcon},
  {id: "videos", label: "Videos", Icon: VideoIcon},
  {id: "bhakti", label: "Bhakti", Icon: HeartIcon},
  {id: "events", label: "Events", Icon: CalendarIcon},
  {id: "blogs", label: "Blogs", Icon: FileTextIcon},
];

type CategoryFilterChipsProps = {
  selectedId: ExploreCategoryId;
  onSelect: (id: ExploreCategoryId) => void;
};

export function CategoryFilterChips({
  selectedId,
  onSelect,
}: CategoryFilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {CATEGORIES.map(({id, label, Icon}) => {
        const isSelected = id === selectedId;
        const tintColor = isSelected ? colors.textOnDark : colors.borderPurple;
        return (
          <Pressable
            key={id}
            onPress={() => onSelect(id)}
            accessibilityRole="button"
            accessibilityState={{selected: isSelected}}
            style={[styles.chip, isSelected && styles.chipSelected]}>
            <Icon width={16} height={16} color={tintColor} />
            <Text style={[styles.label, {color: tintColor}]}>{label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // The strip spans the full screen width; the inset lives inside the scroll
  // content so chips scroll edge to edge instead of clipping at the padding.
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingLeft: spacing.xxl,
    paddingRight: spacing.xl,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    height: 38,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radii.chip,
    backgroundColor: colors.exploreChipInactiveBackground,
  },
  chipSelected: {
    backgroundColor: colors.borderPurple,
  },
  label: {
    ...typography.filterChipLabel,
    textTransform: "capitalize",
  },
});
