import {
  
    FlatList,
    View,
    Text,
    StyleSheet,
    Alert,
}
from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useCart} from "../../context/CartContext";
import Card from "../../components/Card";
import PrimaryButton from "../../components/PrimaryButton";
import {COLORS} from "../../constants/colors";
import * as orderService from "../../services/order";
import { router,useFocusEffect } from "expo-router";
import { useState,useEffect,useCallback } from "react";
import * as walletService from "../../services/wallet.service";


const Checkout = () => {
    const [walletBalance, setWalletBalance] = useState(0);

const [loading, setLoading] = useState(false);

    const {
        items,
        totalAmount,
        clearCart,
    }=useCart();

  const loadWalletBalance = async () => {
    try {
        const response = await walletService.getMyWalletBalance();

        setWalletBalance(
            Number(response.data.data.balance)
        );
    } catch (error) {
        console.log(error);
    }
};
useFocusEffect(
    useCallback(() => {
        loadWalletBalance();
    }, [])
);
    if(items.length===0){
        return(
            <SafeAreaView style={styles.center}>
                <Text style={styles.empty}>
                    Your cart is empty
                </Text>
            </SafeAreaView>
        )
    }




const hasEnoughBalance =
    walletBalance >= totalAmount;

const remainingBalance = Math.max(
    walletBalance - totalAmount,
    0
);
const formatCurrency = (amount: number) =>
    `₹${amount.toFixed(2)}`;
   const confirmOrder = async () => {
     if (loading) return;

    try {

        setLoading(true);

        const payload = items.map(item => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
        }));

        const response =
            await orderService.createOrder(payload);
            clearCart();

            // Refresh latest wallet balance
await loadWalletBalance();
        router.replace({
            pathname: "/(user)/qr",
            params: {
                order: JSON.stringify(
                    response.data.data
                ),
            },
        });

    } catch (error:any) {
         const message =
        error?.response?.data?.message ||
        "Unable to place order.";

        Alert.alert(
            "Order Failed",
            message
        );

    } finally {

        setLoading(false);

    }
};
    return(
        <SafeAreaView style={styles.container}>
            <FlatList 
            data={items} 
            keyExtractor={(item)=>
                item.menuItemId.toString()
            }
            contentContainerStyle={{
                padding:20,
                paddingBottom:120
            }}

            renderItem={({item})=>(
                <Card>
                    <Text style={styles.name}>
                        {item.itemName}
                    </Text>
                    <Text>
                        Quantity : {item.quantity}
                    </Text>
                    <Text>
                       ₹ {item.price}
                    </Text>
                    <Text style={styles.total}>
                        ₹ {item.price*item.quantity}

                    </Text>
                </Card>
            )}
            />
            <View style={styles.footer}>
                <View style={styles.summary}>

    <View style={styles.summaryRow}>
        <Text style={styles.label}>
            Wallet Balance
        </Text>

        <Text style={styles.value}>
           {formatCurrency(walletBalance)}
        </Text>
    </View>

    <View style={styles.summaryRow}>
        <Text style={styles.label}>
            Order Total
        </Text>

        <Text style={styles.value}>
            {formatCurrency(totalAmount)}
        </Text>
    </View>

    <View style={styles.summaryRow}>
        <Text style={styles.remainingLabel}>
            Remaining Balance
        </Text>

        <Text style={styles.remainingValue}>
            {formatCurrency(remainingBalance)}
        </Text>
    </View>

</View>
             <PrimaryButton
    title={
        loading
            ? "Processing..."
            : hasEnoughBalance
                ? "Pay & Confirm Order"
                : "Insufficient Balance"
    }
    disabled={
        loading ||
        !hasEnoughBalance
    }
    onPress={confirmOrder}
/>
            </View>
        </SafeAreaView>
    );
 
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.background
    },
    center:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    empty:{
        fontSize:20
    },
    name:{
        fontSize:20,
        fontWeight:"700",
        marginBottom:8
    },
    total:{
        marginTop:10,
        fontWeight:"700",
        color:COLORS.primary
    },
    footer:{
        position:"absolute",
        left:0,
        right:0,
        bottom:0,
        padding:18,
        backgroundColor:"#fff",
        borderTopWidth:1,
        borderColor:COLORS.border
    },
    grandTotal:{
        fontSize:24,
        fontWeight:"700",

color:COLORS.primary

},
summary: {
    marginBottom: 16,
},

summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
},

label: {
    fontSize: 15,
    color: "#666",
},

value: {
    fontSize: 16,
    fontWeight: "600",
},

remainingLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primary,
},

remainingValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
},
})

export default Checkout;
