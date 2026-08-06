import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useLocalSearchParams ,router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

import QRCode from "react-native-qrcode-svg";

import Card from "../../components/Card";
import PrimaryButton from "../../components/PrimaryButton";

import { COLORS } from "../../constants/colors";

export default function QRScreen() {

  const { order } = useLocalSearchParams();

  const data = JSON.parse(order as string);

  return (

    <SafeAreaView style={styles.container}>

      <Card>

        <Text style={styles.success}>
           Order Successful
        </Text>

        <Text style={styles.order}>
          {data.orderNumber}
        </Text>

        <Text style={styles.amount}>
          ₹ {data.totalAmount}
        </Text>

      </Card>

      <View style={styles.qrContainer}>

        <QRCode
          value={data.qrToken}
          size={220}
        />

      </View>

      <Text style={styles.note}>

        Show this QR code at the canteen counter to collect your meal.

      </Text>

      <PrimaryButton
        title="View My Orders"
        onPress={() => router.replace("/(user)/orders")}
      />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 20,

    backgroundColor: COLORS.background,

    justifyContent: "space-between",

  },

  success: {

    fontSize: 24,

    fontWeight: "700",

    color: COLORS.success,

    textAlign: "center",

  },

  order: {

    marginTop: 10,

    textAlign: "center",

    fontSize: 18,

    fontWeight: "600",

  },

  amount: {

    marginTop: 8,

    textAlign: "center",

    fontSize: 22,

    color: COLORS.primary,

    fontWeight: "700",

  },

  qrContainer: {

    alignItems: "center",

  },

  note: {

    textAlign: "center",

    fontSize: 16,

    color: "#666",

    marginVertical: 20,

  },

});