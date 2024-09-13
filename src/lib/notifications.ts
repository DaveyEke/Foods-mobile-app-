import { Platform } from "react-native";
import  * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import  Constants  from "expo-constants";
import { supabase } from "./supabase";
import { Tables } from "../database.types";

export async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!');
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError('Project ID not found');
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(pushTokenString);
        return pushTokenString;
      } catch (e: unknown) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError('Must use physical device for push notifications');
    }
  }

  function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  export async function sendPushNotification(expoPushToken: string , title:string , body:string) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title, //'Your Order is on the way!',
      body, // 'I know you are hungry!',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };


const getUserToken = async (userId : string) => {
  const { data }  = await supabase
    .from('profiles')
    .select('*')
    .eq('id' , userId)
    .single();
    
  return data?.expo_push_token;
};

 const dynamicNotif = (status:string) => {
 if (status == "Delivering") {
  return "Your order is on the way!"
 } else if ( status == "Cooking") {
  return "Your order is being cooked"
 } else if ( status == "New") {
  return "Your Order just arrived and its about to be cooked"
 } 
 return "Your order has been Delivered , check in front!"
}

export const notifyUserAboutOrderUpdate = async (order : Tables<'orders'>) => {
  const token =  await getUserToken(order.user_id || "");
  const title = order.status
  console.log(order);
  const body =  dynamicNotif(order.status)
  sendPushNotification(token || "", title , body )
;}

