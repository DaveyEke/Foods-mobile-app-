import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
  export type insertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
  export type updateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];


  type Product = Tables<'products'>

  export type Order = Tables<'orders'>

// export type Product = {
//   id: number;
//   image: string | null;
//   name: string;
//   price: number;
// };

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  'New',
  'Cooking',
  'Delivering',
  'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

// export type Order = {
//   id: number;
//   created_at: string;
//   total: number;
//   user_id: string;
//   status: OrderStatus;
//   order_items?:OrderItem[];
//   // original code that's breaking my code "order_items?: OrderItem[];""
//   // edit : the above code wasn't the source of my problem i've fixed it already
// };

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};
