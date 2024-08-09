import { View, Text , StyleSheet  ,Image } from 'react-native'
import { Link  } from 'expo-router'
import { useSegments } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import orders from '@/assets/data/orders'
import { Order } from '../types'
import dayjs from 'dayjs'
import { OrderItem } from '../types'
import products from '@/assets/data/products'
import { defaultPizzaImage } from './ProductListItem'
import Colors from '../constants/Colors'


type OrderListItemProps = {
    orderItem : OrderItem
}

const OrderItemListItem = ({orderItem}: OrderListItemProps) => {
    const segments = useSegments();
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri : orderItem.products.image || defaultPizzaImage}}
        style={styles.image}
        
      />
      <Text style={styles.nameText}>{orderItem.products.name}</Text>
      <Text style={styles.priceText}>${orderItem.products.price}</Text>
      <Text style={styles.sizeText}>Size: {orderItem.size}</Text>
      <Text style={styles.quantityText}>{orderItem.quantity}</Text>
    </View>
 )
}

const styles = StyleSheet.create({
container : {
    backgroundColor:'white',
    padding:14,
    borderRadius:20,
    flex: 1,
    maxWidth:'100%',
    margin: 10
    },
image : {
    width:'22%' ,
    aspectRatio: 1,
    borderRadius:20,
    flex: 1,
}, 
nameText:{
  position : 'absolute',
  paddingLeft: 105,
  paddingTop: 30,
  fontSize: 17,
  fontWeight:'500'
}, 
priceText : {
  position: 'absolute',
  paddingLeft: 105,
  paddingTop: 57,
  fontSize : 19,
  color : Colors.light.tint,
  fontWeight : 'bold'
},
sizeText : {
  position : 'absolute',
  paddingLeft : 185,
  paddingTop: 60,
},
quantityText : {
  alignSelf : 'flex-end',
  position: 'absolute',
  paddingTop : 45,
  paddingRight : 10,
  fontSize : 20
}
    
          
    

})

export default OrderItemListItem