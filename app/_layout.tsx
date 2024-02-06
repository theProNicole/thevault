import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider, useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Colors from "../constants/Colors";
import { useColorScheme } from '@/components/useColorScheme';
import PinScreen from './PinScreen';
import ModalScreen from './modal';
import HomeScreen from './(tabs)';
import ProfileScreen from './(tabs)/two';
import CreatePinScreen from './CreatePinScreen';
import { NhostClient, NhostProvider} from '@nhost/react'
import {BlurView} from 'expo-blur'
import { StyleSheet } from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import * as SecureStore from "expo-secure-store"


const nhost = new NhostClient({
  subdomain: "urniikfwxcqxlslpgcyv",
  region: "us-east-1",
  // clientStorageType: "expo-secure-storage",
  // clientStorage: SecureStore
})

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
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
  const Stack = createStackNavigator()

  return (
    <NhostProvider nhost={nhost}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator 
        screenOptions={{
          presentation: 'modal', // Set the presentation mode to modal
        }}
      >
        <Stack.Screen name="(tabs)" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="modal" component={ModalScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="PinScreen" component={PinScreen} options={{ presentation:'transparentModal', headerShown: false}} />  
        <Stack.Screen
        name="CreatePinModal"
        component={CreatePinScreen}
        options={{
          presentation: 'modal', // Show as a modal
          cardStyle: { backgroundColor: 'transparent' }, // Transparent background
          cardOverlayEnabled: true, // Allow overlay over the main screen
          gestureEnabled: true, // Enable swipe gestures to dismiss the modal
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          }),
        }}
      />
      </Stack.Navigator>
    </ThemeProvider>
    </NhostProvider>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
        },
        tabBarBackground: () => (
          <BlurView
            intensity={20}
            style={{
              ...StyleSheet.absoluteFillObject,
              overflow: "hidden",
              backgroundColor: "transparent",
            }}
            />
        )
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="CreatePinScreen"
        component={CreatePinScreen}
        options={{
          title: "What's your mood?",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="camera" size={28} color={color} />
          ),
          
        }}
        
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={28} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
