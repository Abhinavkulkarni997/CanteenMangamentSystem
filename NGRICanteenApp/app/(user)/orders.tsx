import React, {
  useCallback,
  useEffect,
  useState,
  
} from "react";

import {
 
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router ,useFocusEffect} from "expo-router";

import * as orderService from "../../services/order";

import { Order } from "../../types/order";

import OrderCard from "../../components/OrderCard";

import { COLORS } from "../../constants/colors";

export default function Orders() {

  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {

    loadOrders();

  }, []));

  const loadOrders = async () => {

    try {

      const response =
        await orderService.getMyOrders();

      setOrders(response.data.data);

    } finally {

      setLoading(false);

      setRefreshing(false);

    }

  };

  const onRefresh = useCallback(() => {

    setRefreshing(true);

    loadOrders();

  }, []);

  if (loading) {

    return (

      <View style={styles.center}>

        <ActivityIndicator size="large" />

      </View>

    );

  }

  if (orders.length === 0) {

    return (

      <View style={styles.center}>

        <Text style={styles.emptyTitle}>

          No Orders Yet

        </Text>

        <Text style={styles.emptySubtitle}>

          Book your first meal.

        </Text>

      </View>

    );

  }

  return (

    <SafeAreaView style={styles.container}>

      <FlatList

        data={orders}

        keyExtractor={(item) =>
          item.id.toString()
        }

        contentContainerStyle={{

          padding: 20,

        }}

        refreshControl={

          <RefreshControl

            refreshing={refreshing}

            onRefresh={onRefresh}

          />

        }

        renderItem={({ item }) => (

          <OrderCard

            order={item}

            onPress={() =>

              // router.push({

              //   pathname:
              //     "/(user)/order-details",

              //   params: {

              //     id: item.id,

              //   },

              // })
              router.push(`/(user)/orders/${item.id}`)

            }

          />

        )}

      />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: COLORS.background,

  },

  center: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

  },

  emptyTitle: {

    fontSize: 24,

    fontWeight: "700",

    color: COLORS.black,

  },

  emptySubtitle: {

    marginTop: 10,

    color: "#777",

  },

});