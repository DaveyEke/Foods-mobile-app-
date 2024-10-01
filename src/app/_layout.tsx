import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import CartProvider from '../providers/CartProvider';
import AuthProvider from '../providers/AuthProvider';
import { useColorScheme } from '@/src/components/useColorScheme';
import QueryProvider from '../providers/QueryProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import NotificationProvider from '../providers/NotificationProvider';
import { PaperProvider } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme , MD3DarkTheme , adaptNavigationTheme} from 'react-native-paper';
import { PaperColors } from '@/src/constants/PaperColors'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import merge from "deepmerge";


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  
  

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
const customDarkTheme = { ...MD3DarkTheme, colors: PaperColors.dark };
const customLightTheme = { ...DefaultTheme, colors: PaperColors.light };
const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);
const paperTheme =
  colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}>
      <AuthProvider>
      <QueryProvider>
      <NotificationProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
          <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
          <Stack.Screen name="(auth)" options={{ headerShown:false }} />
          <Stack.Screen name="index" options={{ headerShown:false }} />
          <Stack.Screen name="next" options={{ headerShown:false }} />
        </Stack>
      </CartProvider>
      </NotificationProvider>
      </QueryProvider>
      </AuthProvider>
      </StripeProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
