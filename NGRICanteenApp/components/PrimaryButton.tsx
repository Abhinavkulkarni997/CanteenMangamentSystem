import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon = true,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.button,
        disabled && styles.disabled,
      ]}
      disabled={disabled || loading}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>{title}</Text>

          {icon && (
            <MaterialCommunityIcons
              name="arrow-right"
              size={22}
              color={COLORS.white}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    paddingHorizontal: 18,
    elevation: 3,
  },

  disabled: {
    opacity: 0.6,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },
});