import { store } from "@/store/store";
import UserLoader from "@/ui/UserLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-reanimated";
import { Provider } from "react-redux";

LogBox.ignoreLogs(["setLayoutAnimationEnabledExperimental"]);
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
function RootLayoutNav() {
  return (
    <Provider store={store}>
      <ThemeProvider value={DefaultTheme}>
        <QueryClientProvider client={client}>
          <UserLoader />
          <Stack
            screenOptions={{
              title: "",
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="product/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="payments" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
}
