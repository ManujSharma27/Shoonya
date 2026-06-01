import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Lock,
  Hourglass,
  X,
  Home,
  Droplets,
  Target,
  Moon,
  Flame,
  Star,
  Sun,
  Music,
} from "lucide-react-native";
import { colors, fonts } from "@/theme";
import { useState } from "react";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const MAP_IMAGE_URI =
  "https://raw.createusercontent.com/9724c060-e39b-437e-b233-cb20aa961af2/";

const MANTRA_MAP_URL = "https://www.youtube.com/watch?v=N4jR1RNypG0";
const MANTRA_PHASE_URL = "https://www.youtube.com/watch?v=Mr_uHJPUlO8";

function MantraLink({ url, style }) {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(url)}
      style={[{ flexDirection: "row", alignItems: "center", gap: 5 }, style]}
      activeOpacity={0.7}
    >
      <Music size={13} color={colors.gold} />
      <Text
        style={{
          fontSize: 13,
          fontFamily: fonts.sans600,
          color: colors.gold,
          textDecorationLine: "underline",
          letterSpacing: 0.3,
        }}
      >
        Mantra
      </Text>
    </TouchableOpacity>
  );
}

// David Hawkins' Map of Consciousness levels
const CONSCIOUSNESS_LEVELS = [
  {
    freq: 1000,
    label: "Enlightenment",
    tier: "light",
    color: "#FFD700",
  },
  { freq: 700, label: "Peace", tier: "light", color: "#A8D5B0" },
  {
    freq: 600,
    label: "Bliss / Joy",
    tier: "light",
    color: "#9ECBA8",
  },
  { freq: 540, label: "Love", tier: "light", color: "#C8D89E" },
  { freq: 500, label: "Reason", tier: "light", color: "#9EC4D8" },
  {
    freq: 400,
    label: "Acceptance",
    tier: "rising",
    color: "#C49EBB",
  },
  {
    freq: 350,
    label: "Willingness",
    tier: "rising",
    color: "#9EB89E",
  },
  {
    freq: 310,
    label: "Neutrality",
    tier: "rising",
    color: "#A0AAB0",
  },
  {
    freq: 250,
    label: "Courage",
    tier: "rising",
    color: "#C8A87E",
  },
  {
    freq: 200,
    label: "— Shift Point —",
    tier: "pivot",
    color: colors.gold,
  },
  { freq: 175, label: "Pride", tier: "heavy", color: "#C8997E" },
  { freq: 150, label: "Anger", tier: "heavy", color: "#B87E6A" },
  { freq: 125, label: "Desire", tier: "heavy", color: "#A07EB8" },
  { freq: 100, label: "Fear", tier: "heavy", color: "#7E8EA0" },
  { freq: 75, label: "Grief", tier: "heavy", color: "#7E9EC8" },
  { freq: 50, label: "Apathy", tier: "heavy", color: "#7E7E7E" },
  { freq: 30, label: "Guilt", tier: "heavy", color: "#6A7878" },
  { freq: 20, label: "Shame", tier: "heavy", color: "#506070" },
];

const phases = [
  {
    name: "Environmental Cleansing",
    days: "1–3",
    status: "completed",
    Icon: Home,
    desc: "Deep cleansing of home, office, car & surroundings. Clear the outer to invite the inner.",
  },
  {
    name: "Body Purification",
    days: "4–7",
    status: "completed",
    Icon: Droplets,
    desc: "Cleansing practices & gentle detox for the physical vessel.",
  },
  {
    name: "Foundation Rhythm",
    days: "8–14",
    status: "active",
    Icon: Target,
    desc: "Establishing your daily practice rhythm & consistency.",
  },
  {
    name: "Inner Silence",
    days: "15–21",
    status: "locked",
    Icon: Moon,
    desc: "Deepening stillness & breath mastery.",
  },
  {
    name: "Emotional Alchemy",
    days: "22–30",
    status: "locked",
    Icon: Flame,
    desc: "Transforming emotional patterns from heavy to light.",
  },
  {
    name: "Deepening Transformation",
    days: "31–45",
    status: "locked",
    Icon: Star,
    desc: "Integration & embodied wisdom.",
  },
  {
    name: "Integration & Independence",
    days: "46–60",
    status: "locked",
    Icon: Sun,
    desc: "Mastery & sustainable, self-directed practice.",
  },
];

function PhaseCard({ phase, isLast }) {
  const isActive = phase.status === "active";
  const isCompleted = phase.status === "completed";
  const isLocked = phase.status === "locked";
  const IconComp = phase.Icon;

  const iconColor = isLocked
    ? colors.textMuted
    : isCompleted
      ? colors.success
      : colors.gold;

  return (
    <View>
      <TouchableOpacity
        activeOpacity={isLocked ? 1 : 0.75}
        style={{
          backgroundColor: isActive ? colors.bgCardLight : colors.bgCard,
          borderWidth: 1,
          borderColor: isActive
            ? colors.gold
            : isCompleted
              ? "rgba(94,155,116,0.4)"
              : colors.borderSubtle,
          borderRadius: 16,
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: isLocked
              ? colors.bgMuted
              : isCompleted
                ? "rgba(94,155,116,0.12)"
                : colors.goldDim,
            borderWidth: 1,
            borderColor: isLocked
              ? colors.borderSubtle
              : isCompleted
                ? "rgba(94,155,116,0.4)"
                : colors.border,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          {isLocked ? (
            <Lock size={20} color={colors.textMuted} />
          ) : (
            <IconComp size={20} color={iconColor} />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: isActive ? colors.goldDim : "transparent",
              borderWidth: isActive ? 1 : 0,
              borderColor: colors.border,
              borderRadius: 999,
              paddingHorizontal: 10,
              paddingVertical: 2,
              alignSelf: "flex-start",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontFamily: fonts.sans500,
                color: isActive ? colors.gold : colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: 1.2,
              }}
            >
              Days {phase.days}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              fontFamily: fonts.sans600,
              color: isLocked ? colors.textMuted : colors.textPrimary,
              marginBottom: 3,
            }}
          >
            {phase.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
              lineHeight: 17,
            }}
          >
            {phase.desc}
          </Text>
          {/* Mantra link for Days 1–3 */}
          {phase.days === "1–3" && (
            <MantraLink url={MANTRA_PHASE_URL} style={{ marginTop: 10 }} />
          )}
        </View>
        {isCompleted && (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.success,
              marginLeft: 10,
            }}
          />
        )}
        {isActive && (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.gold,
              marginLeft: 10,
            }}
          />
        )}
      </TouchableOpacity>
      {!isLast && (
        <View
          style={{
            width: 1,
            height: 20,
            backgroundColor: isCompleted
              ? "rgba(94,155,116,0.4)"
              : colors.borderSubtle,
            marginLeft: 46,
            marginVertical: 2,
          }}
        />
      )}
    </View>
  );
}

