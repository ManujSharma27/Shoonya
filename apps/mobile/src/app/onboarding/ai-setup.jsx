import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, CheckCircle2, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/theme";

const AI_MODELS = [
  {
    key: "gemini-flash",
    label: "Gemini 2.5 Flash",
    provider: "Google",
    tier: "Free",
    desc: "Fast, smart responses — no cost, no API key needed",
    recommended: true,
  },
  {
    key: "gpt4o-mini",
    label: "GPT-4o Mini",
    provider: "OpenAI",
    tier: "Free",
    desc: "Compact and capable — great for journalling & guidance",
  },
  {
    key: "claude-haiku",
    label: "Claude Haiku",
    provider: "Anthropic",
    tier: "Free",
    desc: "Thoughtful, safe, and reflective responses",
  },
  {
    key: "gemini-pro",
    label: "Gemini 2.5 Pro",
    provider: "Google",
    tier: "Paid",
    desc: "Deep reasoning — best for complex guidance",
  },
  {
    key: "gpt4o",
    label: "GPT-4o",
    provider: "OpenAI",
    tier: "Paid",
    desc: "Most capable GPT — nuanced mentorship",
  },
  {
    key: "claude-sonnet",
    label: "Claude Sonnet 4",
    provider: "Anthropic",
    tier: "Paid",
    desc: "Highest quality — warm and insightful",
  },
];

export default function AISetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState("gemini-flash");
  const [connected, setConnected] = useState(false);

  const connect = () => {
    setConnected(true);
    // In production: initiate OAuth or API key flow
  };

  const freeModels = AI_MODELS.filter((m) => m.tier === "Free");
  const paidModels = AI_MODELS.filter((m) => m.tier === "Paid");

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
          paddingBottom: insets.bottom + 110,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: "center", marginBottom: 28 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: colors.goldDim,
              borderWidth: 1,
              borderColor: colors.border,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Sparkles size={30} color={colors.gold} />
          </View>
          <Text
            style={{
              fontSize: 30,
              fontFamily: fonts.display700,
              color: colors.textPrimary,
              letterSpacing: 0.5,
              marginBottom: 6,
              textAlign: "center",
            }}
          >
            Your AI Mentor
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.sans400,
              color: colors.textSecondary,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            Choose the intelligence that guides you. Start free — upgrade
            anytime.
          </Text>
        </View>

        {/* Free models */}
        <Text
          style={{
            fontSize: 10,
            fontFamily: fonts.sans500,
            color: colors.success,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            marginBottom: 12,
          }}
        >
          Free — No API Key Needed
        </Text>
        {freeModels.map((m) => (
          <TouchableOpacity
            key={m.key}
            onPress={() => setSelected(m.key)}
            style={{
              backgroundColor:
                selected === m.key ? colors.goldDim : colors.bgCard,
              borderWidth: 1.5,
              borderColor:
                selected === m.key ? colors.gold : colors.borderSubtle,
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: fonts.sans600,
                    color: colors.textPrimary,
                    marginRight: 8,
                  }}
                >
                  {m.label}
                </Text>
                {m.recommended && (
                  <View
                    style={{
                      backgroundColor: colors.goldDim,
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 999,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 9,
                        fontFamily: fonts.sans600,
                        color: colors.gold,
                      }}
                    >
                      RECOMMENDED
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: fonts.sans400,
                  color: colors.textMuted,
                  marginBottom: 2,
                }}
              >
                {m.provider}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.sans400,
                  color: colors.textSecondary,
                }}
              >
                {m.desc}
              </Text>
            </View>
            {selected === m.key && (
              <CheckCircle2 size={22} color={colors.gold} fill={colors.gold} />
            )}
          </TouchableOpacity>
        ))}

        {/* Paid models */}
        <Text
          style={{
            fontSize: 10,
            fontFamily: fonts.sans500,
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            marginTop: 16,
            marginBottom: 12,
          }}
        >
          Paid Models — API Key Required
        </Text>
        {paidModels.map((m) => (
          <TouchableOpacity
            key={m.key}
            onPress={() => setSelected(m.key)}
            style={{
              backgroundColor:
                selected === m.key ? colors.goldDim : colors.bgCard,
              borderWidth: 1.5,
              borderColor:
                selected === m.key ? colors.gold : colors.borderSubtle,
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: fonts.sans600,
                  color: colors.textPrimary,
                  marginBottom: 2,
                }}
              >
                {m.label}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: fonts.sans400,
                  color: colors.textMuted,
                  marginBottom: 2,
                }}
              >
                {m.provider}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.sans400,
                  color: colors.textSecondary,
                }}
              >
                {m.desc}
              </Text>
            </View>
            {selected === m.key && (
              <CheckCircle2 size={22} color={colors.gold} fill={colors.gold} />
            )}
          </TouchableOpacity>
        ))}

        {/* Skip note */}
        <Text
          style={{
            fontSize: 11,
            fontFamily: fonts.sans400,
            color: colors.textMuted,
            textAlign: "center",
            marginTop: 12,
          }}
        >
          You can change your AI model anytime from Profile → AI Settings
        </Text>
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
          gap: 10,
        }}
      >
        {!connected ? (
          <TouchableOpacity
            onPress={connect}
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
              <Sparkles size={18} color="#1A0F16" />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.sans600,
                  color: "#1A0F16",
                  marginLeft: 8,
                }}
              >
                Connect {AI_MODELS.find((m) => m.key === selected)?.label}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={{ borderRadius: 14, overflow: "hidden" }}>
            <LinearGradient
              colors={["rgba(94,155,116,0.3)", "rgba(94,155,116,0.2)"]}
              style={{
                paddingVertical: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "rgba(94,155,116,0.5)",
                borderRadius: 14,
              }}
            >
              <CheckCircle2
                size={18}
                color={colors.success}
                fill={colors.success}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: fonts.sans600,
                  color: colors.success,
                  marginLeft: 8,
                }}
              >
                {AI_MODELS.find((m) => m.key === selected)?.label} Connected
              </Text>
            </LinearGradient>
          </View>
        )}

        <TouchableOpacity
          onPress={() => router.push("/onboarding/selfie")}
          style={{
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 14,
            paddingVertical: 14,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.sans500,
              color: colors.textMuted,
            }}
          >
            {connected ? "Continue" : "Skip for now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
