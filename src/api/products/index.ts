import { supabase } from "@/src/lib/supabase";
import { useQuery , useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";



export const useProductList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const { data , error } = await supabase.from('products').select('*');
          if (error) {
            throw new Error(error.message);
          }
          return data;
        }
      });
}

export const useProduct = (id : number) => {
    return useQuery({
        queryKey: ['products', id],

        queryFn: async () => {
          const { data , error } = await supabase.from('products')
          .select('*')
          .eq('id',id)
          .single();
          if (error) {
            throw new Error(error.message);
          }
          return data;
        }
      });
}

export const useInsertProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data:any){
      const {data : newProduct , error  } = await supabase.from('products').insert({
        name : data.name,
        image: data.image,
        price : data.price
      }).single();
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess () {
      await queryClient.invalidateQueries({ queryKey : ['products'] });
    },
    onError(error){
      Alert.alert("Error", error.message)
    }
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data:any){
      const {data : updatedProduct , error } = await supabase.from('products').update({
        name : data.name,
        image: data.image,
        price : data.price
      }).eq('id', data.id).select().single();
      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    async onSuccess (_ , { id }) {
      await queryClient.invalidateQueries({ queryKey : ['products'] });
      await queryClient.invalidateQueries({ queryKey : ['products', id] });
    },
    onError(error){
      Alert.alert("Error", error.message)
    }
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id : number) {
    const { error } = await supabase.from('products').delete().eq('id', id);
     if (error) {
      Alert.alert("Error", "An unexpected error occured while deleting this product")
     }
    },
     async onSuccess () {
    await queryClient.invalidateQueries({ queryKey : ['products'] });
     } 
  });
}
