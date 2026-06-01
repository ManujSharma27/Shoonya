import { useLocalSearchParams, useRouter } from "expo-router";
import { Platform, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X } from "lucide-react-native";
import { colors } from "@/theme";

export default function DonateWebView() {
  const { checkoutUrl } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const appUrl = process.env.EXPO_PUBLIC_BASE_URL || "";

  const handleShouldStartLoadWithRequest = (request) => {
    if (appUrl && request.url.startsWith(appUrl)) {
      router.back();
      return false;
    }
    // Redirect donate/success or cancel back to app
    if (
      request.url.includes("/donate/success") ||
      request.url.includes("/donate/cancel")
    ) {
      router.back();
      return false;
    }
    return true;
  };

  if (!checkoutUrl) {
    router.back();
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Close button */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 8,
          paddingHorizontal: 16,
          backgroundColor: colors.bg,
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <X size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: checkoutUrl }}
        style={{ flex: 1 }}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />
    </View>
  );
}
