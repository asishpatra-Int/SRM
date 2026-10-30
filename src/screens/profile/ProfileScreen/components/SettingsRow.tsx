import type {ComponentType, Ref} from "react";

import {Pressable, StyleSheet, View, type ViewInstance} from "react-native";

import SettingsChevronIcon from "@/assets/svg/profile/SettingsChevronIcon.svg";
import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

import type {SvgProps} from "react-native-svg";

type SettingsRowProps = {
  Icon: ComponentType<SvgProps>;
  label: string;
  value?: string;
  hasDivider?: boolean;
  // Rows without a destination yet render without press handling.
  onPress?: () => void;
  ref?: Ref<ViewInstance>;
};

// Figma "Settings row" (1671:1744): 20pt icon, label, optional current
// value, chevron; an inset divider under every row but a card's last.
export function SettingsRow({
  Icon,
  label,
  value,
  hasDivider = false,
  onPress,
  ref,
}: SettingsRowProps) {
  return (
    <View ref={ref} collapsable={false}>
      <Pressable
        style={styles.row}
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole={onPress ? "button" : undefined}
        accessibilityLabel={value ? `${label}, ${value}` : label}>
        <Icon width={20} height={20} />
        <AppText style={styles.label} numberOfLines={1}>
          {label}
        </AppText>
        {value !== undefined && <AppText style={styles.value}>{value}</AppText>}
        <SettingsChevronIcon width={14} height={14} />
      </Pressable>
      {hasDivider && (
        <View style={styles.dividerInset}>
          <View style={styles.divider} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
  },
  label: {
    ...typography.bodyHeading,
    flex: 1,
    color: colors.pillLabelDark,
  },
  value: {
    ...typography.detailBody,
    color: colors.exploreTextMuted,
  },
  dividerInset: {
    paddingLeft: 44,
    paddingRight: 14,
  },
  divider: {
    height: 1,
    backgroundColor: colors.profileSettingsDivider,
  },
});
