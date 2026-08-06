import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { COLORS } from "../constants/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export default function Button({
  title,
  onPress,
  loading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});