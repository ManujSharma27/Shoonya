import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/theme";

const programs = [
  {
    id: "resurrection-rise",
    name: "Resurrection & Rise",
    accent: "#C4855A",
    tag: "De-addiction · Nervous system · Identity",
    description:
      "Craving mastery, relapse prevention, nervous-system regulation, and identity rebirth. For anyone beginning again.",
  },
  {
    id: "divine-beauty",
    name: "Divine Beauty",
    accent: "#B8906A",
    tag: "Radiance · Nutrition · Self-love",
    description:
      "Sleep, abhyanga, face yoga, hydration, posture, and deep self-love rituals for outer and inner radiance.",
  },
  {
    id: "sex-superconsciousness",
    name: "Sex to Superconsciousness",
    accent: "#8A6BAA",
    tag: "Ojas · Creativity · Conscious relationships",
    description:
      "Ethical sexual-energy transformation, urge awareness, ojas building, and creative life-force channelling.",
  },
  {
    id: "awakening",
    name: "Awakening",
    accent: "#4A9B9A",
    tag: "Meditation · Witness consciousness · Seva",
    description:
      "Meditation depth, self-inquiry, compassion practices, and integration into daily embodied life.",
  },
];

export default function ProgramSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(null);

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
            Step 6 of 7
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
          Choose Your Path
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.sans400,
            color: colors.textSecondary,
            marginBottom: 32,
          }}
        >
          60 days of guided transformation. You can change this later.
        </Text>

        {programs.map((p) => {
          const isSelected = selected === p.id;
          return (
            <TouchableOpacity
              key={p.id}
              onPress={() => setSelected(p.id)}
              style={{
                backgroundColor: isSelected
                  ? colors.bgCardLight
                  : colors.bgCard,
                borderWidth: 1.5,
                borderColor: isSelected ? p.accent : colors.borderSubtle,
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: 14,
              }}
            >
              <View style={{ height: 4, backgroundColor: p.accent }} />
              <View style={{ padding: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  {/* Colored dot instead of emoji */}
                  <View
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 26,
                      backgroundColor: p.accent + "22",
                      borderWidth: 1,
                      borderColor: p.accent + "44",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 14,
                    }}
                  >
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: p.accent,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: fonts.sans600,
                        color: colors.textPrimary,
                        marginBottom: 4,
                      }}
                    >
                      {p.name}
                    </Text>
                    <View
                      style={{
                        backgroundColor: p.accent + "22",
                        borderRadius: 999,
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: fonts.sans500,
                          color: p.accent,
                        }}
                      >
                        {p.tag}
                      </Text>
                    </View>
                  </View>
                  {isSelected && (
                    <CheckCircle2 size={22} color={p.accent} fill={p.accent} />
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fonts.sans400,
                    color: colors.textMuted,
                    lineHeight: 20,
                  }}
                >
                  {p.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Start date */}
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 14,
            padding: 18,
            marginTop: 8,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontFamily: fonts.sans500,
              color: colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 10,
            }}
          >
            Start Date
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: fonts.display600,
              color: colors.textPrimary,
              marginBottom: 4,
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
            }}
          >
            Your 60-day journey begins today
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
          onPress={() => router.push("/onboarding/privacy-controls")}
          disabled={!selected}
          style={{
            borderRadius: 14,
            overflow: "hidden",
            opacity: selected ? 1 : 0.4,
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
