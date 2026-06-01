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

function DarkInput({
  label,
  value,
  onChangeText,
  placeholder,
  optional,
  keyboardType,
  multiline,
}) {
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
        keyboardType={keyboardType || "default"}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
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
          textAlignVertical: multiline ? "top" : "center",
          minHeight: multiline ? 80 : undefined,
        }}
      />
    </View>
  );
}

function RatingRow({ label, value, onChange, activeColor }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 13,
          fontFamily: fonts.sans500,
          color: colors.textSecondary,
          marginBottom: 12,
        }}
      >
        {label}:{" "}
        <Text
          style={{
            color: activeColor || colors.gold,
            fontFamily: fonts.sans600,
          }}
        >
          {value}/10
        </Text>
      </Text>
      <View style={{ flexDirection: "row", gap: 6 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <TouchableOpacity
            key={n}
            onPress={() => onChange(n)}
            style={{
              flex: 1,
              height: 8,
              borderRadius: 4,
              backgroundColor:
                value >= n ? activeColor || colors.gold : colors.bgMuted,
            }}
          />
        ))}
      </View>
    </View>
  );
}

export default function MedicalBaselineScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [energyLevel, setEnergyLevel] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [conditions, setConditions] = useState("");
  const [contraindications, setContraindications] = useState("");
  const [medications, setMedications] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const canProceed = weight && emergencyName && emergencyPhone;

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
            Step 5 of 7
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
          Medical Baseline
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.sans400,
            color: colors.textSecondary,
            marginBottom: 32,
          }}
        >
          Help us personalise your journey safely
        </Text>

        <DarkInput
          label="Weight"
          value={weight}
          onChangeText={setWeight}
          placeholder="e.g. 65 kg"
          keyboardType="decimal-pad"
        />
        <DarkInput
          label="Waist"
          value={waist}
          onChangeText={setWaist}
          placeholder="e.g. 76 cm"
          optional
          keyboardType="decimal-pad"
        />

        <RatingRow
          label="Current Energy Level"
          value={energyLevel}
          onChange={setEnergyLevel}
          activeColor={colors.gold}
        />
        <RatingRow
          label="Sleep Quality"
          value={sleepQuality}
          onChange={setSleepQuality}
          activeColor={colors.success}
        />

        <DarkInput
          label="Known Medical Conditions"
          value={conditions}
          onChangeText={setConditions}
          placeholder="e.g. Diabetes, Hypertension"
          optional
          multiline
        />
        <DarkInput
          label="Contraindications"
          value={contraindications}
          onChangeText={setContraindications}
          placeholder="Any practices you should avoid"
          optional
          multiline
        />
        <DarkInput
          label="Current Medications"
          value={medications}
          onChangeText={setMedications}
          placeholder="List any medications you're taking"
          optional
          multiline
        />

        {/* Emergency Contact */}
        <View
          style={{
            backgroundColor: "rgba(212,136,58,0.12)",
            borderWidth: 1,
            borderColor: "rgba(212,136,58,0.4)",
            borderRadius: 14,
            padding: 16,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.sans600,
              color: colors.warning,
              marginBottom: 16,
            }}
          >
            Emergency Contact
          </Text>
          <DarkInput
            label="Name"
            value={emergencyName}
            onChangeText={setEmergencyName}
            placeholder="Full name"
          />
          <DarkInput
            label="Phone Number"
            value={emergencyPhone}
            onChangeText={setEmergencyPhone}
            placeholder="+91 XXXXXXXXXX"
            keyboardType="phone-pad"
          />
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
          onPress={() => router.push("/onboarding/program-selection")}
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
