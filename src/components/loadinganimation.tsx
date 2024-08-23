import { ActivityIndicator } from "react-native";
import { StyleSheet , Text , View} from "react-native";


type LoadingAnimationProps = {
  text : string
}

 const LoadingAnimation  = ({ text } : LoadingAnimationProps)  => {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large"/>
        <Text style={styles.indicatorText}>{`${text}`}</Text>
      </View>
    );
  }


  const styles = StyleSheet.create({
    indicatorWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      indicatorText: {
        fontSize: 18,
        marginTop: 12,
      },
  })

  export default LoadingAnimation;