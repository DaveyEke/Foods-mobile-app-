import { Stack } from "expo-router";

export default function OrderLayout () {
    return<Stack>
         <Stack.Screen name="index" options={{ title: "Orders"}} />
    </Stack>
    
}