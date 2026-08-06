import { Tabs,Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";

export default function UserLayout() {
  // console.log("User Layout Render");
  const {
    loading,
    isAuthenticated,
  } = useAuth();
// console.log({
//   loading,
//   isAuthenticated,
// });
  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Hide workflow screens from the tab bar */}
      <Tabs.Screen
        name="checkout"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="qr"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          href: null,
        }}
      />

      {/* <Tabs.Screen
        name="orderdetails"
        options={{
          href: null,
        }}
      /> */}

      <Tabs.Screen
    name="orders/[id]"
    options={{
        href: null,
    }}
/>
  {/* <Tabs.Screen
    name="menu/index"
    options={{
        href: null,
    }}
/>
  <Tabs.Screen
    name="menu/[meal]"
    options={{
        href: null,
    }}
/> */}
<Tabs.Screen
  name="change-password"
  options={{
    href: null,
  }}
/>
<Tabs.Screen
    name="wallet"
    options={{
        href:null
    }}
/>
    </Tabs>
    
  );
}