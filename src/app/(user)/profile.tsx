import { View, Text , Image, ScrollView } from 'react-native'
import { Alert } from 'react-native'
import { supabase } from '@/src/lib/supabase'
import { Link, Redirect } from 'expo-router'
import Button from '@/src/components/Button'
import { StyleSheet } from 'react-native'
import { signOutUser } from '@/src/api/sign-out'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { decode } from 'base64-arraybuffer'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'
import { randomUUID } from 'expo-crypto'

const profile = () => {
  const [image , setImage] = useState('')
  const defaultPFP = "https://ecbjglcrgncwzecmqmna.supabase.co/storage/v1/object/public/nopfp/nopfp.png?t=2024-09-27T10%3A02%3A29.606Z"
   // const defaultPFPString = defaultPFP.toString()
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality:1,
    })

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
   
  }
  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }
  
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });
  
      console.log(error);

    if (data) {
      return data.path;
    }
  };
  return (
    <ScrollView style={styles.container}>
    <View>
    <View style={styles.imageView}>
    <Image 
    style={styles.image} 
    source={{ uri : image == "" ? defaultPFP : image}} 
    resizeMode='contain'
    />
    <Text onPress={pickImage} style={styles.text}>Select Image</Text>
    </View>
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
        color : Colors.light.tint,
        fontWeight : 'bold',
        marginTop : 15
    },
    image : {
      width : 150,
      height : 150,
      alignSelf : 'center',
      borderRadius : 200,
    }, 
    imageView:{
      alignItems : 'center',
      alignContent : 'center',
      paddingTop :  50,
      paddingBottom : 600
     },
})


export default profile