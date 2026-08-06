import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import * as authService from "../services/auth";

import  type { AuthContextType, User } from "../types/auth";

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export function AuthProvider({

    children,

}: {

    children: ReactNode;

}) {

    const [user, setUser] = useState<User | null>(null);

    const [token, setToken] = useState<string | null>(

        localStorage.getItem("token")

    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        const stored = localStorage.getItem("token");

        if (!stored) {

            setLoading(false);

            return;

        }

        try {

            const response = await authService.me();

            setUser(response.data.data);

            setToken(stored);

        }

        catch {

            localStorage.removeItem("token");
               setToken(null);
               setUser(null);

        }

        finally {

            setLoading(false);

        }

    };

    const login = async (

        email: string,

        password: string

    ) => {
        setLoading(true);
        try{
            const response = await authService.login({

            email,

            password,

        });

        const jwt = response.data.data.token;

        localStorage.setItem("token", jwt);

        setToken(jwt);

        const profile = await authService.me();

        setUser(profile.data.data);
         return response.data.data;
        }
        finally{
             setLoading(false);
        }
       
    };
    

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                loading,

                login,

                logout,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export const useAuth = () => useContext(AuthContext);