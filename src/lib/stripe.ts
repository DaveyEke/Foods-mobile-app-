import { initPaymentSheet , presentPaymentSheet } from "@stripe/stripe-react-native";
import { supabase } from "./supabase"
import { Alert } from "react-native";

const fetchPaymentSheetParams = async (amount : number) => {
   const {data , error} = await supabase.functions.invoke('payment-sheet', {body : {amount} });
   if (data) {
    return data;
   }
   Alert.alert("Error fetching payment sheet params");
   return {};
}
    export const initializePaymentSheet = async (amount: number) => {
        console.log("Initializing Payment Sheet for: " , amount)
        const {paymentIntent , publishableKey} = await fetchPaymentSheetParams(amount);
   
    if (!paymentIntent || !publishableKey) return;

    await initPaymentSheet({
        merchantDisplayName: "Davey.Eke",
        paymentIntentClientSecret : paymentIntent,
        defaultBillingDetails : {
            name : 'Jane Doe',
        },
        returnURL : "https://github.com/DaveyEke" // I left this here just to resolve the stripe error
    })
   
}

export const openPaymentSheet =  async () => {
  const {error} = await presentPaymentSheet();
  if(error){
    Alert.alert(error.message)
    return false;
  }
  return true;
};