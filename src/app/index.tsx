import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { Link } from 'expo-router'
import { useAuth } from '../providers/AuthProvider'
import { Alert } from 'react-native'
import { Image } from 'react-native'
import { Redirect } from 'expo-router'
import { useFonts } from 'expo-font'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { Platform } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react'
import { PaperColors } from '../constants/PaperColors'
const index = () => {
  const [loaded, error] = useFonts({
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    SegoeUIBold: require('../../assets/fonts/Segoe-UI-Bold.ttf'),
    Fontspring: require('../../assets/fonts/Fontspring.otf'),
  });

    const { session , loading , isAdmin }  = useAuth();

    if (session) {
        return <Redirect href={'/next'}/>
    }
  return (
    <View style={styles.container}>
    <Text style={styles.textStyle}>Quality pizza an order away!</Text>
    <View style={styles.imageView}>
    <Image 
    style={styles.image} 
    source={require('@/assets/images/logo.png')} 
    resizeMode='contain'
    />
    </View>
     <View style={styles.buttonView}>
     <Link href={'../next'} asChild>
      <Button textstyle={{ borderRadius : 6 , marginLeft : 40 , marginRight: 40}} text="Continue With Email"/>
      </Link>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
 container : {
    flex : 1,
    backgroundColor : "white"
 } , 
 buttonView : {
    paddingTop : 600,
 },
  image : {
    width : 200,
    height : 200,
    alignSelf : 'center'
  }, 
  imageView:{
    alignItems : 'center',
    alignContent : 'center',
    position : 'absolute',
    paddingLeft : 100,
    paddingTop :  100
   },
   textStyle : {
    fontWeight : 'bold',
    fontFamily: Platform.select({
      android: 'Fontspring',
      ios: 'Fontspring',
    }),
    fontSize : 30,
    paddingTop: 550,
    position: 'absolute',
    alignSelf: 'center',
    },
    textView : {
    paddingRight : 200,
    paddingTop: 370,
    position : 'absolute',
    }
})