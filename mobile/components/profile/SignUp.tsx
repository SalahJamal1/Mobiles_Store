import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export type CreateUser = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

import { signup } from "@/lib/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { Controller } from "react-hook-form";

export default function SignUp({
  switchAuthTab,
}: {
  switchAuthTab: (tab: "login" | "signup") => void;
}) {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUser>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: () => {
      switchAuthTab("login");
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      Alert.alert("Error", message);
    },
  });
  const onSubmit = async (data: CreateUser) => {
    if (!agreeToTerms) {
      Alert.alert("Error", "You must agree to the terms");
      return;
    }
    mutate(data);
  };

  const password = watch("password");
  const onError = (errors: any) => {
    const firstErrorKey = Object.keys(errors)[0];
    const firstErrorValue = (Object.values(errors)[0] as any).message;

    Alert.alert(`Error in ${firstErrorKey}`, firstErrorValue);
  };

  return (
    <View>
      {/* Full Name */}
      <View style={styles.inputWrapper}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#9ca3af"
          style={styles.inputIcon}
        />

        <Controller
          control={control}
          name="fullName"
          rules={{
            required: "Full name is required",
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputField}
              placeholder="Full Name"
              placeholderTextColor="#9ca3af"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      {/* Email */}
      <View style={styles.inputWrapper}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#9ca3af"
          style={styles.inputIcon}
        />

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
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputField}
              placeholder="Email Address"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      {/* Password */}
      <View style={styles.inputWrapper}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#9ca3af"
          style={styles.inputIcon}
        />

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
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <Ionicons
          name="shield-checkmark-outline"
          size={20}
          color="#9ca3af"
          style={styles.inputIcon}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputField}
              placeholder="Confirm Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      {/* Terms */}
      <Pressable
        style={styles.termsRow}
        onPress={() => setAgreeToTerms(!agreeToTerms)}
      >
        <View
          style={[
            styles.checkBoxCircle,
            agreeToTerms && styles.checkBoxCircleActive,
          ]}
        >
          {agreeToTerms && <Ionicons name="checkmark" size={10} color="#fff" />}
        </View>

        <Text style={styles.termsText}>
          I agree to the <Text style={{ fontWeight: "bold" }}>Terms</Text> &{" "}
          <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>
        </Text>
      </Pressable>

      {/* Submit */}
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
              <Text style={styles.submitBtnText}>Create Account</Text>
              <Ionicons name="rocket-outline" size={18} color="#fff" />
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
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    gap: 8,
  },
  checkBoxCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxCircleActive: {
    backgroundColor: "#9333ea",
    borderColor: "#9333ea",
  },
  termsText: {
    fontSize: 12,
    color: "#6b7280",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
});
