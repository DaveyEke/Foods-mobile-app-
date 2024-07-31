import { StyleSheet , Text , View , Image} from 'react-native';
import Colors from '../../constants/Colors';
import products from '@/assets/data/products';

const product = products[0]


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View>
      <Image 
        source={{ uri : product.image }}
        style={styles.image}
      />
      </View>
     <Text style={styles.title}>{product.name}</Text>
     <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width:'100%' ,
    // height:100,
    aspectRatio: 1,
    borderRadius:20,
   
  },
  container: {
    backgroundColor:'white',
    padding:10,
    borderRadius:20,

  },
  title:{
    fontSize: 18,
    fontWeight:'bold',
    marginVertical:10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  price: {
    fontWeight: 'bold',
    color : Colors.light.tint
  },


  
});
