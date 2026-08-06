import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "../context/AuthContext";

export default function Index() {

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    if (loading) {

        return (
            <View
                style={{
                    flex:1,
                    justifyContent:"center",
                    alignItems:"center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );

    }

    if (isAuthenticated) {
        return <Redirect href="/(user)/home" />;
    }

    return <Redirect href="/(auth)/login" />;
}