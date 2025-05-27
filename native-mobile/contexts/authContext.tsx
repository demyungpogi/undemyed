/* REACT */ 
import { createContext, useEffect, useState } from "react";
import { UserInfoType } from "@/entities/user.types";
import { useLoadAuth } from "@/hooks/useRouteAuth";

/* ENTITIES */
type AuthContextType = {
    authLogin: (user_details: Partial<UserInfoType>) =>  void;
    user_details: UserInfoType;
    authLogout: () => Promise<unknown>;
}

export const AuthContext = createContext<AuthContextType> ({} as AuthContextType);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user_details, setUserDetails] = useState<UserInfoType>({} as UserInfoType);
    
    useEffect(() => {
        loadToken();
    }, []);
    
    /**
     * DOCU: This will handle the loading of the token from the storage. <br>.
     * Last Updated at: September 26, 2024 <br>.
     * @author Demy, Noah updated by Jadee
     */
    const loadToken = async () => {
        try{
            /* Check authentication token then redirect the user */
            await useLoadAuth();
        }
        catch (error) {
            console.log('Error Token', error);
        }
    }

    /**
     * DOCU: This will handle the setting up the user login authentication. <br>.
     * Last Updated at: September 17, 2024 <br>.
     * @author Demy Noel
     */
    const authLogin =  (user_details: Partial<UserInfoType>) => {
        try {
            setUserDetails(user_details as UserInfoType);
        }
        catch (error) {
            console.log('Error login on context', error);
            return false;
        }
    }

    /**
     * DOCU: This will handle the removing of user related data and logout user. <br>.
     * Last Updated at: September 26, 2024 <br>.
     * @author Demy, Noel updated by Jadee
     */
    const authLogout = async () => {
        try {
            /* TODO: Destroy the user session  */
        }
        catch (error) {
            console.log('Error logout', error);
        }
    }

    const auth_context_value = {
        authLogin: authLogin,
        authLogout: authLogout,
        user_details: user_details
    };

    return <AuthContext.Provider value={auth_context_value}>{children}</AuthContext.Provider>
}