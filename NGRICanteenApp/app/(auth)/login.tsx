// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
//   TouchableOpacity,
// } from "react-native";

// import { router } from "expo-router";

// import Input from "../../components/Input";
// import PrimaryButton from "../../components/PrimaryButton";
// import { COLORS } from "../../constants/colors";
// import { useAuth } from "../../context/AuthContext";

// export default function LoginScreen() {
//   const { login } = useAuth();

//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [mobileError, setMobileError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const handleLogin = async () => {
//     const mobileNumber=mobile.trim();
//     const userPassword=password.trim();

//     if (!mobileNumber) {
//       // Alert.alert("Validation", "Please enter mobile number");
//       setMobileError("Please enter mobile number");
//       return;
//     }
//     if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
//   // Alert.alert(
//   //   "Validation",
//   //   "Please enter a valid 10-digit mobile number"
//   // );
//     setMobileError("Please enter a valid 10-digit mobile number");
//   return;
// }

//     if (!userPassword) {
//       // Alert.alert("Validation", "Please enter password");
//       setPasswordError("Please enter password");
//       return;
//     }
//     if (userPassword.length < 6) {
//   // Alert.alert(
//   //   "Validation",
//   //   "Password must be at least 6 characters"
//   // );
//   setPasswordError("Password must be at least 6 characters");
//   return;
// }
//     try {
//       setLoading(true);

//       await login(mobile.trim(), password.trim());

//       router.replace("/(user)/home");
//     } catch (error: any) {
//       // Alert.alert(
//       //   "Login Failed",
//       //   error?.response?.data?.message || "Something went wrong"
//       // );
//       Alert.alert(
//     "Login Failed",
//     error?.response?.data?.message ??
//     "Invalid mobile number or password."
// );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <Image
//     source={require("../../assets/images/ngri-logo.png")}
//     style={styles.logo}
//     resizeMode="contain"
// />
//       <Text style={styles.title}>CSIR-NGRI</Text>

//       <Text style={styles.subtitle}>
//         Canteen Management System
//       </Text>
//       <Text style={styles.tagline}>
//     Book Meals • Pay Securely
// </Text>

    
//       <Input
//         label="Mobile Number"
//         placeholder="Enter Mobile Number"
//         value={mobile}
//         onChangeText={setMobile}
//         keyboardType="number-pad"
//         maxLength={10}
//         autoCapitalize="none"
//         autoCorrect={false}
//         textContentType="telephoneNumber"
//       />
//         {mobileError ?(
//         <Text style={styles.error}>{mobileError}</Text>
//       ) : null}
      

 
//       <Input
//         label="Password"
//         placeholder="Enter Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         autoCapitalize="none"
//         autoCorrect={false}
//         textContentType="password"
//       />
//            {passwordError ? (
//         <Text style={styles.error}>{passwordError}</Text>
//       ) : null}


//       <PrimaryButton
//         title={loading?"Logging in...":"Login"}
//         onPress={handleLogin}
//         loading={loading}
//         disabled={loading}
//       />
//       <View style={styles.bottomContainer}>

//     <Text style={styles.bottomText}>
//         New User?
//     </Text>

//     <TouchableOpacity
//         onPress={() =>
//             router.push("/(auth)/register")
//         }
//     >
//         <Text style={styles.link}>
//             Create Account
//         </Text>
//     </TouchableOpacity>

// </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     justifyContent: "center",
//     padding: 25,
//   },

//   // title: {
//   //   fontSize: 34,
//   //   fontWeight: "bold",
//   //   color: COLORS.primary,
//   //   textAlign: "center",
//   // },

//   // subtitle: {
//   //   textAlign: "center",
//   //   fontSize: 18,
//   //   marginBottom: 35,
//   //   color: COLORS.black,
//   // },
//   logo: {

//     width: 90,

//     height: 90,

//     alignSelf: "center",

//     marginBottom: 20,

// },

// title: {

//     fontSize: 28,

//     fontWeight: "700",

//     textAlign: "center",

//     color: COLORS.primary,

// },

// subtitle: {

//     fontSize: 18,

//     textAlign: "center",

//     marginTop: 4,

//     color: "#555",

// },

// tagline: {

//     fontSize: 14,

//     textAlign: "center",

//     color: "#888",

//     marginTop: 8,

//     marginBottom: 30,

// },

// bottomContainer: {

//     flexDirection: "row",

//     justifyContent: "center",

//     alignItems: "center",

//     marginTop: 25,

// },

// bottomText: {

//     fontSize: 15,

//     color: "#666",

// },

// link: {

//     marginLeft: 6,

//     color: COLORS.primary,

//     fontWeight: "700",

// },
// error: {
//     color: "#dc2626",
//     fontSize: 13,
//     marginTop: 1,
//     marginBottom: 10,
// },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const mobileNumber = mobile.trim();
    const userPassword = password.trim();

    setMobileError("");
    setPasswordError("");

    let hasError = false;

    if (!mobileNumber) {
      setMobileError("Please enter mobile number");
      hasError = true;
    } else if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setMobileError(
        "Please enter a valid 10-digit mobile number"
      );
      hasError = true;
    }

    if (!userPassword) {
      setPasswordError("Please enter password");
      hasError = true;
    } else if (userPassword.length < 6) {
      setPasswordError(
        "Password must be at least 6 characters"
      );
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);

      await login(mobileNumber, userPassword);

      router.replace("/(user)/home");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.response?.data?.message ??
          "Invalid mobile number or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios" ? "padding" : undefined
      }
    >
      <Image
        source={require("../../assets/images/ngri-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        CSIR-NGRI
      </Text>

      <Text style={styles.subtitle}>
        Canteen Management System
      </Text>

      <Text style={styles.tagline}>
        Book Meals • Pay Securely
      </Text>

      <Input
        label="Mobile Number"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChangeText={(text) => {
          setMobile(text);

          if (mobileError) {
            setMobileError("");
          }
        }}
        keyboardType="phone-pad"
        maxLength={10}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="telephoneNumber"
        error={mobileError}
      />

      <Input
        label="Password"
        placeholder="Enter Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);

          if (passwordError) {
            setPasswordError("");
          }
        }}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        error={passwordError}
      />

      <PrimaryButton
        title={
          loading ? "Logging in..." : "Login"
        }
        loading={loading}
        disabled={loading}
        onPress={handleLogin}
      />

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          New User?
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push("/(auth)/register")
          }
        >
          <Text style={styles.link}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.primary,
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 4,
    color: "#555",
  },

  tagline: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
    marginTop: 8,
    marginBottom: 30,
  },

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  bottomText: {
    fontSize: 15,
    color: "#666",
  },

  link: {
    marginLeft: 6,
    color: COLORS.primary,
    fontWeight: "700",
  },
});