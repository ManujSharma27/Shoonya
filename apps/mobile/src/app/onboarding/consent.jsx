import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/theme";

const consents = [
  {
    key: "terms",
    title: "Terms of Service",
    body: "I understand and agree to Shoonya's terms of service, including program guidelines, community standards, and teacher–student relationship ethics.",
    accent: colors.gold,
    bg: colors.goldDim,
    border: colors.border,
  },
  {
    key: "privacy",
    title: "Privacy Policy",
    body: "I agree to Shoonya's privacy policy. My data is encrypted and under my control. I can export or delete it anytime, and I choose what my teacher can see.",
    accent: colors.info,
    bg: "rgba(91,143,185,0.15)",
    border: "rgba(91,143,185,0.4)",
  },
  {
    key: "medical",
    title: "Medical Disclaimer",
    body: "I understand Shoonya is not a medical device and does not diagnose or treat. I will consult qualified clinicians for health concerns. Practices like intensive fasting or advanced pranayama require prior medical clearance.",
    accent: colors.warning,
    bg: "rgba(212,136,58,0.12)",
    border: "rgba(212,136,58,0.4)",
  },
];

export default function ConsentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [agreed, setAgreed] = useState({
    terms: false,
    privacy: false,
    medical: false,
  });
  const canProceed = Object.values(agreed).every(Boolean);

  const toggle = (key) => setAgreed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />

      {/* Nav bar */}
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
            Step 1 of 7
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
          Consent & Safety
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.sans400,
            color: colors.textSecondary,
            marginBottom: 32,
          }}
        >
          Please review and agree to all three to continue
        </Text>

        {consents.map((c) => (
          <TouchableOpacity
            key={c.key}
            onPress={() => toggle(c.key)}
            style={{
              backgroundColor: agreed[c.key] ? c.bg : colors.bgCard,
              borderWidth: 1,
              borderColor: agreed[c.key] ? c.accent : colors.borderSubtle,
              borderRadius: 16,
              padding: 20,
              marginBottom: 14,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.sans600,
                    color: colors.textPrimary,
                    marginBottom: 8,
                  }}
                >
                  {c.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.sans400,
                    color: colors.textSecondary,
                    lineHeight: 21,
                  }}
                >
                  {c.body}
                </Text>
              </View>
              <CheckCircle2
                size={26}
                color={agreed[c.key] ? c.accent : colors.textMuted}
                fill={agreed[c.key] ? c.accent : "transparent"}
              />
            </View>
          </TouchableOpacity>
        ))}
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
          onPress={() => router.push("/onboarding/ai-setup")}
          disabled={!canProceed}
          style={{
            borderRadius: 14,
            overflow: "hidden",
            opacity: canProceed ? 1 : 0.4,
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
