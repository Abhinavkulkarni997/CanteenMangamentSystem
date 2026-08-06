import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Card from "./Card";

import { MenuItem } from "../types/menu";

import { COLORS } from "../constants/colors";
import { getMenuIcon } from "../utils/menuIcon";


interface Props {
  item: MenuItem;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function MenuCard({
  item,
  quantity,
  onIncrease,
  onDecrease,
}: Props) {

  return (

    <Card>

      <View style={styles.topRow}>
         <MaterialCommunityIcons
          name={getMenuIcon(item.itemName)}
          size={26}
          color={COLORS.primary}
        />

        <View style={styles.info}>

          <Text style={styles.title}>
            {item.itemName}
          </Text>

          {!!item.description && (

            <Text style={styles.description}>
              {item.description}
            </Text>

          )}

          <Text style={styles.price}>
            ₹ {item.price}
          </Text>

        </View>

       

      </View>

      <View style={styles.bottomRow}>

        <TouchableOpacity
          style={styles.button}
          onPress={onDecrease}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>
          {quantity}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onIncrease}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

  topRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },

  info: {

    flex: 1,

  },

  title: {

    fontSize: 18,

    fontWeight: "700",

    color: COLORS.black,

  },

  description: {

    marginTop: 4,

    color: "#777",

  },

  price: {

    marginTop: 8,

    color: COLORS.primary,

    fontWeight: "700",

    fontSize: 18,

  },

  bottomRow: {

    marginTop: 20,

    flexDirection: "row",

    justifyContent: "flex-end",

    alignItems: "center",

  },

  button: {

    width: 36,

    height: 36,

    borderRadius: 18,

    backgroundColor: COLORS.primary,

    justifyContent: "center",

    alignItems: "center",

  },

  buttonText: {

    color: COLORS.white,

    fontSize: 22,
    justifyContent:"center",
    alignContent: "center",

    fontWeight: "700",

  },

  quantity: {

    width: 40,

    textAlign: "center",

    fontSize: 18,

    fontWeight: "700",

  },

});