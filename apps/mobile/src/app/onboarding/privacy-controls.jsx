import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, Check, Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/theme";

export default function PrivacyControlsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [teacherJournal, setTeacherJournal] = useState(true);
  const [teacherMedical, setTeacherMedical] = useState(true);

  const controls = [
    {
      key: "journal",
      label: "Journal Entries",
      sub: "Allow teacher to view your reflections and entries",
      val: teacherJournal,
      set: setTeacherJournal,
    },
    {
      key: "medical",
      label: "Medical Reports & Metrics",
      sub: "Allow teacher to view your health data",
      val: teacherMedical,
      set: setTeacherMedical,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />

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
            Step 7 of 7
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
          Privacy Controls
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.sans400,
            color: colors.textSecondary,
            marginBottom: 32,
          }}
        >
          You control exactly what your teacher can see
        </Text>

        {/* Toggle cards */}
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          {controls.map((c, i) => (
            <View
              key={c.key}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 18,
                borderBottomWidth: i < controls.length - 1 ? 1 : 0,
                borderBottomColor: colors.borderSubtle,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  flex: 1,
                  marginRight: 16,
                }}
              >
                <View style={{ marginRight: 12, marginTop: 2 }}>
                  {c.val ? (
                    <Eye size={18} color={colors.gold} />
                  ) : (
                    <EyeOff size={18} color={colors.textMuted} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: fonts.sans600,
                      color: colors.textPrimary,
                      marginBottom: 3,
                    }}
                  >
                    {c.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: fonts.sans400,
                      color: colors.textMuted,
                      lineHeight: 17,
                    }}
                  >
                    {c.sub}
                  </Text>
                </View>
              </View>
              <Switch
                value={c.val}
                onValueChange={c.set}
                trackColor={{ false: colors.bgMuted, true: colors.goldDim }}
                thumbColor={c.val ? colors.gold : colors.textMuted}
              />
            </View>
          ))}
        </View>

        {/* Info boxes */}
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 14,
            padding: 16,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.sans600,
              color: colors.textSecondary,
              marginBottom: 8,
            }}
          >
            Always visible to teacher
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
              lineHeight: 20,
            }}
          >
            · Program progress, streaks, completion rates{"\n"}· Activity logs
            and schedule adherence{"\n"}· Live session attendance
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 14,
            padding: 16,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.sans600,
              color: colors.textSecondary,
              marginBottom: 8,
            }}
          >
            Always private
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
              lineHeight: 20,
            }}
          >
            · Your selfie and voice sample{"\n"}· Birth details (unless you
            share explicitly)
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.goldDim,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 14,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.sans400,
              color: colors.textSecondary,
              lineHeight: 20,
            }}
          >
            <Text style={{ fontFamily: fonts.sans600, color: colors.gold }}>
              Your data, your choice.{" "}
            </Text>
            You can change these settings anytime from your Profile. Export or
            delete your data whenever you want.
          </Text>
        </View>
      </ScrollView>

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
          onPress={() => router.replace("/(tabs)")}
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
            <Check size={20} color="#1A0F16" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.sans600,
                color: "#1A0F16",
              }}
            >
              Begin My Journey
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
