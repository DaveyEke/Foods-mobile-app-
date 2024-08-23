import { View, Text, Image, StyleSheet, Pressable , Alert } from 'react-native'
import { Stack ,useLocalSearchParams, useRouter , Link } from 'expo-router';
import React from 'react'
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';
import { ActivityIndicator } from 'react-native';
import RemoteImage from '@/src/components/RemoteImages';


const sizes: PizzaSize[] = ['S', 'M','L','XL'];

const ProductDetailsScreen = () => {
  const { id : idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const { data : product, error, isLoading} = useProduct(id);
  
  const { addItem } = useCart();

  const [selectedSize , setSelectedSize] = useState<PizzaSize>('M');



  const addToCart = () => {
    if (!product){
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart')
  };

  if (isLoading) {
    return <ActivityIndicator />;
   }
   if (error) {
    Alert.alert("Error","Failed to fetch products")
   }
  if (!product) {
    return Alert.alert("Error", "Product not found")
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
         options={{ title: "Menu" ,  headerRight: () => (
          // Remember to redirect to the edit screen
            <Link href={`../../(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="edit"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
           ),
          }} 
        /> 
      <Stack.Screen  options={{ title: product.name}}/>
      <RemoteImage 
      path = {product.image || undefined} 
      fallback= {defaultPizzaImage} 
      style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio:1
  },
  price: {
    fontSize: 18,
    marginTop: 5
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default ProductDetailsScreen;