import { View, Text, StyleSheet } from "react-native";
import { UtensilsCrossed, Clock3 } from "lucide-react-native";
import { COLORS } from "../constants/colors";

interface Props {
  meal: "Lunch" | "Dinner";
//   type: "EMPTY" | "CLOSED";
}

export default function NoMenuAvailable({
  meal,
//   type,
}: Props) {
//   const closed = type === "CLOSED";

  return (
    <View style={styles.container}>
      {/* {closed ? (
        <Clock3
          size={42}
          color={COLORS.primary}
        />
      ) : (
        <UtensilsCrossed
          size={42}
          color={COLORS.primary}
        />
      )} */}
      <UtensilsCrossed
        size={42}
        color={COLORS.primary}/>

      <Text style={styles.title}>
        {/* {closed
          ? `${meal} Booking Closed`
          : `No ${meal} Menu`} */}
          No {meal} Menu Available
      </Text>

      <Text style={styles.subtitle}>
        {/* {closed
          ? "Booking for today is closed."
          : `No ${meal.toLowerCase()} menu has been added today.`} */}
          No {meal.toLowerCase()} menu has been added today or booking is closed.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  title: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
  },
});