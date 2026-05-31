import { refreshToken } from "@/components/profile/userSlice";
import { refresh } from "@/lib/apiAuth";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
export default function useRefreshTokens() {
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: refresh,
    mutationKey: ["refresh-token"],
    onSuccess: async (res: any) => {
      const { access_token, refresh_token, user } = res.data;
      await SecureStore.setItemAsync("jwt", access_token);
      await SecureStore.setItemAsync("refresh_token", refresh_token);
      dispatch(refreshToken(user));
    },
    onError(err: any) {
      const message = err?.response?.data?.message ?? "Something went wrong";
      Alert.alert("Error", message);
    },
  });
  return { mutate, isPending };
}
