import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronRight, Shield } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/theme";

const steps = [
  { n: 1, label: "Review consent & privacy" },
  { n: 2, label: "Connect your AI mentor" },
  { n: 3, label: "Capture your close-up selfie" },
  { n: 4, label: "Birth details for personalization" },
  { n: 5, label: "Voice sample (30 sec+)" },
  { n: 6, label: "Medical & nutrition baseline" },
  { n: 7, label: "Choose your 60-day program" },
  { n: 8, label: "Set privacy preferences" },
];

export default function OnboardingStart() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 32,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 24 }}>
          <Text
            style={{
              fontSize: 36,
              fontFamily: fonts.display700,
              color: colors.textPrimary,
              letterSpacing: 0.5,
              marginBottom: 6,
            }}
          >
            Welcome to Shoonya
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: fonts.sans400,
              color: colors.textSecondary,
              lineHeight: 22,
              marginBottom: 36,
            }}
          >
            Let's personalise your 60-day transformation journey. This takes
            about 10–15 minutes.
          </Text>

          {/* Steps */}
          <View
            style={{
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: fonts.sans600,
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 16,
              }}
            >
              What to expect
            </Text>
            {steps.map((step, i) => (
              <View
                key={step.n}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                  borderBottomWidth: i < steps.length - 1 ? 1 : 0,
                  borderBottomColor: colors.borderSubtle,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: colors.goldDim,
                    borderWidth: 1,
                    borderColor: colors.border,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 14,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: fonts.sans600,
                      color: colors.gold,
                    }}
                  >
                    {step.n}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.sans400,
                    color: colors.textSecondary,
                    flex: 1,
                    lineHeight: 20,
                  }}
                >
                  {step.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Privacy info */}
          <View
            style={{
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              borderRadius: 14,
              padding: 16,
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Shield
              size={16}
              color={colors.gold}
              style={{ marginRight: 10, marginTop: 2 }}
            />
            <Text
              style={{
                fontSize: 13,
                fontFamily: fonts.sans400,
                color: colors.textMuted,
                lineHeight: 20,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.sans600,
                  color: colors.textSecondary,
                }}
              >
                Privacy:{" "}
              </Text>
              You control what your teacher can see. Your data is end-to-end
              encrypted. You can export or delete it anytime.
            </Text>
          </View>
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
          onPress={() => router.push("/onboarding/consent")}
          style={{ borderRadius: 14, overflow: "hidden" }}
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
              Begin Onboarding
            </Text>
            <ChevronRight size={20} color="#1A0F16" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
