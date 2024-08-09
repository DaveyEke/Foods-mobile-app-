import { View, Text , StyleSheet, TextInput, Alert } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { Redirect } from 'expo-router'
import { useState } from 'react'


const signIn = () => {
    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('')
    const [ errors , setErrors ] = useState('')

    const resetFields = () => {
        setErrors('')
        setEmail('')
        setPassword('')
    }
    
    
    const validateInput = () => {
        if (!email && !password ) {
            setErrors("Pls fill in the blanks!")
            return false;
        } 

        if (!email){
            setErrors("Pls type in your Email")
            return false;
        } 
        if (!password) {
            setErrors("Pls input your Password")
            return false;
        } 

        return true;
    }
    const onSubmit = () => {
        if(!validateInput()){
            return;
        } else {
            Alert.alert("Success!", "You have been signed in Successfully")
            resetFields();
        }
      

    }


  return (
    <View style={styles.container}>
        <Stack.Screen  options={{ title: "Sign In" }} />
        <Text style={styles.textAbove}>Email:</Text>
        <TextInput 
        style={styles.input}
        placeholder='your-name@gmail.com'
        value = {email}
        onChangeText={setEmail}
        />
        <Text style={styles.textAbove}>Password:</Text>
        <TextInput secureTextEntry  placeholder='********' style={styles.input} value={password} onChangeText={setPassword} />
        <Text style={[styles.textAbove, { color : 'red'}]}>{errors}</Text>

        <Button onPress={onSubmit} text='Sign In'/>
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


export default signIn