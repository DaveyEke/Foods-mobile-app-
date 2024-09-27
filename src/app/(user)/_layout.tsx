import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Stack, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useAuth } from '@/src/providers/AuthProvider';
import { supabase } from '@/src/lib/supabase';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import { Image } from 'react-native';
import { Alert } from 'react-native';
import { signOutUser } from '@/src/api/sign-out';
import { Session } from "@supabase/supabase-js";
import { Profile } from '@/src/types';
import { useEffect } from 'react';
import { useState } from 'react';
import LoadingAnimation from '@/src/components/loadinganimation';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session  }  = useAuth();
  const [userEmail , setUserEmail] = useState("");
  const [loading, setLoading]  = useState(true);

  useEffect(()=>{
    if (session){
      const fetchUser = async () => {
      const { data : { user}  } = await supabase.auth.getUser()
          setUserEmail(user?.email || "")
      }
      fetchUser()
    } 
  },[session])
 
  const onSignOut = () => {
    signOutUser(true)
  }

  const profileEdit = () => {
    return <Redirect href={'/(user)/modal'}/>
  }

  const moreInfo = () => {
    Alert.alert("More", "Click the edit button to edit profile info.", [
      {
        text: 'Cancel'
      }, 
      {
        text: 'Edit',
        onPress:profileEdit,
      }
    ]);
  }
  const confirmSignOut = () => {
    Alert.alert("Confirm","Are you sure you want to sign out?", [
      {
        text: 'Cancel'
      }, 
      {
        text: 'Sign Out',
        style:'destructive',
        onPress:onSignOut,
      }
    ]);
  };

  
  console.log(userEmail)
  if (!session) {
    return <Redirect href={'/'}  />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>

       <Tabs.Screen name="index" options={{ href: null}} /> 
       <Tabs.Screen name="modal" options={{ href: null}} /> 
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
      // Pixel 8 Pro API TiramisuPrivacySandbox
        name="orders"
        options={{
          headerShown : false,
          title: 'Orders',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />

      <Tabs.Screen
      // Pixel 8 Pro API TiramisuPrivacySandbox
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerTitle : userEmail,
          headerRight: () => (
              <Pressable onPress={confirmSignOut}>
                {({ pressed }) => (
                  <FontAwesome
                    name="sign-out"
                    size={25}
                    color={'red'}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  /> 
                )}
              </Pressable>
          ),
          headerLeft: () => (
            <Pressable onPress={moreInfo}>
              {({ pressed }) => (
                <FontAwesome
                  name="ellipsis-v"
                  size={25}
                  color={'black'}
                  style={{ marginLeft: 30, opacity: pressed ? 0.5 : 1 }}
                /> 
              )}
            </Pressable>
        ),
        }}
      />
    </Tabs>
  );
}
 