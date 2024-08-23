import { supabase } from "@/src/lib/supabase"
import { useQuery , useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import { useAuth } from "@/src/providers/AuthProvider";
import { insertTables } from "@/src/types";



export const useInsertOrderItems = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    
    return useMutation({
      async mutationFn(items: insertTables<'order_items'>[]){
        const {data : newOrder , error  } = await supabase
        .from('order_items')
        .insert(items)
        .select()
        if (error) {
          throw new Error(error.message);
        }
        return newOrder;
      },
      onError(error){
        Alert.alert("Error", error.message)
      }
    })
  }
