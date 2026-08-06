import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

interface WalletCardProps{
    balance:number;
    loading:boolean;
    onPress:()=>void;
}

export default function WalletCard({
  balance,
  loading,
  onPress,
}: WalletCardProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <View>
        <Text style={styles.label}>
          Wallet Balance
        </Text>

       <Text style={styles.balance}>
    {
        loading
        ? "Loading..."
        : `₹${balance.toFixed(2)}`
    }
</Text>

<Text style={styles.link}>
    View Transactions
</Text>
      </View>

      <MaterialCommunityIcons
        name="wallet-outline"
        size={32}
        color={COLORS.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: "#666",
  },

  balance: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.black,
  },
  link:{
    color: COLORS.primary,
    
  }
});