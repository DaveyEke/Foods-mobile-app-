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
import { Pressable } from 'react-native'
import { OrderStatusList } from '@/src/types'
import Colors from '@/src/constants/Colors'
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders'
import LoadingAnimation from '@/src/components/loadinganimation'
import { notifyUserAboutOrderUpdate } from '@/src/lib/notifications'


const OrderItemScreen = () => {
  const { id : idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  // const order:any = orders.find((o) => o.id.toString() === id);
  const {data: order , isLoading ,error} = useOrderDetails(id);
  const {mutate : updateOrder  } = useUpdateOrder();

  const updateStatus = async (status: string) => {
      updateOrder({ id: id , updatedFields : {status}})
    
    if (order){
      await notifyUserAboutOrderUpdate({...order , status})
    } else {
      Alert.alert("Error" , "Order Undefined")
    }
    
  };
  
  const orderItems = order?.order_items


  if (isLoading){
    return <LoadingAnimation  text="Fetching..."/>
  }

  if (error || !order){
    Alert.alert("Error", "Failed to Fetch")
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
      ListFooterComponent={ ()=> (
        <>
  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        onPress={() => updateStatus(status)}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
</>

      )}
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