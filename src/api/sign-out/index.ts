import { supabase } from "@/src/lib/supabase";
import { Redirect, router } from "expo-router";
import { Router } from "expo-router";
import { Alert } from "react-native";

export const signOutUser = async ( value : boolean) => {
    if (value){
        try {
            await supabase.auth.signOut()
        } finally {
            router.push('/next')
            Alert.alert("You've been signed out successfully!")
        }
    }
}