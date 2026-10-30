import {Modal, Pressable, StyleSheet, View} from "react-native";

import {AppText} from "@/components";
import {colors, typography} from "@/core/theme";

export type LanguageMenuPosition = {
  top: number;
  right: number;
};

type LanguageMenuOption<T extends string> = {
  id: T;
  label: string;
};

type LanguageMenuProps<T extends string> = {
  position: LanguageMenuPosition | null;
  options: LanguageMenuOption<T>[];
  selectedId: T;
  onSelect: (id: T) => void;
  onClose: () => void;
};

export const LANGUAGE_MENU_HEIGHT = 128;

// Figma 1640:12245: a white popover of radio rows, anchored to the
// Language row. Tapping outside it dismisses it.
export function LanguageMenu<T extends string>({
  position,
  options,
  selectedId,
  onSelect,
  onClose,
}: LanguageMenuProps<T>) {
  return (
    <Modal
      visible={position !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
      />
      {position && (
        <View
          style={[styles.menu, position]}
          accessibilityRole="radiogroup"
          accessibilityLabel="Language">
          {options.map((option, index) => {
            const isSelected = option.id === selectedId;
            return (
              <View key={option.id} style={styles.item}>
                {index > 0 && <View style={styles.divider} />}
                <Pressable
                  style={styles.option}
                  onPress={() => onSelect(option.id)}
                  accessibilityRole="radio"
                  accessibilityLabel={option.label}
                  accessibilityState={{checked: isSelected}}
                  hitSlop={11}>
                  <View style={styles.radio}>
                    <View
                      style={[styles.radioDot, !isSelected && styles.hidden]}
                    />
                  </View>
                  <AppText style={styles.label}>{option.label}</AppText>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}
    </Modal>
  );
}

const RADIO_SIZE = 20;
const RADIO_DOT_SIZE = 11.43;

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    width: 238,
    height: LANGUAGE_MENU_HEIGHT,
    justifyContent: "center",
    gap: 23,
    borderRadius: 8,
    backgroundColor: colors.languageMenuBackground,
    boxShadow: [
      {offsetX: 0, offsetY: 0, blurRadius: 4, color: colors.popoverShadow},
    ],
  },
  item: {
    gap: 23,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 16,
  },
  radio: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: 1.43,
    borderColor: colors.exploreTextMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: RADIO_DOT_SIZE,
    height: RADIO_DOT_SIZE,
    borderRadius: RADIO_DOT_SIZE / 2,
    backgroundColor: colors.accentGold,
  },
  hidden: {
    opacity: 0,
  },
  label: {
    ...typography.bodyHeading,
    width: 84,
    color: colors.applicationChipLabel,
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.languageMenuDivider,
  },
});
