import { View, Text , Image, ScrollView , Modal } from 'react-native'
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
import { Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'


const profile = () => {
  const [image , setImage] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const  [showModal , setShowModal] = useState(false)
  const defaultPFP = "https://ecbjglcrgncwzecmqmna.supabase.co/storage/v1/object/public/nopfp/nopfp.png?t=2024-09-27T10%3A02%3A29.606Z"
   // const defaultPFPString = defaultPFP.toString()
   
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality:1,
    })

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
      .from('display-pics')
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

    <Modal visible={showModal} transparent={true}>
    <View style={styles.content}>
      <View style={styles.card}>
        <Text style={{ alignSelf : 'center' , fontWeight:'bold' , marginBottom: 15}}>This image is your Profile Photo</Text>
        <Pressable onPress={ () =>setShowModal(false)}>
                {({ pressed }) => (
                  <FontAwesome
                    name="close"
                    size={20}
                    color={"red"}
                    style={{ alignSelf : 'flex-end',  opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
        <Image 
          source={{ uri : image == "" ? defaultPFP : image}} 
          style={styles.image} 
          resizeMode='contain'
        />
        <View style={styles.buttonView}>
        <Button onPress={pickImage} textstyle={{ alignSelf : 'flex-start' , marginTop : 30 }} text={"Select Image"} />
        <Pressable onPress={()=> uploadImage()}>
                {({ pressed }) => (
                  <FontAwesome
                    name="upload"
                    size={40}
                    color={"green"}
                    style={{ alignSelf : 'flex-end', marginTop : 35 , marginLeft : 100 , justifyContent : 'center', opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
        {/* <Button textstyle={{ alignSelf : 'flex-end', marginTop : 30 , marginLeft : 90 , justifyContent : 'center'}} text={"Upload"} /> */}
        </View>
      </View>
    </View>
    </Modal>
    <Text onPress={()=>setShowModal(true)}style={styles.text}>Edit</Text>
    </View>
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  card : {
    backgroundColor: 'white',
    width : '90%',
    padding : 20,
    borderRadius : 8,
    height: '45%',
  },
  buttonView : {
    flexDirection : 'row'
  },
  content : {
    flex :1,
    justifyContent: 'center',
    alignItems : 'center',
    shadowColor: '#000',
    backgroundColor : Colors.dark.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
    container : {
        backgroundColor : 'white',
        flex: 1,
    },
    // 
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