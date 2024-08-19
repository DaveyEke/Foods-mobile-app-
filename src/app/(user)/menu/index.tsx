import { StyleSheet , Text , View , Image , FlatList} from 'react-native';
import Colors from '../../../constants/Colors';
// import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { supabase } from '@/src/lib/supabase';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';
import { useProductList } from '@/src/api/products';


export default function MenuScreen() {

const { data : products ,  error, isLoading } = useProductList();

 if (isLoading) {
  return <ActivityIndicator />;
 }
 if (error) {
  Alert.alert("Error","Failed to fetch products")
 }

  return (
      <FlatList 
        data={products}
        renderItem={({ item })=> <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10 , padding:10 }}
        columnWrapperStyle={{ gap:10 }}
      />
  )
  
}




