import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";

interface Props {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  onPress: () => void;
}

export default function ProfileOption({
  icon,
  title,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.left}>
        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={COLORS.primary}
        />

        <Text style={styles.title}>
          {title}
        </Text>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color="#888"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "600",
  },
});