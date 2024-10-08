import { View, Text, FlatList,  } from 'react-native'
import { Platform } from 'react-native'
import { StatusBar} from 'expo-status-bar';
import React from 'react'
import { useCart } from '../providers/CartProvider';
import { CartItem } from '../types';
import { useInsertOrder } from '../api/orders';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';
import LoadingAnimation from '../components/loadinganimation';




const CartScreen = () => {
    const { items , total , checkout ,loading} = useCart();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
      data={items}
      renderItem={({item }) => <CartListItem  cartItem={item}/>}
      contentContainerStyle={{ padding: 10, gap:10 }}
      />
  <Text style={{ marginTop:20 ,fontSize:20, fontWeight:'500'}}> Total : ${total.toFixed(4)}</Text>
    <Button onPress={checkout} disabled={loading != false} text={ loading == true ? "Fetching Payment Sheet..." : "Checkout"}/>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen;