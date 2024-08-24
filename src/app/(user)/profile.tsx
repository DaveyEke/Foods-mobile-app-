import { View, Text } from 'react-native'
import { supabase } from '@/src/lib/supabase'
import { Link } from 'expo-router'
import Button from '@/src/components/Button'
import { StyleSheet } from 'react-native'


const profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Button style={styles.buttonStyle} text="SignOut" onPress={()=>supabase.auth.signOut()}/>
    </View>
  )
}


const styles = StyleSheet.create({
    buttonStyle : {
        alignSelf : 'center',
        margin: 10
    },
    container : {
        backgroundColor : 'white',
        flex: 1
    },
    text : {
        color : 'green'
    }
})


export default profile