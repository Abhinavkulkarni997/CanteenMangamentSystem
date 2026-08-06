import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import getGreeting from "../utils/gretting";

interface Props {
  name: string;
  designation: string;
}

export default function Header({
  name,
  designation,
}: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.greeting}>
       {getGreeting()}
      </Text>

      <Text style={styles.name}>
        {name}
      </Text>

      <Text style={styles.designation}>
        {designation}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    marginBottom: 20,

  },

  greeting: {

    fontSize: 18,

    color: "#666",

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