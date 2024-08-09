import { View, Text , StyleSheet } from 'react-native'
import { Link  } from 'expo-router'
import { useSegments } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import orders from '@/assets/data/orders'
import { Order } from '../types'
import dayjs from 'dayjs'


type OrderListItemProps = {
    order : Order
}

const OrderListItem = ({order}: OrderListItemProps) => {
    const segments = useSegments();
  return (
    <Link href={`../../${segments[1]}/${order.id}`} asChild>
    <Pressable style={styles.container}>
        <Text style={styles.textOrder}>Order #{order.id}</Text>
        <Text style={styles.timeOrder}>{dayjs(order.created_at).hour()} hours ago</Text>
        <Text style={[styles.statusOrder ,{ color : order.status == 'Delivered' ? 'green' : 'darkgoldenrod'}]}>{order.status}</Text>
    </Pressable>
    </Link>
 )
}

const styles = StyleSheet.create({
    container : {
    backgroundColor:'white',
    padding:14,
    borderRadius:20,
    flex: 1,
    maxWidth:'100%',
    position: "relative",
    },
    textOrder: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 8
    },
    timeOrder : {
        paddingLeft: 10,
        paddingBottom: 10,
        color : 'grey',
        fontSize: 15,
        fontWeight: '400'
    },
    statusOrder:{
        fontSize: 20,
        alignSelf: 'flex-end',
        padding: 20,
        paddingTop: 31,
        alignItems:"center",
        position: "absolute",
          
    }, 

})

export default OrderListItem