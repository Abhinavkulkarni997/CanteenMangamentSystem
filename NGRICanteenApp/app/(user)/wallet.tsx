import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import LoadingView from "../../components/LoadingView";
import SectionTitle from "../../components/SectionTitle";
import WalletTransactionItem from "../../components/WalletTransactionItem";
import ScreenHeader from "../../components/ScreenHeader";
import {
  getMyWallet,
  getMyWalletTransactions,
} from "../../services/wallet.service";

import {
  Wallet,
  WalletTransaction,
} from "../../types/wallet.types";

import { COLORS } from "../../constants/colors";
import { useFocusEffect} from "expo-router";
export default function WalletScreen() {
  const [wallet, setWallet] =
    useState<Wallet | null>(null);

  const [transactions, setTransactions] =
    useState<WalletTransaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const loadData = useCallback(async () => {
    try {
      const [walletResponse, transactionResponse] =
        await Promise.all([
          getMyWallet(),
          getMyWalletTransactions(),
        ]);

      setWallet(walletResponse.data.data);

      setTransactions(
        transactionResponse.data.data.transactions
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
    loadData();
  }, []));

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return <LoadingView/>;
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WalletTransactionItem
            transaction={item}
          />
        )}
        
        ListHeaderComponent={
          <>
            <Card>
                  <ScreenHeader name="Wallet"/>
                
              <Text style={styles.balanceLabel}>
                Wallet Balance
              </Text>

              <Text style={styles.balance}>
                ₹
                {Number(
                  wallet?.balance ?? 0
                ).toFixed(2)}
              </Text>
            </Card>

            <SectionTitle
              title="Recent Transactions"
            />
          </>
        }
        ListEmptyComponent={
          <EmptyState
            icon="wallet-outline"
            title="No Transactions"
            subtitle="Your wallet transactions will appear here."
          />
        }
        ItemSeparatorComponent={() => (
          <Text style={styles.separator} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={
          styles.content
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  balanceLabel: {
    fontSize: 15,
    color: "#666",
  },

  balance: {
    marginTop: 10,
    fontSize: 34,
    fontWeight: "700",
    color: COLORS.primary,
  },

  separator: {
    height: 1,
    backgroundColor: COLORS.border,
  },
});