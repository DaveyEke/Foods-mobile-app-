import { StyleSheet , Text , View , Image , FlatList} from 'react-native';
import Colors from '../../../constants/Colors';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { Stack } from 'expo-router';
import { useProductList } from '@/src/api/products';
import { ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';
import { RefreshControl } from 'react-native';
import React from 'react';



export default function MenuScreen() {
  const { data : products ,  error, isLoading } = useProductList();


 if (isLoading) {
  return <ActivityIndicator />;
 }

 if (error) {
  Alert.alert("Error","Failed to fetch products")
 }

  return(
      <>
      <Stack.Screen options={{ title: 'Menu'}} />
      <FlatList 
        data={products}
        renderItem={({ item })=> <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10 , padding:10 }}
        columnWrapperStyle={{ gap:10 }} 
      />
      </>
  )
  
}




