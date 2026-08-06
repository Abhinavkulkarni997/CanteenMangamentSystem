import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";

interface EmptyStateProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle: string;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={70}
        color="#BBB"
      />

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    alignItems: "center",
  },

  title: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    color: "#777",
    paddingHorizontal: 20,
  },
});