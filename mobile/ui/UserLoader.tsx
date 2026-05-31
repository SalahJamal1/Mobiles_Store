import useRefreshTokens from "@/hooks/useRefreshTokens";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function UserLoader() {
  const { mutate, isPending } = useRefreshTokens();

  useEffect(() => {
    const run = async () => {
      const refresh_token = await SecureStore.getItemAsync("refresh_token");
      if (!refresh_token) return;
      mutate();
    };
    run();
  }, []);

  if (isPending) {
    return <ActivityIndicator size="large" color="#000" />;
  }
  return null;
}
