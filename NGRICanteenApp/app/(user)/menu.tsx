import {  useCallback,useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";

import { router ,useFocusEffect} from "expo-router";

import * as menuService from "../../services/menu";

import { MenuItem } from "../../types/menu";
import { useCart } from "../../context/CartContext";

import { COLORS } from "../../constants/colors";

import MenuCard from "../../components/MenuCard";
import PrimaryButton from "../../components/PrimaryButton";
import NoMenuAvailable from "../../components/NoMenuAvailable";

export default function Menu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
//   const [menu, setMenu] = useState<MenuItem[]>([
//   {
//     id: 1,
//     itemName: "Rice",
//     description: "Steamed Rice",
//     sessionType: "LUNCH",
//     price: 5,
//     available: true,
//     quantity: 0,
//   },
// ]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const {
    items,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalAmount,
  } = useCart();

  useFocusEffect(
    useCallback(() => {
    loadMenu();
  }, []));

  const loadMenu = async (isRefresh=false) => {
    try{
      if(isRefresh){
        setRefreshing(true);
      }else{
        setLoading(true);
      }
    
      const response = await menuService.getTodayMenu();
       console.log("Full response:", response);
    console.log("response.data:", response.data);
    console.log("response.data.data:", response.data.data);
    console.log("Is array:", Array.isArray(response.data.data));


      setMenu(response.data.data);
    }catch(error){
      console.log("Load menu error", error);
    } 
    finally {
      if(isRefresh){
        setRefreshing(false);
      }else{
        setLoading(false);
      }
    }
  };
  
  const lunchItems = menu.filter(
  (item) => item.sessionType === "LUNCH"
);

const dinnerItems = menu.filter(
  (item) => item.sessionType === "DINNER"
);

  const getQuantity = (menuItemId: number) => {
    const cartItem = items.find(
      (item) => item.menuItemId === menuItemId
    );

    return cartItem?.quantity ?? 0;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  console.log("Menu:", menu);
console.log("Loading:", loading);
const renderMenuSection = (
  title: string,
  data: MenuItem[]
) => (
  <>
    <Text style={styles.heading}>{title}</Text>
      <View style={styles.divider} />

      {data.length===0 ?(
        <NoMenuAvailable meal={title.trim() as "Lunch" | "Dinner"} />
      ):(
         data.map((item) => {
      const quantity = getQuantity(item.id);

      return (
        <MenuCard
          key={item.id}
          item={item}
          quantity={quantity}
          onIncrease={() => {
            if (quantity === 0) {
              addItem({
                menuItemId: item.id,
                itemName: item.itemName,
                price: item.price,
                quantity: 1,
                sessionType: item.sessionType,
              });
            } else {
              increaseQuantity(item.id);
            }
          }}
          onDecrease={() => decreaseQuantity(item.id)}
        />
      );
    })

      )}

   
  </>
);
const sections = [
  {
    title: " Lunch",
    type: "LUNCH",
  },
  {
    title: " Dinner",
    type: "DINNER",
  },
];

  return (
    <View style={styles.container}>

      {/* <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 110 }}
        renderItem={({ item }) => {

          const quantity = getQuantity(item.id);

          return (
            <MenuCard
              item={item}
              quantity={quantity}
              onIncrease={() => {

                if (quantity === 0) {

                  addItem({
                    menuItemId: item.id,
                    itemName: item.itemName,
                    price: item.price,
                    quantity: 1,
                    sessionType: item.sessionType,
                  });

                } else {

                  increaseQuantity(item.id);

                }

              }}
              onDecrease={() => {

                decreaseQuantity(item.id);

              }}
            />
          );

        }}
      /> */}
      {/* <FlatList
  data={menu}
  keyExtractor={(item) => item.id.toString()}
  ListEmptyComponent={
    <Text
      style={{
        textAlign: "center",
        marginTop: 50,
        fontSize: 18,
      }}
    >
      No menu available today
    </Text>
  }
  renderItem={({ item }) => (
    <MenuCard
      item={item}
      quantity={getQuantity(item.id)}
      onIncrease={() => {}}
      onDecrease={() => {}}
    />
  )}
/> */}

{/* <FlatList
  ListHeaderComponent={
    <>
      <Text style={styles.heading}>
         Lunch
      </Text>

      {lunchItems.map((item) => {
        const quantity = getQuantity(item.id);

        return (
          <MenuCard
            key={item.id}
            item={item}
            quantity={quantity}
            onIncrease={() => {
              if (quantity === 0) {
                addItem({
                  menuItemId: item.id,
                  itemName: item.itemName,
                  price: item.price,
                  quantity: 1,
                  sessionType: item.sessionType,
                });
              } else {
                increaseQuantity(item.id);
              }
            }}
            onDecrease={() => decreaseQuantity(item.id)}
          />
        );
      })}

      <Text style={styles.heading}>
         Dinner
      </Text>

      {dinnerItems.map((item) => {
        const quantity = getQuantity(item.id);

        return (
          <MenuCard
            key={item.id}
            item={item}
            quantity={quantity}
            onIncrease={() => {
              if (quantity === 0) {
                addItem({
                  menuItemId: item.id,
                  itemName: item.itemName,
                  price: item.price,
                  quantity: 1,
                  sessionType: item.sessionType,
                });
              } else {
                increaseQuantity(item.id);
              }
            }}
            onDecrease={() => decreaseQuantity(item.id)}
          />
        );
      })}
    </>
  }
  data={[]}
  renderItem={null}
/> */}
<FlatList
  data={sections}
  keyExtractor={(item) => item.type}
  contentContainerStyle={{ paddingBottom: 110 }}
   refreshing={refreshing}
  onRefresh={() => loadMenu(true)}
  renderItem={({ item }) =>
    renderMenuSection(
      item.title,
      menu.filter(
        (menuItem) =>
          menuItem.sessionType === item.type
      )
    )
  }
/>

      {totalItems > 0 && (

        <View style={styles.bottomBar}>

          <View>

            <Text style={styles.items}>
              {totalItems} Item{totalItems > 1 ? "s" : ""}
            </Text>

            <Text style={styles.amount}>
              ₹ {totalAmount}
            </Text>

          </View>

          <PrimaryButton
            title="Proceed"
            onPress={() =>
              router.push("/(user)/checkout")
            }
          />

        </View>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 15,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: COLORS.white,

    padding: 16,

    borderTopWidth: 1,
    borderColor: COLORS.border,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
heading: {
  fontSize: 24,
  fontWeight: "700",
  color: COLORS.primary,
  marginTop: 20,
  marginBottom: 12,
},

divider: {
  height: 1,
  backgroundColor: COLORS.border,
  marginBottom: 16,
},
  items: {
    fontSize: 14,
    color: "#777",
  },

  amount: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },

});

// import { View, Text, StyleSheet } from "react-native";

// export default function Menu() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Menu Screen</Text>
//       <Text>No menu available.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 10,
//   },
// });