import { createContext, useContext , PropsWithChildren, useState} from 'react';
import { CartItem } from '../types';
import { randomUUID } from 'expo-crypto';
import { Tables } from '../database.types';
import { Alert } from 'react-native';
import { useInsertOrder } from '../api/orders';
import { router, Router } from 'expo-router';
import { useInsertOrderItems } from '../api/order-item';
import { initializePaymentSheet } from '../lib/stripe';
import { openPaymentSheet } from '../lib/stripe';
import LoadingAnimation from '../components/loadinganimation';

type Product = Tables<'products'>

type CartType= {
    items: CartItem[],
    addItem:(product: Product , size: CartItem['size']) => void;
    updateQuantity: (itemId: string , amount: -1 | 1) => void ;
    total: number,
    checkout: () => void
  }

  
const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity : () => {},
    total: 0, 
    checkout : () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {

    const { mutate : insertOrder , isSuccess } = useInsertOrder();
    const { mutate: insertOrderItems } = useInsertOrderItems();

    const [ items , setItems]  =useState<CartItem[]>([]);    const addItem = (product: Product , size:CartItem['size']) => {
        // if already in  cart , increment quantity 
        const existingItem = items.find((item)=> item.product === product && item.size === size);

        if (existingItem){
           updateQuantity(existingItem.id , 1) 
           return;
        }

        const newCartItem: CartItem = {
            id : randomUUID(),
            product,
            size,
            quantity:1,
            product_id: product.id,
        }

        setItems([newCartItem, ...items]);
    }
    // dont forget to add UpdateQuantity
    const updateQuantity = (itemId: string , amount: -1 | 1) => {
         setItems(
            items.map((item) => 
                item.id !== itemId ? item : {...item , quantity: item.quantity + amount }
             ).filter((item) => item.quantity > 0)
         )
    };

    const total = items.reduce((sum , item) => (sum += item.product.price * item.quantity), 0) ; // Remember to do this Dave

    const clearCart = () => {
        setItems([])
    }

    const checkout = async () => {
        await initializePaymentSheet(Math.floor(total * 100))
        const payed = await openPaymentSheet();
        if (!payed) return;
        insertOrder({ total } , {
           onSuccess : saveOrderItems,
        }) 
    }

    const saveOrderItems = (order : Tables<'orders'>) => {

        const orderItems = items.map((cartItem)=>({
            order_id : order.id,
            product_id : cartItem.product_id,
            quantity : cartItem.quantity,
            size : cartItem.size
        }))

        insertOrderItems(
            orderItems , 
            {
                onSuccess () {
                    Alert.alert("Success!")
                clearCart();
                router.push(`/(user)/orders/${order.id}`);
                }
            }
        )

        
    }

    return (
        <CartContext.Provider value={{ items, addItem , updateQuantity, total , checkout }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);