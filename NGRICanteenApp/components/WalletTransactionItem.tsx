import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import { WalletTransaction } from "../types/wallet.types";
import { formatDate } from "../utils/formatDate";

interface WalletTransactionItemProps {
  transaction: WalletTransaction;
}

export default function WalletTransactionItem({
  transaction,
}: WalletTransactionItemProps) {
  const isCredit = transaction.type === "CREDIT";

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <MaterialCommunityIcons
          name={
            isCredit
              ? "arrow-down-circle"
              : "arrow-up-circle"
          }
          size={32}
          color={
            isCredit
              ? "#2E7D32"
              : "#D32F2F"
          }
        />

        <View style={styles.info}>
          <Text style={styles.remarks}>
            {transaction.remarks || "Wallet Transaction"}
          </Text>

          <Text style={styles.date}>
  {formatDate(transaction.createdAt)}
</Text>

          {transaction.order && (
            <Text style={styles.order}>
              {transaction.order.orderNumber}
            </Text>
          )}
        </View>
      </View>

      <Text
        style={[
          styles.amount,
          {
            color: isCredit
              ? "#2E7D32"
              : "#D32F2F",
          },
        ]}
      >
        {isCredit ? "+" : "-"}₹
        {Number(transaction.amount).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },

  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  info: {
    marginLeft: 14,
    flex: 1,
  },

  remarks: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
  },

  date: {
    marginTop: 3,
    color: "#777",
    fontSize: 13,
  },

  order: {
    marginTop: 2,
    color: COLORS.primary,
    fontSize: 12,
  },

  amount: {
    fontSize: 17,
    fontWeight: "700",
  },
});