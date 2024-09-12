import { initPaymentSheet , presentPaymentSheet } from "@stripe/stripe-react-native";
import { supabase } from "./supabase"
import { Alert } from "react-native";
import { useState } from "react";

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
        const {paymentIntent , publishableKey , customer , ephemeralKey , setupIntent} = await fetchPaymentSheetParams(amount);
   
    if (!paymentIntent || !publishableKey) return;

    const result = await initPaymentSheet({
        merchantDisplayName: "Foods",
        setupIntentClientSecret : setupIntent,
        paymentIntentClientSecret : paymentIntent,
        customerId : customer,
        customFlow : true,
        customerEphemeralKeySecret : ephemeralKey,
        defaultBillingDetails : {
            name : 'Jane Doe',
        },
         returnURL : "your-app://stripe-redirect" // I left this here just to resolve the stripe error
    })
   console.log(result);
   
}

export const openPaymentSheet =  async () => {
  const {error} = await presentPaymentSheet();
  if(error){
    Alert.alert(error.message)
    return false; 
  }
  return true; 
};