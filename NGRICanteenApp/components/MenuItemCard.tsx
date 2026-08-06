import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MenuItem } from "../types/menu";
import { COLORS } from "../constants/colors";

type Props = {
  item: MenuItem;
  selected: boolean;
  onPress: () => void;
};

export default function MenuItemCard({
  item,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[
        styles.card,
        selected && styles.selectedCard,
      ]}
      onPress={onPress}
    >
      <View style={styles.leftContainer}>
        <View
          style={[
            styles.checkbox,
            selected && styles.checkboxSelected,
          ]}
        >
          {selected && (
            <MaterialCommunityIcons
              name="check"
              size={16}
              color="#fff"
            />
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {item.itemName}
          </Text>

          {item.description ? (
            <Text style={styles.description}>
              {item.description}
            </Text>
          ) : null}
        </View>
      </View>

      <Text style={styles.price}>
        ₹{item.price}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E6E6E6",
  },

  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: "#FFF8F4",
  },

  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#BDBDBD",

    justifyContent: "center",
    alignItems: "center",
  },

  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  content: {
    marginLeft: 14,
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.black,
  },

  description: {
    marginTop: 4,
    color: "#777",
    fontSize: 13,
  },

  price: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primary,
  },
});