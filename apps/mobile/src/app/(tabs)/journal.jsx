import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Plus,
  Mic,
  Eye,
  EyeOff,
  Camera,
  Sparkles,
  X,
  Share2,
} from "lucide-react-native";
import { useState } from "react";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/theme";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

const moodOptions = [
  "Peaceful",
  "Energized",
  "Reflective",
  "Grateful",
  "Challenged",
  "Joyful",
];

const entries = [
  {
    id: 1,
    day: 12,
    date: "Today, 31 May",
    mood: "Peaceful",
    preview:
      "A deeper connection emerged during morning meditation. The silence felt luminous, almost tangible...",
    isPrivate: false,
  },
  {
    id: 2,
    day: 11,
    date: "Yesterday, 30 May",
    mood: "Challenged",
    preview:
      "Struggled with cravings but used the breath-lock technique to ground myself into presence...",
    isPrivate: true,
  },
];

const AI_MODES = [
  {
    key: "social",
    label: "Social Media Post",
    desc: "Turn this entry into an inspiring caption",
  },
  {
    key: "book",
    label: "Self-Publishing Book",
    desc: "Draft a book chapter from this entry",
  },
  {
    key: "script",
    label: "Film Script",
    desc: "Write this as a scene or monologue",
  },
];

function AICreatorModal({ visible, text, onClose }) {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState(null);
  const [output, setOutput] = useState("");

  const generate = (m) => {
    setMode(m);
    setOutput(
      `[AI Preview — connect your AI model in Profile to generate real content]\n\nBased on your journal entry:\n\n"${text?.slice(0, 100)}..."\n\nA ${m === "social" ? "social media post" : m === "book" ? "book chapter draft" : "film scene"} will be generated here using your chosen model.`,
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      presentationStyle="overFullScreen"
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.65)",
        }}
      >
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View style={{ alignItems: "center", paddingTop: 12 }}>
            <View
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                backgroundColor: colors.bgMuted,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: colors.borderSubtle,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Sparkles size={18} color={colors.gold} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.sans600,
                  color: colors.textPrimary,
                  marginLeft: 10,
                }}
              >
                AI Create
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setMode(null);
                setOutput("");
                onClose();
              }}
            >
              <X size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={{ padding: 20 }}>
            {!mode ? (
              <>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fonts.sans400,
                    color: colors.textSecondary,
                    marginBottom: 16,
                  }}
                >
                  Transform this journal entry into…
                </Text>
                {AI_MODES.map((m) => (
                  <TouchableOpacity
                    key={m.key}
                    onPress={() => generate(m.key)}
                    style={{
                      backgroundColor: colors.bgCardLight,
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: fonts.sans600,
                        color: colors.textPrimary,
                        marginBottom: 4,
                      }}
                    >
                      {m.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: fonts.sans400,
                        color: colors.textMuted,
                      }}
                    >
                      {m.desc}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.sans400,
                    color: colors.textSecondary,
                    lineHeight: 22,
                    marginBottom: 16,
                  }}
                >
                  {output}
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setMode(null);
                      setOutput("");
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: colors.bgMuted,
                      borderRadius: 10,
                      paddingVertical: 12,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: fonts.sans500,
                        color: colors.textSecondary,
                      }}
                    >
                      Try Another
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: colors.goldDim,
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 10,
                      paddingVertical: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Share2 size={16} color={colors.gold} />
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: fonts.sans600,
                        color: colors.gold,
                      }}
                    >
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          <View style={{ height: insets.bottom + 8 }} />
        </View>
      </View>
    </Modal>
  );
}

