import { View, Text } from 'react-native'
import { supabase } from '@/src/lib/supabase'
import { Link } from 'expo-router'
import Button from '@/src/components/Button'
import { StyleSheet } from 'react-native'


const profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Button textstyle={{ alignSelf : 'center' , margin : 100 , backgroundColor : 'red'}} text="Sign Out" onPress={()=>supabase.auth.signOut()}/>
    </View>
  )
}


const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex: 1,
        justifyContent: 'center'
    },
    text : {
        color : 'green',
    }
})


export default profile