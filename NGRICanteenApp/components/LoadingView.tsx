import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../constants/colors";

interface LoadingViewProps {
  message?: string;
}

export default function LoadingView({
  message = "Loading...",
}: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
      />

      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  text: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.primary,
  },
});