export default function JournalScreen() {
  const insets = useSafeAreaInsets();
  const [isWriting, setIsWriting] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selfieUri, setSelfieUri] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);

  const takeSelfie = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      cameraType: ImagePicker.CameraType.front,
    });
    if (!result.canceled) setSelfieUri(result.assets[0].uri);
  };

  return (
    <KeyboardAvoidingAnimatedView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior="padding"
    >
      <StatusBar style="light" />
      <AICreatorModal
        visible={aiOpen}
        text={journalText}
        onClose={() => setAiOpen(false)}
      />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 24,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderSubtle,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 34,
              fontFamily: fonts.display700,
              color: colors.textPrimary,
              letterSpacing: 0.5,
              marginBottom: 4,
            }}
          >
            Journal
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.sans400,
              color: colors.textSecondary,
              marginBottom: 6,
            }}
          >
            Reflect on your transformation
          </Text>
          {/* Affirmations */}
          <Text
            style={{
              fontSize: 10,
              fontFamily: fonts.sans400,
              color: colors.gold,
              lineHeight: 16,
              fontStyle: "italic",
            }}
          >
            I am 100% responsible · I have all that I need · I am the writer &
            director of my story
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsWriting(!isWriting)}
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: isWriting ? colors.bgMuted : colors.goldDim,
            borderWidth: 1,
            borderColor: colors.border,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 12,
          }}
        >
          <Plus size={22} color={colors.gold} />
        </TouchableOpacity>
      </View>

      {isWriting ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 24,
            paddingBottom: insets.bottom + 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: fonts.sans600,
              color: colors.textPrimary,
              marginBottom: 6,
            }}
          >
            Day 12 Entry
          </Text>
          <Text
            style={{
              fontSize: 11,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
              marginBottom: 20,
              fontStyle: "italic",
            }}
          >
            Write, even a volcano vents smoke & dust before the gold & diamonds
            come out…
          </Text>

          {/* Mood */}
          <Text
            style={{
              fontSize: 10,
              fontFamily: fonts.sans500,
              color: colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 10,
            }}
          >
            How are you feeling?
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20, flexGrow: 0 }}
          >
            {moodOptions.map((mood) => (
              <TouchableOpacity
                key={mood}
                onPress={() => setSelectedMood(mood)}
                style={{
                  backgroundColor:
                    selectedMood === mood ? colors.goldDim : colors.bgCard,
                  borderWidth: 1,
                  borderColor:
                    selectedMood === mood ? colors.gold : colors.borderSubtle,
                  borderRadius: 999,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fonts.sans500,
                    color:
                      selectedMood === mood
                        ? colors.gold
                        : colors.textSecondary,
                  }}
                >
                  {mood}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Privacy */}
          <TouchableOpacity
            onPress={() => setIsPrivate(!isPrivate)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              borderRadius: 10,
              padding: 14,
              marginBottom: 16,
            }}
          >
            {isPrivate ? (
              <EyeOff size={18} color={colors.textMuted} />
            ) : (
              <Eye size={18} color={colors.gold} />
            )}
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.sans500,
                color: colors.textSecondary,
                marginLeft: 10,
                flex: 1,
              }}
            >
              {isPrivate
                ? "Private — only you can see this"
                : "Visible to your teacher"}
            </Text>
          </TouchableOpacity>

          {/* Text input */}
          <TextInput
            value={journalText}
            onChangeText={setJournalText}
            placeholder="What arose in your practice today? Insights, resistances, gratitude..."
            placeholderTextColor={colors.textMuted}
            multiline
            style={{
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              borderRadius: 12,
              padding: 16,
              fontSize: 15,
              fontFamily: fonts.sans400,
              color: colors.textPrimary,
              textAlignVertical: "top",
              minHeight: 180,
              marginBottom: 16,
            }}
          />

          {/* Selfie preview */}
          {selfieUri && (
            <View style={{ marginBottom: 16 }}>
              <Image
                source={{ uri: selfieUri }}
                style={{
                  width: "100%",
                  aspectRatio: 1,
                  borderRadius: 12,
                  backgroundColor: colors.bgMuted,
                }}
                contentFit="cover"
              />
              <TouchableOpacity
                onPress={takeSelfie}
                style={{ marginTop: 8, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.sans500,
                    color: colors.gold,
                  }}
                >
                  Retake
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Bottom action row */}
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.borderSubtle,
                borderRadius: 10,
                paddingVertical: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.bgCard,
              }}
            >
              <Mic size={18} color={colors.textMuted} />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: fonts.sans500,
                  color: colors.textSecondary,
                  marginLeft: 8,
                }}
              >
                Voice
              </Text>
            </TouchableOpacity>

            {/* Camera selfie toggle */}
            <TouchableOpacity
              onPress={takeSelfie}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                paddingVertical: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.goldDim,
              }}
            >
              <Camera size={18} color={colors.gold} />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: fonts.sans500,
                  color: colors.gold,
                  marginLeft: 8,
                }}
              >
                Selfie
              </Text>
            </TouchableOpacity>

            {/* AI Create */}
            <TouchableOpacity
              onPress={() => setAiOpen(true)}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "rgba(91,143,185,0.4)",
                borderRadius: 10,
                paddingVertical: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(91,143,185,0.12)",
              }}
            >
              <Sparkles size={18} color={colors.info} />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: fonts.sans500,
                  color: colors.info,
                  marginLeft: 8,
                }}
              >
                AI
              </Text>
            </TouchableOpacity>
          </View>

          {/* Save */}
          <TouchableOpacity style={{ borderRadius: 12, overflow: "hidden" }}>
            <LinearGradient
              colors={[colors.gold, colors.goldLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingVertical: 16, alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.sans600,
                  color: "#1A0F16",
                }}
              >
                Save Entry
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 24,
            paddingBottom: insets.bottom + 88,
          }}
          showsVerticalScrollIndicator={false}
        >
          {entries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={{
                backgroundColor: colors.bgCard,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 16,
                padding: 20,
                marginBottom: 14,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.goldDim,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 999,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: fonts.sans600,
                      color: colors.gold,
                    }}
                  >
                    Day {entry.day}
                  </Text>
                </View>
                {entry.isPrivate && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <EyeOff size={14} color={colors.textMuted} />
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: fonts.sans400,
                        color: colors.textMuted,
                        marginLeft: 5,
                      }}
                    >
                      Private
                    </Text>
                  </View>
                )}
              </View>

              <Text
                style={{
                  fontSize: 11,
                  fontFamily: fonts.sans400,
                  color: colors.textMuted,
                  marginBottom: 6,
                }}
              >
                {entry.date}
              </Text>
              <View
                style={{
                  backgroundColor: colors.bgMuted,
                  borderRadius: 999,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  alignSelf: "flex-start",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.sans500,
                    color: colors.textSecondary,
                  }}
                >
                  {entry.mood}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.sans400,
                  color: colors.textSecondary,
                  lineHeight: 20,
                }}
              >
                {entry.preview}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </KeyboardAvoidingAnimatedView>
  );
}
