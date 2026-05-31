import { login } from "@/lib/apiAuth";
import { AppDispatch } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { signin } from "./userSlice";

export type AuthLogin = {
  email: string;
  password: string;
};
export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    async onSuccess(res) {
      const { access_token, refresh_token, deviceId, user } = res.data;
      await SecureStore.setItemAsync("jwt", access_token);
      await SecureStore.setItemAsync("refresh_token", refresh_token);
      await SecureStore.setItemAsync("deviceid", deviceId);
      dispatch(signin(user));
    },
    onError(error: any) {
      const message = error?.response?.data?.message;

      Alert.alert("Error", message || "Something went wrong");
    },
  });

  const { control, handleSubmit } = useForm<AuthLogin>();
  const onError = (errors: any) => {
    const firstErrorKey = Object.keys(errors)[0];
    const firstErrorValue = (Object.values(errors)[0] as any).message;

    Alert.alert(`Error in ${firstErrorKey}`, firstErrorValue);
  };
  const onSubmit = async (data: AuthLogin) => {
    mutate(data);
  };

  return (
    <View>
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email",
          },
        }}
        render={({ field: { value, onChange } }) => (
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#9ca3af"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Email Address"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
          </View>
        )}
      />

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum 6 characters",
          },
        }}
        render={({ field: { value, onChange } }) => (
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#9ca3af"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.inputField, { paddingRight: 40 }]}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              secureTextEntry={showPassword}
            />
            <Pressable
              style={styles.eyeIconBtn}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9ca3af"
              />
            </Pressable>
          </View>
        )}
      />

      {/* Forgot Password */}
      <Pressable
        style={styles.forgotBtn}
        onPress={() =>
          Alert.alert("Reset Password", "A reset link has been simulated.")
        }
      >
        <Text style={styles.forgotText}>Forgot password?</Text>
      </Pressable>

      {/* Submit Action */}
      <Pressable
        style={styles.submitBtnContainer}
        onPress={handleSubmit(onSubmit, onError)}
      >
        <LinearGradient
          colors={["#ec4899", "#a855f7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.submitGradientBtn}
        >
          {isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <View style={styles.submitBtnContent}>
              <Text style={styles.submitBtnText}>Sign In</Text>
              <Ionicons name="arrow-forward-outline" size={18} color="#fff" />
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  /* PROFILE LOGGED IN STYLING */
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 2,
    position: "relative",
  },
  inputIcon: {
    marginRight: 12,
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  eyeIconBtn: {
    position: "absolute",
    right: 16,
    height: "100%",
    justifyContent: "center",
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 24,
    paddingVertical: 4,
  },
  forgotText: {
    fontSize: 12,
    color: "#9333ea",
    fontWeight: "700",
  },
  submitBtnContainer: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  submitGradientBtn: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
});
