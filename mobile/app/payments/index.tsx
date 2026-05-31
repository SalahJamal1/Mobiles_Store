import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

export default function PaymentScreen() {
  const { url } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <ActivityIndicator
          style={{ position: "absolute", top: "50%", left: "50%" }}
        />
      )}

      <WebView
        source={{ uri: String(url) }}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}
