import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChevronLeft,
  ChevronRight,
  Mic,
  Square,
  PlayCircle,
  AlertCircle,
} from "lucide-react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/theme";

export default function VoiceSampleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingUri, setRecordingUri] = useState(null);

  useEffect(() => {
    let interval;
    if (isRecording)
      interval = setInterval(() => setRecordingDuration((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Microphone permission is required");
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    setRecordingUri(recording.getURI());
    setRecording(null);
  };

  const fmtTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const canProceed = recordingUri && recordingDuration >= 30;

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
            Step 4 of 7
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
          Voice Sample
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.sans400,
            color: colors.textSecondary,
            marginBottom: 24,
          }}
        >
          Record at least 30 seconds of your voice
        </Text>

        {/* Prompt */}
        <View
          style={{
            backgroundColor: "rgba(91,143,185,0.12)",
            borderWidth: 1,
            borderColor: "rgba(91,143,185,0.4)",
            borderRadius: 14,
            padding: 16,
            marginBottom: 28,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.sans600,
              color: colors.info,
              marginBottom: 6,
            }}
          >
            What to say
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.sans400,
              color: colors.textSecondary,
              lineHeight: 20,
            }}
          >
            Speak naturally about your intention for this journey, what you hope
            to transform, or simply introduce yourself. No right or wrong
            answer.
          </Text>
        </View>

        {/* Recorder */}
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 16,
            padding: 36,
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 56,
              fontFamily: fonts.sans600,
              color: isRecording
                ? colors.error
                : recordingUri
                  ? colors.success
                  : colors.textPrimary,
              marginBottom: 28,
              letterSpacing: 2,
            }}
          >
            {fmtTime(recordingDuration)}
          </Text>

          {/* Idle button */}
          {!isRecording && !recordingUri && (
            <TouchableOpacity
              onPress={startRecording}
              style={{
                width: 84,
                height: 84,
                borderRadius: 42,
                backgroundColor: colors.goldDim,
                borderWidth: 2,
                borderColor: colors.gold,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Mic size={38} color={colors.gold} />
            </TouchableOpacity>
          )}

          {/* Recording — stop */}
          {isRecording && (
            <TouchableOpacity
              onPress={stopRecording}
              style={{
                width: 84,
                height: 84,
                borderRadius: 42,
                backgroundColor: "rgba(196,80,104,0.2)",
                borderWidth: 2,
                borderColor: colors.error,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Square size={36} color={colors.error} fill={colors.error} />
            </TouchableOpacity>
          )}

          {/* Saved — success + re-record */}
          {recordingUri && !isRecording && (
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 42,
                  backgroundColor: "rgba(94,155,116,0.2)",
                  borderWidth: 2,
                  borderColor: colors.success,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <PlayCircle size={38} color={colors.success} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setRecordingUri(null);
                  setRecordingDuration(0);
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.sans500,
                    color: colors.gold,
                  }}
                >
                  Re-record
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Under-30s warning */}
        {recordingUri && recordingDuration < 30 && (
          <View
            style={{
              backgroundColor: "rgba(212,136,58,0.12)",
              borderWidth: 1,
              borderColor: "rgba(212,136,58,0.4)",
              borderRadius: 12,
              padding: 14,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <AlertCircle
              size={18}
              color={colors.warning}
              style={{ marginRight: 10, marginTop: 2 }}
            />
            <Text
              style={{
                fontSize: 13,
                fontFamily: fonts.sans400,
                color: colors.textSecondary,
                flex: 1,
              }}
            >
              Please record at least 30 seconds. You recorded{" "}
              {recordingDuration}s.
            </Text>
          </View>
        )}

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
            Your voice carries energetic signatures. We use it for voice
            journalling and to track tonal shifts that reflect inner
            transformation.
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
          onPress={() => router.push("/onboarding/medical-baseline")}
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
