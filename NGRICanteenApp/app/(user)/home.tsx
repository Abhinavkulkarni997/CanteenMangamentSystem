// import {View,Text,StyleSheet} from "react-native";
// import {COLORS} from "../../constants/colors";
// import { useAuth } from "../../context/AuthContext";
// import Button from "../../components/Button";
// import {router} from "expo-router";


// export default function Home(){
//     const {user} = useAuth();
//     return(
//         <View style={styles.container}>
//             <Text style={styles.title}>
//                 Welcome {user?.name}
//             </Text>
//             <Text style={styles.subtitle}>
//                 {user?.designation}
//             </Text>
//             <Text style={styles.subtitle}>
//                 {user?.division}
//             </Text>
//             <Button title="Today's Menu" onPress={()=>router.push("/(user)/menu")}/>
//         </View>
//     );
// }

// const styles=StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:"center",
//         alignItems:"center",
//         backgroundColor:COLORS.background,
//     },
//     title:{
//         fontSize:24,
//         fontWeight:"bold",
//         color:COLORS.primary,
//     },
//     subtitle:{
//         marginTop:12,
//         fontSize:16
//     },
// });

// import {
//   SafeAreaView,
//   ScrollView,
//   Text,
//   StyleSheet,
// } from "react-native";

// import { router } from "expo-router";

// import { useAuth } from "../../context/AuthContext";

// import Header from "../../components/Header";
// import Card from "../../components/Card";
// import SectionTitle from "../../components/SectionTitle";
// import Button from "../../components/Button";

// import { COLORS } from "../../constants/colors";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// export default function Home() {

//   const { user } = useAuth();

//   return (

//     <SafeAreaView style={styles.container}>

//       <ScrollView
//         contentContainerStyle={styles.content}
//       >

//         <Header

//           name={user?.name ?? ""}

//           designation={user?.designation ?? ""}

//         />

//         <SectionTitle title="Today's Meals" />

//         <Card>

//           <Text style={styles.meal}>
//             {/* 🍛 */}
//             <MaterialCommunityIcons
//   name="silverware-fork-knife"
//   size={28}
//   color={COLORS.primary}
// />
//              Lunch
//           </Text>

//           <Text style={styles.meal}>
//             {/* 🌙 */}
//              Dinner
//           </Text>

//         </Card>

//         <Button

//           title="View Today's Menu"

//           onPress={() =>
//             router.push("/(user)/menu")
//           }

//         />

//       </ScrollView>

//     </SafeAreaView>

//   );

// }

// const styles = StyleSheet.create({

//   container: {

//     flex: 1,

//     backgroundColor: COLORS.background,

//   },

//   content: {

//     padding: 20,

//   },

//   meal: {

//     fontSize: 18,

//     marginVertical: 8,

//   },

// });


import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import { router,useFocusEffect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAuth } from "../../context/AuthContext";
import Card from "../../components/Card";
import Header from "../../components/Header";
import SectionTitle from "../../components/SectionTitle";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS } from "../../constants/colors";
import { useState,useEffect,useCallback } from "react";
import {
  getMyWalletBalance
} from "../../services/wallet.service";
import WalletCard from "../../components/WalletCard";
export default function Home() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);

const [loadingBalance, setLoadingBalance] = useState(true);
const loadWalletBalance = async () => {
  try {
    setLoadingBalance(true);

    const response =
      await getMyWalletBalance();

    setBalance(
      Number(response.data.data.balance)
    );
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingBalance(false);
  }
};
useFocusEffect(
  useCallback(() => {
  loadWalletBalance();
},[]));
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header
          name={user?.name ?? ""}
          designation={user?.designation ?? ""}
        />
        <WalletCard
    balance={balance}
    loading={loadingBalance}
    onPress={() => router.push("/(user)/wallet")}
/>

        <SectionTitle title="Today's Meals" />

        <Card>

          <View style={styles.mealRow}>
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={24}
              color={COLORS.primary}
            />

            <View style={styles.textContainer}>
              <Text style={styles.mealTitle}>Lunch</Text>
              <Text style={styles.mealSubtitle}>
                Fresh meals available
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.mealRow}>
            <MaterialCommunityIcons
              name="food"
              size={24}
              color={COLORS.primary}
            />

            <View style={styles.textContainer}>
              <Text style={styles.mealTitle}>Dinner</Text>
              <Text style={styles.mealSubtitle}>
                Evening meals available
              </Text>
            </View>
          </View>

        </Card>

        <PrimaryButton
          title="View Today's Menu"
          onPress={() => router.push("/(user)/menu")}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  mealRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },

  textContainer: {
    marginLeft: 15,
    flex: 1,
  },

  mealTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
  },

  mealSubtitle: {
    marginTop: 3,
    color: "#777",
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 15,
  },

});