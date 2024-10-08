import {  Tables } from '../types' 
import { StyleSheet , Text , View , Image , Pressable} from 'react-native';
import Colors from '../constants/Colors';
import { Link, useSegments } from 'expo-router';
import { Redirect } from 'expo-router';
import RemoteImage from './RemoteImages';
import { supabase } from '../lib/supabase';
import { useColorScheme } from 'react-native';


export const defaultPizzaImage= "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"

type ProductListItemProps = {
    product: Tables<'products'>;
}

const ProductListItem = ({ product }: ProductListItemProps ) => {
  const segments = useSegments();
  console.log(segments);
  return (
    <Link href={`../../${segments[0]}/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
      <RemoteImage 
        path ={product.image || undefined}
        fallback='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'
        style={styles.image}
        resizeMode='contain'
      />
     <Text style={styles.title}>{product.name}</Text>
     <Text style={styles.price}>${product.price}</Text>
    </Pressable>
    </Link>
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
  image: {
    width:'100%' ,
    // height:100,
    aspectRatio: 1,
    borderRadius:20,
    flex: 1
   
  },
  container: {
    backgroundColor: "white",
    padding:10,
    borderRadius:20,
    flex: 1,
    maxWidth:'50%'
  },
  title:{
    fontSize: 18,
    fontWeight:'bold',
    marginVertical:10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  price: {
    fontWeight: 'bold',
    color : Colors.light.tint
  },

  returnText:{
    fontSize: 25,
    fontWeight:'bold'
  }


  
});
