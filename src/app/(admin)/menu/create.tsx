import { View, Text , StyleSheet, TextInput, Alert} from 'react-native'
import React from 'react'
import Button from '@/src/components/Button'
import { useState } from 'react'
import { Image } from 'react-native'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams } from 'expo-router'

const CreateProductScreen = () => {

  const [name, setName] = useState('');
  const [price , setPrice] = useState('');
  const [errors , setErrors] = useState('');
  const [image, setImage] = useState('');

  const { id } = useLocalSearchParams();

  const isUpdating = !!id;

  const resetFileds = () => {
    setName(''),
    setPrice('')
  }

  const validateInput = () => {
    if (!name){
      setErrors("A name is required");
      return false;
    }
    if (!price){
      setErrors("A price is required");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setErrors('The price should be a number')
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdateCreate();
    } else {
      onCreate();
    }
  }

  const onCreate = () => {
    if (!validateInput()) {
      Alert.alert(`${errors}`)
      return;
    }
    Alert.alert(`Creating Product...${name} with Price $${price}`)

    // save in the database 
    setErrors('')
    resetFileds();
  };

  const onUpdateCreate = () => {
    Alert.alert(`${errors}`)
    if (!validateInput()) {
      return;
    }
    Alert.alert(`Updating Product...${name} with Price $${price}`)

    // save in the database 
    setErrors('')
    resetFileds();
  };


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

  const onDelete = () => {
    Alert.alert("DELETEEEE!!")
  };
  const confirmDelete = () => {
    Alert.alert("Confirm","You're gonna delete this product!", [
      {
        text: 'Cancel'
      }, 
      {
        text: 'Delete',
        style:'destructive',
        onPress:onDelete,
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product'}} />
      <Image
        source={{ uri : image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <Text style={styles.label}>Price($):</Text>
      <TextInput placeholder="Price" style={styles.input} 
       keyboardType='numeric'
        value={price}
        onChangeText={setPrice}
      />
      {
        errors ? <Text style={{ color : 'red' }}>{errors}</Text> : null
      }
      <Button onPress={onSubmit} text={ isUpdating ? 'Update' : 'Create'} /> 
      { isUpdating && <Text  onPress={confirmDelete} style={[styles.textButton ]}>Delete</Text>}
    </View>
  )
  
}

const styles  =StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input : {
        backgroundColor:'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,

    },

    label: {
        color: 'gray',
        fontSize: 16
    } ,

    image : {
      width: '50%',
      aspectRatio:1,
      alignSelf:'center',
      borderRadius: 100
    }, 

    textButton: {
      alignSelf: 'center',
      fontWeight: 'bold',
      color : Colors.light.tint,
      marginVertical: 10,
    }
})


export default CreateProductScreen;