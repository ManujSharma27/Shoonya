import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts } from "@/theme";

const { width } = Dimensions.get("window");

const LOGO_URI =
  "https://raw.createusercontent.com/a1b9a89f-6a4b-4720-a6b4-af86040da25c/";

const programs = [
  { name: "Resurrection & Rise", sub: "De-addiction · Nervous system" },
  { name: "Divine Beauty", sub: "Radiance · Nutrition · Self-love" },
  {
    name: "Sex to Superconsciousness",
    sub: "Ojas · Creativity · Transformation",
  },
  { name: "Awakening", sub: "Meditation · Witness · Seva" },
];

export default function LandingPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />

      <View
        style={{
          position: "absolute",
          top: -80,
          left: width / 2 - 140,
          width: 280,
          height: 280,
          borderRadius: 140,
          backgroundColor: "rgba(183,134,82,0.07)",
        }}
        pointerEvents="none"
      />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        {/* Logo block */}
        <View
          style={{ alignItems: "center", paddingTop: 48, paddingBottom: 28 }}
        >
          {/* Shoonya logo */}
          <Image
            source={{ uri: LOGO_URI }}
            style={{ width: 96, height: 96 }}
            contentFit="contain"
            transition={400}
          />

          <Text
            style={{
              fontSize: 54,
              fontFamily: fonts.display700,
              color: colors.textPrimary,
              letterSpacing: 3,
              marginTop: 20,
              marginBottom: 4,
            }}
          >
            Shoonya
          </Text>
          <Text
            style={{
              fontSize: 11,
              fontFamily: fonts.sans400,
              color: colors.gold,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            Divine Algorithm
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              width: 200,
            }}
          >
            <View
              style={{
                flex: 1,
                height: StyleSheet.hairlineWidth,
                backgroundColor: colors.border,
              }}
            />
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: colors.gold,
                marginHorizontal: 8,
              }}
            />
            <View
              style={{
                flex: 1,
                height: StyleSheet.hairlineWidth,
                backgroundColor: colors.border,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.sans400,
              color: colors.textSecondary,
              textAlign: "center",
              lineHeight: 22,
              marginTop: 16,
              paddingHorizontal: 40,
            }}
          >
            60-day guided transformation through yoga, meditation, nutrition &
            consciousness
          </Text>
        </View>

        {/* Program preview grid */}
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            {programs.slice(0, 2).map((p) => (
              <View
                key={p.name}
                style={{
                  flex: 1,
                  backgroundColor: colors.bgCard,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: colors.gold,
                    marginBottom: 12,
                  }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fonts.sans600,
                    color: colors.textPrimary,
                    lineHeight: 18,
                    marginBottom: 4,
                  }}
                >
                  {p.name}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: fonts.sans400,
                    color: colors.textMuted,
                    lineHeight: 16,
                  }}
                >
                  {p.sub}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {programs.slice(2).map((p) => (
              <View
                key={p.name}
                style={{
                  flex: 1,
                  backgroundColor: colors.bgCard,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: colors.gold,
                    marginBottom: 12,
                  }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fonts.sans600,
                    color: colors.textPrimary,
                    lineHeight: 18,
                    marginBottom: 4,
                  }}
                >
                  {p.name}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: fonts.sans400,
                    color: colors.textMuted,
                    lineHeight: 16,
                  }}
                >
                  {p.sub}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 20 }}>
          <TouchableOpacity
            onPress={() => router.push("/onboarding")}
            style={{ borderRadius: 14, overflow: "hidden", marginBottom: 12 }}
          >
            <LinearGradient
              colors={[colors.gold, colors.goldLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingVertical: 18, alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.sans600,
                  color: "#1A0F16",
                  letterSpacing: 0.3,
                }}
              >
                Begin Your Journey
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)")}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 14,
              paddingVertical: 18,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.sans500,
                color: colors.textSecondary,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
