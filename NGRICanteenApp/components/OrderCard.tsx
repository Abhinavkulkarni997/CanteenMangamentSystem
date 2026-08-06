import{
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from "react-native";
import Card from "./Card";
import StatusBadge from "./StatusBadge";
import {Order} from "../types/order";
import {COLORS} from "../constants/colors";

interface Props{
    order: Order;
    onPress:()=>void;
}

export default function OrderCard({
    order,
    onPress,
}:Props){
    return(
        <TouchableOpacity activeOpacity={0.05} onPress={onPress}>
            <Card> 
                <View style={styles.header}>
                    <View style={{flex:1}}>
                        <Text style={styles.orderNumber}>
                            {order.orderNumber}
                        </Text>
                        <Text style={styles.date}>
                            {new Date(
                                order.createdAt
                            ).toLocaleString()}
                        </Text>
                    </View>
                    <StatusBadge status={order.orderStatus as any}/>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.amount}>
                         ₹ {order.totalAmount}
                    </Text>

                    <Text style={styles.items}>
                        {order.items.length} Item
                        {order.items.length > 1 ? "s":""}
                    </Text>

                </View>
            </Card>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    header: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },
 orderNumber: {

    fontWeight: "700",

    fontSize: 18,

    color: COLORS.black,

  },

  date: {

    marginTop: 6,

    color: "#777",

  },

  footer: {

    marginTop: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },
  amount:{
    fontWeight:"700",
    fontSize: 22,
    color:COLORS.primary,
  },
  items:{
    color:"#777",
  },
});