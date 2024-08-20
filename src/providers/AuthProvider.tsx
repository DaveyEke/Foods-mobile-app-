import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useContext } from "react";
import { Profile } from "../types";

type AuthData = {
    session : Session | null,
    loading : boolean,
    profile : any,
    isAdmin : boolean,
};

const AuthContext = createContext<AuthData>({
    session : null,
    loading : true,
    profile : null,
    isAdmin : false
});


export default function AuthProvider({children}: PropsWithChildren ) {

    const [session , setSession] = useState<Session | null>(null);
    const [profile , setProfile] = useState<Profile | null>(null);
    const [loading, setLoading]  = useState(true);

    useEffect(()=>{
       const fetchSession = async () => {
        const { data : {session} } =  await supabase.auth.getSession();
        setSession(session)
        
        if (session) {
            // fetch profile
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            setProfile(data || null);
          }
          setLoading(false);
       };
       fetchSession();
       supabase.auth.onAuthStateChange((_event, session )=>{
        setSession(session)
       })
    } , []);
    console.log(profile)
    return (
        <AuthContext.Provider value={{ session , loading , profile, isAdmin : profile?.group === "ADMIN" }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);