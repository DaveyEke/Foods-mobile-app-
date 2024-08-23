import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'
import { Alert } from 'react-native'
import OrderListItem from '@/src/components/OrderListItem'
import { OrderStatus } from '@/src/types'
import { FlatList } from 'react-native'
import { Order } from '@/src/types'
import products from '@/assets/data/products'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import { useOrderDetails } from '@/src/api/orders'
import LoadingAnimation from '@/src/components/loadinganimation'
import { useUpdateOrderSubscription } from '@/src/api/orders/subscriptions'


const OrderItemScreen = () => {
  const { id : idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  // const order:any = orders.find((o) => o.id.toString() === id);
  const {data: order , isLoading ,error} = useOrderDetails(id);
  useUpdateOrderSubscription(id);
 
  const orderItems = order?.order_items

  if (isLoading){
    return <LoadingAnimation  text="Fetching..."/>
  }

  if (error){
    Alert.alert("Error", error.message)
  }

  return (
    <>
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order == undefined ? 'No ID' : order.id}`}}/>
      <OrderListItem order={order} />
    </View>
    <FlatList 
      data={orderItems}
      renderItem={({ item })=><OrderItemListItem orderItem={item} />}
    />
    </>
  )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor:'white',
  borderRadius:20,
  maxHeight: '15%',
  margin : 10
  

 }
})

export default OrderItemScreen