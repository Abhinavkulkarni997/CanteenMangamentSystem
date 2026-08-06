import React,{useState,useEffect} from 'react';
import {ScrollView,View,Text,StyleSheet,ActivityIndicator} from "react-native";

import { useLocalSearchParams } from 'expo-router';
import QRCOde from "react-native-qrcode-svg";
import * as orderService from "../../../services/order";
import Card from "../../../components/Card";
import StatusBadge from '../../../components/StatusBadge';
import {COLORS} from "../../../constants/colors";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function OrderDetails(){
    const {id} =useLocalSearchParams();
    console.log(id);
    const [order,setOrder]=useState<any>(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        if(id){
             loadOrder();
        }
       
    },[id]);

    const loadOrder=async()=>{
        setLoading(true);
        setOrder(null);
        try{
            const response=await orderService.getOrderDetails(
                Number(id)
            );
            setOrder(response.data.data);
        }finally{
            setLoading(false);
        }
    };
    if(loading){
        return(
            <View style={styles.center}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }
    if(!order){
        return(
            <View style={styles.center}>
                <Text>

                </Text>

            </View>
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Card>
                    <Text style={styles. orderNo}>
                        {order.orderNumber}
                    </Text>

                    <StatusBadge status={order.orderStatus}/>
                    <Text style={styles.amount}>
                        ₹{order.totalAmount}
                        </Text>

                </Card>
                <Card>
                    <Text style={styles.heading}>
                        Ordered Items
                    </Text>
                    {
                        order.items.map((item:any)=>(
                            <View key={item.id}
                            style={styles.itemRow}
                            >
                                <Text>
                                    {item.menuItem.itemName}
                                </Text>
                                <Text style={styles.calculation}>
                                {item.quantity} × ₹ {item.unitPrice}=₹{item.totalPrice}
                                </Text>
                               

                            </View>
                        ))
                    }
                    <View style={styles.totalContainer} >
                        <View style={styles.totalRow}>
                            <Text style={styles.container}>
                                Subtotal
                            </Text>

                            {/* <Text style={styles.totalValue}>
                                ₹ {order.totalAmount}
                            </Text> */}
                            <View style={styles.divider}/>
                            <View style={styles.totalRow}>
                                <Text style={styles.grandTotal}>
                                    Total 
                                </Text>
                            </View>

                            <Text style={styles.grandTotal}>
                              =₹ {order.totalAmount}
                    </Text>

                        </View>
                        
                    </View>
                  
                </Card>
                <Card>
                 <View style={{alignItems:"center"}}>
                    <QRCOde value={order.qrToken}
                    size={220}
                    />
                 </View>
                </Card>
            </ScrollView>
        </SafeAreaView>

    );


}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.background
    },
    content:{
        padding:20
    },
    center:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    orderNo:{
        fontSize:22,
        fontWeight:"700",
    },
    amount:{
        marginTop:10,
        fontSize:26,
        fontWeight:"700",
        color:COLORS.primary
    },
    heading:{
        fontSize:18,
        fontWeight:"700",
        marginBottom:15
    },
    itemRow:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:12
    },
    calculation: {
    color: "#666",
    fontSize: 15,
},
totalContainer:{
    marginTop:15
},
totalRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:8,
},
totalLabel:{
    fontSize:16,
    color:"#555",
},
totalValue:{
    fontSize:16,
    fontWeight:"600",
},
divider:{
    borderTopWidth:1,
    borderColor:"#DDD",
    marginVertical:10,
},
grandTotal:{
    fontSize:20,
    fontWeight:"700",
    color:COLORS.primary
}

});