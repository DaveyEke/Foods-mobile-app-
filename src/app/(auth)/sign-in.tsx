import { View, Text , StyleSheet, TextInput, Alert } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { Redirect } from 'expo-router'
import { useState } from 'react'
import { useSegments } from 'expo-router'
import { supabase } from '@/src/lib/supabase'



const signInScreen = () => {
    const segments = useSegments();
    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('')
    const [ errors , setErrors ] = useState('')
    const [loading , setLoading] = useState(false)
    console.log(segments)
    

    async function signInWithEmail () {
        setLoading(true);
        const { error }= await supabase.auth.signInWithPassword({email,password});
        if (error) Alert.alert(error.message)
        if (!error) Alert.alert("Success" , "You've been signed in Successfully")
        setLoading(false)
        
        
       
      }

    const resetFields = () => {
        setErrors('')
        setEmail('')
        setPassword('')
    }
    
   


  return (
    <View style={styles.container}>
        <Stack.Screen  options={{ title: "Sign In" }} />
        <Text style={styles.textAbove}>Email:</Text>
        <TextInput 
        style={styles.input}
        placeholder='your-email@example.com'
        value = {email}
        onChangeText={setEmail}
        />
        <Text style={styles.textAbove}>Password:</Text>
        <TextInput secureTextEntry  placeholder='********' style={styles.input} value={password} onChangeText={setPassword} />
        <Text style={[styles.textAbove, { color : 'red'}]}>{errors}</Text>

        <Button onPress={signInWithEmail} disabled={loading} text={loading ? 'Signing you in...' : 'Sign In'}/>
        <Link href='/sign-up' style={styles.text}>Create an Account</Link>
    </View>
  )
}



const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent: 'center',
        padding: 10,
    }, 
    input : {
        backgroundColor:'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    }, 
    textAbove: {
        padding: 8,
        fontSize: 15
        
    },
    text : {
        color : Colors.light.tint,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center', 
        padding : 5,
        fontWeight:'bold'
    },
})


export default signInScreen