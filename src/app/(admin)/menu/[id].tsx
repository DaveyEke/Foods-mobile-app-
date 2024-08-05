import { View, Text, Image, StyleSheet, Pressable , Alert } from 'react-native'
import { Stack ,useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react'
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Button from '@/src/components/Button';
import Colors from '@/src/constants/Colors';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { router } from 'expo-router';


const sizes: PizzaSize[] = ['S', 'M','L','XL'];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const { addItem } = useCart();

  const [selectedSize , setSelectedSize] = useState<PizzaSize>('M');

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product){
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart')
  };

  if (!product) {
    return <Text>Product not found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen  options={{ title: product.name}}/>
      <Image 
      source={{ uri: product.image || defaultPizzaImage }} 
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