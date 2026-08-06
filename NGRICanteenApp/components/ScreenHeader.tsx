import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface Props {
  name: string;
}

export default function ScreenHeader({ name }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  name: {
    fontSize: 30,

    fontWeight: "bold",

    color: COLORS.primary,

    marginTop: 4,
  },

  designation: {
    marginTop: 4,

    color: "#777",

    fontSize: 15,
  },
});
