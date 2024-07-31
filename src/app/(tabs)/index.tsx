import { StyleSheet , Text , View , Image} from 'react-native';
import Colors from '../../constants/Colors';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';



export default function MenuScreen() {
  return
  (
  <View>
    <ProductListItem product={products[0]} />
    <ProductListItem product={products[1]} />
  </View>
  )

}

