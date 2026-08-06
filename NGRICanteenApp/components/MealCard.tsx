import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";

type Props = {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

export default function MealCard({
  title,
  subtitle,
  icon,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.left}>
        <MaterialCommunityIcons
          name={icon}
          size={34}
          color={COLORS.primary}
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={28}
        color="#999"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  textContainer: {
    marginLeft: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.black,
  },

  subtitle: {
    marginTop: 4,
    color: "#666",
  },
});