function ConsciousnessModal({ visible, onClose }) {
  const insets = useSafeAreaInsets();
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
          backgroundColor: "rgba(0,0,0,0.75)",
        }}
      >
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderWidth: 1,
            borderColor: colors.border,
            maxHeight: SCREEN_HEIGHT * 0.88,
          }}
        >
          {/* Handle */}
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

          {/* Header */}
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
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: fonts.display700,
                  color: colors.textPrimary,
                }}
              >
                Map of Consciousness
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: fonts.sans400,
                  color: colors.textMuted,
                  marginTop: 2,
                }}
              >
                Dr David R. Hawkins · Heavy to Light
              </Text>
              {/* Mantra link — top of modal */}
              <MantraLink url={MANTRA_MAP_URL} style={{ marginTop: 8 }} />
            </View>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Actual Map image */}
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: insets.bottom + 28,
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={{ uri: MAP_IMAGE_URI }}
              style={{
                width: SCREEN_WIDTH - 32,
                height: SCREEN_WIDTH - 32,
                borderRadius: 20,
              }}
              contentFit="contain"
              transition={400}
            />
            <Text
              style={{
                fontSize: 11,
                fontFamily: fonts.sans400,
                color: colors.textMuted,
                textAlign: "center",
                marginTop: 14,
                lineHeight: 17,
              }}
            >
              Scroll to explore · Where are you right now on this path?
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default function RoadmapScreen() {
  const insets = useSafeAreaInsets();
  const [mapOpen, setMapOpen] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [frequencyLog, setFrequencyLog] = useState([
    { freq: 200, label: "Courage", logged: "Day 10  ·  06:42 AM" },
    { freq: 150, label: "Anger", logged: "Day 8   ·  07:15 PM" },
  ]);

  const logFrequency = () => {
    const val = parseInt(frequency);
    if (!val || val < 20 || val > 1000) return;
    const match =
      CONSCIOUSNESS_LEVELS.find((l) => Math.abs(l.freq - val) <= 25) ||
      CONSCIOUSNESS_LEVELS[CONSCIOUSNESS_LEVELS.length - 1];
    const now = new Date();
    const label = `Day 12  ·  ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    setFrequencyLog((prev) => [
      { freq: val, label: match.label, logged: label },
      ...prev,
    ]);
    setFrequency("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />
      <ConsciousnessModal visible={mapOpen} onClose={() => setMapOpen(false)} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 24,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderSubtle,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
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
                marginBottom: 6,
              }}
            >
              Your Roadmap
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.sans400,
                color: colors.textSecondary,
              }}
            >
              60-day journey · 7 transformative phases
            </Text>
          </View>
          {/* Hourglass → Map of Consciousness */}
          <TouchableOpacity
            onPress={() => setMapOpen(true)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.goldDim,
              borderWidth: 1,
              borderColor: colors.border,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 12,
            }}
          >
            <Hourglass size={20} color={colors.gold} />
          </TouchableOpacity>
        </View>

        {/* Frequency logger */}
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 12,
            padding: 14,
            marginTop: 14,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontFamily: fonts.sans500,
              color: colors.gold,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 10,
            }}
          >
            My current frequency
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TextInput
              value={frequency}
              onChangeText={setFrequency}
              placeholder="e.g. 200"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              style={{
                flex: 1,
                backgroundColor: colors.bgMuted,
                borderRadius: 10,
                paddingHorizontal: 14,
                paddingVertical: 10,
                fontSize: 16,
                fontFamily: fonts.sans600,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: colors.borderSubtle,
              }}
            />
            <TouchableOpacity
              onPress={logFrequency}
              style={{
                backgroundColor: colors.goldDim,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 10,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: fonts.sans600,
                  color: colors.gold,
                }}
              >
                Log
              </Text>
            </TouchableOpacity>
          </View>
          {frequencyLog.length > 0 && (
            <View style={{ marginTop: 10, gap: 4 }}>
              {frequencyLog.slice(0, 2).map((f, i) => (
                <View
                  key={i}
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 3,
                      backgroundColor: colors.gold,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: fonts.sans500,
                      color: colors.textSecondary,
                    }}
                  >
                    {f.freq} · {f.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: fonts.sans400,
                      color: colors.textMuted,
                      flex: 1,
                      textAlign: "right",
                    }}
                  >
                    {f.logged}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: insets.bottom + 88,
        }}
        showsVerticalScrollIndicator={false}
      >
        {phases.map((phase, i) => (
          <PhaseCard key={i} phase={phase} isLast={i === phases.length - 1} />
        ))}
      </ScrollView>
    </View>
  );
}
