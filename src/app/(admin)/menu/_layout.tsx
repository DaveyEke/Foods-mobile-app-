import { Link , Stack } from "expo-router";
import { Pressable } from 'react-native';
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function MenuStack () {
  return<Stack >
         <Stack.Screen 
          name="index" options={{ title: "Menu" ,  headerRight: () => (
          // Remember to redirect to the create screen
            <Link href="../../(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }} 
          /> 
           
          // Remember to make this a modal screen if you wanna
           <Stack.Screen name="create" options={{ presentation: 'modal' }} /> 
    </Stack>
}
