import { StyleSheet , Text , View , Image , FlatList} from 'react-native';
import Colors from '../../../constants/Colors';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { Stack } from 'expo-router';



export default function MenuScreen() {
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




