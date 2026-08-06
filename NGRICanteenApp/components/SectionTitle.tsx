import { Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  return (
    <Text style={styles.title}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 12,
  },
});