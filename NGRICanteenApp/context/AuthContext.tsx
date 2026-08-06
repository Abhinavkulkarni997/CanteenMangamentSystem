import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authService from "../services/auth";
import {User} from "../types/user";

// interface User {

//     id: number;

//     name: string;

//     mobile: string;

//     employeeId: string;

//     designation: string;

//     division: string;

//     photoUrl: string;

//     role: string;

//     userType: string;

// }

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (mobile: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  
  const [token, setToken] = useState<string | null>(null);
  const [user,setUser]=useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession()
  }, []);

const loadSession = async () => {

    try {

        const storedToken = await AsyncStorage.getItem("token");

        if (!storedToken) {
            setLoading(false);
            return;
        }

        setToken(storedToken);

        const profile = await authService.getProfile();

        setUser(profile.data.data);

        await AsyncStorage.setItem(
            "user",
            JSON.stringify(profile.data.data)
        );

    } catch (error) {

        // await AsyncStorage.multiRemove([
        //     "token",
        //     "user"
        // ]);

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");

        setToken(null);
        setUser(null);

    } finally {

        setLoading(false);

    }

};
  const login = async (
    mobile: string,
    password: string
  ) => {
    const response = await authService.login({
      mobile,
      password,
    });

    const token = response.data.data.token;

    await AsyncStorage.setItem("token", token);

    setToken(token);
    const profile=await authService.getProfile();
    setUser(profile.data.data);
    await AsyncStorage.setItem("user",JSON.stringify(profile.data.data));
  };

  const logout = async () => {
    // await AsyncStorage.multiRemove(["token","user"]);
    // console.log("Before logout");
    try{
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    }finally{
        setToken(null);
    setUser(null);
     setLoading(false);
    }


  
      // console.log("After logout");
  };
  
  const isAuthenticated =
    !!token && !!user;

  return (
   <AuthContext.Provider
    value={{
        token,
        user,
        loading,
        isAuthenticated,
        login,
        logout,
    }}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);