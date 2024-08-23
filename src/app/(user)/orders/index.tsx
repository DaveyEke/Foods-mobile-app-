import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import OrderListItem from '@/src/components/OrderListItem'
import { useUserOrderList } from '@/src/api/orders'
import { Alert } from 'react-native'
import { ActivityIndicator } from 'react-native'


const OrderScreen = () => {

  function LoadingAnimation() {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" style={styles.indicator}/>
        <Text style={styles.indicatorText}>{`Fetching Orders....`}</Text>
      </View>
    );
  }
  const { data : orders , isLoading , error } =  useUserOrderList();

  if (isLoading){
    return <LoadingAnimation />
  }

  if (error){
    Alert.alert("Error", error.message)
  }
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
        
    },
    indicatorWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    indicator: {},
    indicatorText: {
      fontSize: 18,
      marginTop: 12,
    },
})

export default OrderScreen;