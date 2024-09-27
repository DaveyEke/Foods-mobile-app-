import { View, Text , StyleSheet, TextInput, Alert} from 'react-native'
import React, { useEffect } from 'react'
import Button from '@/src/components/Button'
import { useState } from 'react'
import { Image } from 'react-native'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useInsertProduct, useProduct, useProductList } from '@/src/api/products'
import { Router } from 'expo-router'
import { useUpdateProduct } from '@/src/api/products'
import { useDeleteProduct } from '@/src/api/products'
import { ActivityIndicator } from 'react-native'
import { Modal } from 'react-native'
import { useQueryClient } from '@tanstack/react-query'
import * as FileSystem from 'expo-file-system'
import { supabase } from '@/src/lib/supabase'
import { decode } from 'base64-arraybuffer'
import { randomUUID } from 'expo-crypto'
import LoadingAnimation from '@/src/components/loadinganimation'



const CreateProductScreen = () => {
  

  const [name, setName] = useState('');
  const [price , setPrice] = useState('');
  const [errors , setErrors] = useState('');
  const [image, setImage] = useState<string | null>('');
  const [loading , setLoading] = useState(false)

  const { id:idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);

  const isUpdating = !!id;

  const { mutate: insertProduct} = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const {data : updatingProduct} = useProduct(id);
  const { mutate : deleteProduct  } = useDeleteProduct();


  useEffect(()=> {
    if (updatingProduct){
      setName(updatingProduct.name)
      setPrice(updatingProduct.price.toString())
      setImage(updatingProduct.image)
    }
  }, [updatingProduct])

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
      onUpdate();
    } else {
      onCreate();
    }
  }
  
  
  const onCreate = async () => {
    setLoading(true)
    //  if (loading){
    //   return <LoadingAnimation text={`Creating product with name :${name} and price:${price}`}/>
    // }
    
    if (!validateInput()) {
      Alert.alert(`${errors}`)
      return;
    }


   const imagePath = await uploadImage();
    // Alert.alert(`Creating Product...${name} with Price $${price}`)

    // save in the database 
    insertProduct({name , price: parseFloat(price) , image : imagePath}, {
      onSuccess : () => {
        Alert.alert("Success", "Product created successfully")
        resetFileds()
        setLoading(false)
        router.back()
      }
    })
    setErrors('')
  };

  const onUpdate = async () => {
    const imagePath = await uploadImage();
    Alert.alert(`${errors}`)
    if (!validateInput()) {
      return;
    }
    Alert.alert(`Updating Product...${name} with Price $${price}`)
    // save in the database 
    updateProduct(
      {id , name , price: parseFloat(price), image : imagePath} , {
        onSuccess: () => {
          resetFileds();
          Alert.alert("Success", "This product has been updated successfully")
          router.back();
        }
      }
    );
    

    
    setErrors('')
    
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
      deleteProduct(id,  {onSuccess : () => {
      resetFileds();
      router.replace('/(admin)');
    }});
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

  const textState = (isUpdating : boolean , loading: boolean , name:string) => {
      if (isUpdating == true) {
        return "Update";
      } else if ( loading == true) {
        return `Creating Product....${name}`;
      } else {
        return "Create"
      }
  }
  // isUpdating ? 'Update' : 'Create'
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
      <Button onPress={onSubmit} disabled={loading} text={textState(isUpdating, loading , name)} /> 
      
      { isUpdating && <Text  onPress={confirmDelete} style={[styles.textButton ]}>Delete</Text>}
    </View>
  )
  
}

const styles = StyleSheet.create({
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
    }, 
    indicatorWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    indicator: {},
    indicatorText: {
      fontSize: 18,
      marginTop: 12,
    },
})


export default CreateProductScreen;