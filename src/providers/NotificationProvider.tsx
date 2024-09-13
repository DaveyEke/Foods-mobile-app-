import { PropsWithChildren, useState } from "react"
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from '../lib/notifications'
import { ExpoPushToken } from "expo-notifications";
import  * as Notifications from 'expo-notifications'
import { useRef } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthProvider";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const NotificationProvider = ({children} : PropsWithChildren) => {
    const [expoPushToken ,  setExpoPushToken] = useState('');
    const { profile } = useAuth();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
      const notificationListener = useRef<Notifications.Subscription>();
      const responseListener = useRef<Notifications.Subscription>();
    
      const savePushToken = async (newToken: string) => {
       // console.log(newToken)
        setExpoPushToken(newToken);
        if (!newToken) return;
        // update the token in the database
       const { expo_push_token } =  await supabase
        .from("profiles")
        .update({expo_push_token : newToken})
        .eq('id', profile.id)
        
      }

    useEffect(()=>{
        registerForPushNotificationsAsync()
        .then(token => savePushToken(token || ""))
        .catch((error: any) => setExpoPushToken(`${error}`));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
          });
      
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
             console.log(response);
          });
      
          return () => {
            if(notificationListener.current){
                notificationListener.current &&
              Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if(responseListener.current){
                responseListener.current &&
              Notifications.removeNotificationSubscription(responseListener.current);
            }
            
          };
    }, []);
    return <>{children}</>
    
};

export default NotificationProvider;