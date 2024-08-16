import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'

const OrderScreen = () => {
  return (
    <FlatList
      data={orders}
      contentContainerStyle={{ gap: 10 , padding:10 }}
      renderItem={({ item }) => <OrderListItem  order={item} />}
    />
  )
}

const styles =StyleSheet.create({
    text: {
        
    }
})

export default OrderScreen;