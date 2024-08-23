import { supabase } from "@/src/lib/supabase"
import { useQuery , useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import { useAuth } from "@/src/providers/AuthProvider";
import { insertTables } from "@/src/types";
import { updateTables } from "@/src/types";



export const useAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];
    return useQuery({
        queryKey : ['orders' , { archived }],
        queryFn : async () => {
            const { data , error } =  await supabase
            .from('orders')
            .select('*')
            .in('status', statuses)
            .order('created_at', { ascending : false})
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};
export const useUserOrderList = () => {
    const { session } = useAuth(); 
    const id = session?.user.id
    return useQuery({
        queryKey : ['orders' , { userId : id}],
        queryFn : async () => {
            if (!id){
                return null;
            }
            const { data , error } =  await supabase.from('orders')
            .select('*')
            .eq('user_id', id)
            .order('created_at', { ascending : false})
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useOrderDetails = (id : number) => {
    return useQuery({
        queryKey: ['orders', id],

        queryFn: async () => {
          const { data , error } = await supabase.from('orders')
          .select('* , order_items(* , products(*))' )
          .eq('id',id)
          .single();
          if (error) {
            throw new Error(error.message);
          }
          return data;
        }
      });
}

export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();

    const userId = session?.user.id
    
    return useMutation({
      async mutationFn(data: insertTables<'orders'>){
        const {data : newOrder , error  } = await supabase
        .from('orders')
        .insert({ ...data , user_id  : userId })
        .select()
        .single();
        if (error) {
          throw new Error(error.message);
        }
        return newOrder;
      },
      async onSuccess () {
        await queryClient.invalidateQueries({ queryKey : ['orders'] });
      },
      onError(error){
        Alert.alert("Error", error.message)
      }
    })
  }

  export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
      async mutationFn({
        id ,
        updatedFields
      }:{
      id : number
       updatedFields :  updateTables<'orders'>
      }){
        const {data : updatedOrder, error } = await supabase.from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();
        if (error) {
          throw new Error(error.message);
        }
        return updatedOrder;
      },
      async onSuccess (_ , { id }) {
        await queryClient.invalidateQueries({ queryKey : ['orders'] });
        await queryClient.invalidateQueries({ queryKey : ['orders', id] });
      },
      onError(error){
        Alert.alert("Error", error.message)
      }
    })
  }
  