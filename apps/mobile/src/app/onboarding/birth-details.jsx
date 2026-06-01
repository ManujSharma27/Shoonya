import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useState } from "react";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/theme";

function DarkInput({ label, value, onChangeText, placeholder, optional }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 13,
          fontFamily: fonts.sans500,
          color: colors.textSecondary,
          marginBottom: 8,
        }}
      >
        {label}
        {optional && (
          <Text style={{ color: colors.textMuted }}> – Optional</Text>
        )}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={{
          backgroundColor: colors.bgCard,
          borderWidth: 1,
          borderColor: colors.borderSubtle,
          borderRadius: 10,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 16,
          fontFamily: fonts.sans400,
          color: colors.textPrimary,
        }}
      />
    </View>
  );
}

export default function BirthDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [timeOfBirth, setTimeOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const canProceed = dateOfBirth && timeOfBirth && placeOfBirth;

  return (
    <KeyboardAvoidingAnimatedView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior="padding"
    >
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
            Step 3 of 7
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
        keyboardShouldPersistTaps="handled"
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
          Birth Details
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.sans400,
            color: colors.textSecondary,
            marginBottom: 32,
          }}
        >
          For personalised astrological and energetic insights
        </Text>

        <DarkInput
          label="Date of Birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="DD/MM/YYYY"
        />
        <DarkInput
          label="Time of Birth"
          value={timeOfBirth}
          onChangeText={setTimeOfBirth}
          placeholder="HH:MM  (24-hour)"
        />
        <DarkInput
          label="Place of Birth"
          value={placeOfBirth}
          onChangeText={setPlaceOfBirth}
          placeholder="City, State, Country"
        />

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
              Why we ask:{" "}
            </Text>
            We use birth details to personalise meditation times, moon-phase
            practices, and energetic insights. This stays private unless you
            choose to share it with your teacher.
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
          onPress={() => router.push("/onboarding/voice-sample")}
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
    </KeyboardAvoidingAnimatedView>
  );
}
