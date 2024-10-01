import { View, Text} from 'react-native';
import React from 'react'; 
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { useTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
const next = () => {
    const { session , loading , isAdmin }  = useAuth();
    const theme = useTheme();
    if (loading) {
        return <ActivityIndicator />
    }
    
    if (!session) {
        return <Redirect href={'/sign-in'}/>
    }

    if(!isAdmin) {
        return <Redirect href={'/(user)'}/>
    }
   
    
    return(
        <View style={{ flex: 1 , justifyContent: 'center' , padding: 10 , }}>
            <Link href={'/(user)'} asChild>
                <Button text='User'/>
            </Link>
            <Link href={'/(admin)'} asChild>
            <Button text='Admin' />
            </Link>
            <Button onPress={ () => supabase.auth.signOut()} text="Sign Out" /> 
        </View>
    );
};

export default next;