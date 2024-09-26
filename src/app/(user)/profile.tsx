import { View, Text , Image, ScrollView } from 'react-native'
import { Alert } from 'react-native'
import { supabase } from '@/src/lib/supabase'
import { Link, Redirect } from 'expo-router'
import Button from '@/src/components/Button'
import { StyleSheet } from 'react-native'
import { signOutUser } from '@/src/api/sign-out'

const profile = () => {
  const confirmSignOut = () => {
    Alert.alert("Confirm","You're gonna delete this product!", [
      {
        text: 'Cancel'
      }, 
      {
        text: 'Delete',
        style:'destructive',
        onPress:onSignOut,
      }
    ]);
  };

  const onSignOut = () => {
     signOutUser(true)
  }
  return (
    <ScrollView style={styles.container}>
    <View>
    <View style={styles.imageView}>
    <Image 
    style={styles.image} 
    source={require('@/assets/images/nopfp.png')} 
    resizeMode='contain'
    />
    </View>
      <Text style={styles.text}>Profile</Text>
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex: 1,
    },
    text : {
        color : 'green',
    },
    image : {
      width : 150,
      height : 200,
      alignSelf : 'center',
      borderRadius : 100,
    }, 
    imageView:{
      alignItems : 'center',
      alignContent : 'center',
      paddingTop :  100,
      paddingBottom : 400
     },
})


export default profile