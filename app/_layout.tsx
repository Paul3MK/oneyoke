import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {
  SplineSans_300Light,
  SplineSans_400Regular,
  SplineSans_600SemiBold,
  SplineSans_700Bold
} from '@expo-google-fonts/spline-sans';
import {
  SplineSansMono_400Regular,
} from '@expo-google-fonts/spline-sans-mono';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { GestureHandlerRootView } from 'react-native-gesture-handler';


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

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false
})

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SplineSans_400Regular,
    SplineSans_600SemiBold,
    SplineSans_700Bold,
    SplineSansMono_400Regular,
    SplineSans_300Light
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

  return (
    <GestureHandlerRootView>
      <ConvexProvider client={convex}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="access_control" options={{ headerShown: false }} />
            {/* <Stack.Screen name="main" options={{ headerShown: false }} /> */}
            <Stack.Screen name="operations" options={{ presentation: "modal", headerShown: false }} />
            <Stack.Screen name="event" options={{ presentation: "modal", headerShown: false }} />
            <Stack.Screen name="(general)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}
