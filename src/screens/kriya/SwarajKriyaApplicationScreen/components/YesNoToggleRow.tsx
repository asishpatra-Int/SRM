import {Pressable, StyleSheet, Text, View} from "react-native";

import {colors, spacing, typography} from "@/core/theme";

type YesNoToggleRowProps = {
  question: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

// Figma 1580:2150: question on the left, "Yes" + a 42×24 purple switch on
// the right. Off shows "No" on a muted track.
export function YesNoToggleRow({
  question,
  value,
  onValueChange,
}: YesNoToggleRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.question}>{question}</Text>
      <Pressable
        style={styles.control}
        onPress={() => onValueChange(!value)}
        accessibilityRole="switch"
        accessibilityState={{checked: value}}
        accessibilityLabel={question}
        hitSlop={8}>
        <Text style={styles.answer}>{value ? "Yes" : "No"}</Text>
        <View style={[styles.track, value && styles.trackOn]}>
          <View style={styles.thumb} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxl,
  },
  question: {
    ...typography.bodyHeading,
    flex: 1,
    color: colors.pillLabelDark,
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  answer: {
    ...typography.inputText,
    color: colors.borderPurple,
    textAlign: "right",
  },
  track: {
    width: 42.353,
    height: 24,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 2.824,
    paddingVertical: 1.412,
    borderRadius: 32.471,
    backgroundColor: colors.toggleTrackOff,
  },
  trackOn: {
    alignItems: "flex-end",
    backgroundColor: colors.borderPurple,
  },
  thumb: {
    width: 18.353,
    height: 18.353,
    borderRadius: 10.588,
    backgroundColor: colors.textOnDark,
  },
});
