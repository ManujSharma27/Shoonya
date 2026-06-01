import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  AlertCircle,
} from "lucide-react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/theme";
import { useProfileStore } from "@/utils/useProfileStore";

export default function SelfieScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selfie, setSelfie] = useState(null);
  const { setSelfie: saveToStore } = useProfileStore();

  const takeSelfie = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      cameraType: ImagePicker.CameraType.front,
    });
    if (!result.canceled) setSelfie(result.assets[0].uri);
  };

  const handleContinue = async () => {
    if (selfie) await saveToStore(selfie);
    router.push("/onboarding/birth-details");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />

      {/* Nav */}
      <View
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 24,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderSubtle,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.sans500,
              color: colors.textMuted,
            }}
          >
            Step 2 of 7
          </Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: fonts.display700,
            color: colors.textPrimary,
            letterSpacing: 0.5,
            marginBottom: 6,
          }}
        >
          Your Selfie
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.sans400,
            color: colors.textSecondary,
            marginBottom: 28,
          }}
        >
          This becomes your profile picture and tracks your transformation
        </Text>

        {/* Guidelines */}
        <View
          style={{
            backgroundColor: "rgba(212,136,58,0.12)",
            borderWidth: 1,
            borderColor: "rgba(212,136,58,0.4)",
            borderRadius: 14,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <AlertCircle size={18} color={colors.warning} />
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.sans600,
                color: colors.warning,
                marginLeft: 8,
              }}
            >
              Important Guidelines
            </Text>
          </View>
          {[
            "No glasses or contact lenses",
            "No makeup or filters",
            "Real close-up of your face",
            "Good lighting, neutral expression",
            "Same spot · same time · same light every day",
          ].map((g) => (
            <Text
              key={g}
              style={{
                fontSize: 13,
                fontFamily: fonts.sans400,
                color: colors.textSecondary,
                lineHeight: 22,
              }}
            >
              · {g}
            </Text>
          ))}
        </View>

        {/* Camera area */}
        {selfie ? (
          <View style={{ marginBottom: 20 }}>
            <Image
              source={{ uri: selfie }}
              style={{
                width: "100%",
                aspectRatio: 1,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: colors.gold,
              }}
              contentFit="cover"
            />
            <TouchableOpacity
              onPress={takeSelfie}
              style={{
                marginTop: 12,
                borderWidth: 1,
                borderColor: colors.borderSubtle,
                borderRadius: 10,
                paddingVertical: 12,
                alignItems: "center",
                backgroundColor: colors.bgCard,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.sans500,
                  color: colors.textSecondary,
                }}
              >
                Retake Photo
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={takeSelfie}
            style={{
              width: "100%",
              aspectRatio: 1,
              borderRadius: 16,
              backgroundColor: colors.bgCard,
              borderWidth: 2,
              borderColor: colors.border,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: colors.goldDim,
                borderWidth: 1,
                borderColor: colors.border,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <Camera size={36} color={colors.gold} />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.sans600,
                color: colors.textPrimary,
              }}
            >
              Take Selfie
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: fonts.sans400,
                color: colors.textMuted,
                marginTop: 4,
              }}
            >
              Tap to open front camera
            </Text>
          </TouchableOpacity>
        )}

        {/* Why */}
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 14,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
              lineHeight: 20,
            }}
          >
            <Text
              style={{ fontFamily: fonts.sans600, color: colors.textSecondary }}
            >
              Why we collect this:{" "}
            </Text>
            Your selfie becomes your profile picture and tracks visible
            transformation — radiance, vitality, and presence — from Day 1 to
            Day 60.
          </Text>
        </View>
      </ScrollView>

      {/* CTA */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 16,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: colors.borderSubtle,
          backgroundColor: colors.bg,
        }}
      >
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selfie}
          style={{
            borderRadius: 14,
            overflow: "hidden",
            opacity: selfie ? 1 : 0.4,
          }}
        >
          <LinearGradient
            colors={[colors.gold, colors.goldLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.sans600,
                color: "#1A0F16",
                marginRight: 8,
              }}
            >
              Continue
            </Text>
            <ChevronRight size={20} color="#1A0F16" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
