import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Flame,
  BellOff,
  Send,
  Sparkles,
  X,
  Brain,
  Wind,
  Utensils,
  BookOpen,
  Home,
  Activity,
} from "lucide-react-native";
import { useState } from "react";
import { colors, fonts } from "@/theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Activity type → lucide icon + color
const activityIcon = {
  meditation: { Icon: Brain, color: "#9B8FC4" },
  asana: { Icon: Activity, color: colors.success },
  pranayama: { Icon: Wind, color: colors.info },
  nutrition: { Icon: Utensils, color: "#F7A847" },
  journal: { Icon: BookOpen, color: colors.gold },
  cleanse: { Icon: Home, color: colors.textSecondary },
};

const INIT_ACTIVITIES = [
  {
    id: 1,
    time: "05:30",
    name: "Morning Meditation",
    duration: "20 min",
    completed: true,
    type: "meditation",
    rating: 8,
  },
  {
    id: 2,
    time: "06:00",
    name: "Surya Namaskar",
    duration: "15 min",
    completed: true,
    type: "asana",
    rating: 7,
  },
  {
    id: 3,
    time: "07:00",
    name: "Pranayama Practice",
    duration: "10 min",
    completed: false,
    type: "pranayama",
    rating: null,
  },
  {
    id: 4,
    time: "08:00",
    name: "Breakfast & Nutrition",
    duration: "5 min",
    completed: false,
    type: "nutrition",
    rating: null,
  },
  {
    id: 5,
    time: "20:00",
    name: "Evening Reflection",
    duration: "15 min",
    completed: false,
    type: "journal",
    rating: null,
  },
];

// ── Rating widget ────────────────────────────────────────────────────────────
function RatingPicker({ value, onChange }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          fontSize: 9,
          fontFamily: fonts.sans500,
          color: colors.textMuted,
          marginBottom: 4,
        }}
      >
        SCORE
      </Text>
      <View style={{ flexDirection: "row", gap: 3 }}>
        {[...Array(5)].map((_, i) => {
          const score = (i + 1) * 2;
          const active = value !== null && value >= score;
          return (
            <TouchableOpacity
              key={score}
              onPress={() => onChange(score)}
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                backgroundColor: active ? colors.gold : colors.bgMuted,
                borderWidth: 1,
                borderColor: active ? colors.gold : colors.borderSubtle,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 8,
                  fontFamily: fonts.sans600,
                  color: active ? "#1A0F16" : colors.textMuted,
                }}
              >
                {score}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {value && (
        <Text
          style={{
            fontSize: 10,
            fontFamily: fonts.sans600,
            color: colors.gold,
            marginTop: 3,
          }}
        >
          {value}/10
        </Text>
      )}
    </View>
  );
}

// ── AI Mentor Panel ──────────────────────────────────────────────────────────
function AIMentorPanel({ visible, onClose }) {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Namaste. I am your Shoonya AI mentor. Ask me anything about your practice, schedule, progress, or inner journey.",
    },
  ]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: input },
      {
        role: "ai",
        text: "I am reflecting on your question. This feature connects to your chosen AI model in Settings. Your practice data and schedule inform my guidance.",
      },
    ]);
    setInput("");
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
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View
            style={{
              backgroundColor: colors.bgCard,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              borderWidth: 1,
              borderColor: colors.border,
              maxHeight: SCREEN_HEIGHT * 0.78,
            }}
          >
            {/* Handle */}
            <View
              style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}
            >
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
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.borderSubtle,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                    marginRight: 10,
                  }}
                >
                  <Sparkles size={16} color={colors.gold} />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.sans600,
                    color: colors.textPrimary,
                  }}
                >
                  Shoonya Mentor
                </Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <X size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Messages */}
            <ScrollView
              style={{ paddingHorizontal: 20, paddingTop: 16 }}
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              {messages.map((m, i) => (
                <View
                  key={i}
                  style={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    marginBottom: 12,
                    backgroundColor:
                      m.role === "user" ? colors.goldDim : colors.bgCardLight,
                    borderWidth: 1,
                    borderColor:
                      m.role === "user" ? colors.border : colors.borderSubtle,
                    borderRadius: 14,
                    padding: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: fonts.sans400,
                      color: colors.textPrimary,
                      lineHeight: 20,
                    }}
                  >
                    {m.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* Input */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                paddingHorizontal: 16,
                paddingVertical: 14,
                paddingBottom: insets.bottom + 14,
                borderTopWidth: 1,
                borderTopColor: colors.borderSubtle,
                gap: 10,
              }}
            >
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask your mentor..."
                placeholderTextColor={colors.textMuted}
                multiline
                style={{
                  flex: 1,
                  backgroundColor: colors.bgMuted,
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  fontSize: 14,
                  fontFamily: fonts.sans400,
                  color: colors.textPrimary,
                  maxHeight: 80,
                }}
              />
              <TouchableOpacity
                onPress={send}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: colors.goldDim,
                  borderWidth: 1,
                  borderColor: colors.border,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Send size={18} color={colors.gold} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

// ── Main Screen ──────────────────────────────────────────────────────────────
export default function TodayDashboard() {
  const insets = useSafeAreaInsets();
  const [activities, setActivities] = useState(INIT_ACTIVITIES);
  const [aiOpen, setAiOpen] = useState(false);
  const [dndActive, setDndActive] = useState(false);
  const [dndActivity, setDndActivity] = useState(null);

  const currentDay = 12;
  const currentPhase = "Foundation Rhythm";
  const streak = 11;

  const ratedActivities = activities.filter((a) => a.rating !== null);
  const dayScore = ratedActivities.length
    ? Math.round(
        (ratedActivities.reduce((s, a) => s + a.rating, 0) /
          ratedActivities.length) *
          10,
      ) / 10
    : null;
  const completedCount = activities.filter((a) => a.completed).length;
  const completionPct = Math.round((completedCount / activities.length) * 100);

  const updateRating = (id, rating) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, rating, completed: true } : a)),
    );
  };

  const activateDnd = (activity) => {
    setDndActivity(activity);
    setDndActive(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />
      <AIMentorPanel visible={aiOpen} onClose={() => setAiOpen(false)} />

      {/* DND Banner */}
      {dndActive && (
        <View
          style={{
            position: "absolute",
            top: insets.top + 8,
            left: 16,
            right: 16,
            zIndex: 99,
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 14,
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BellOff size={18} color={colors.gold} />
          <Text
            style={{
              flex: 1,
              fontSize: 13,
              fontFamily: fonts.sans500,
              color: colors.textPrimary,
              marginLeft: 10,
            }}
          >
            DND active · {dndActivity?.name}
          </Text>
          <TouchableOpacity onPress={() => setDndActive(false)}>
            <X size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      )}

      {/* ── Header ── */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 24,
          paddingBottom: 18,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderSubtle,
        }}
      >
        {/* Row 1: title + streak + AI */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            {/* Phase badge */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.goldDim,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 999,
                paddingHorizontal: 10,
                paddingVertical: 3,
                alignSelf: "flex-start",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: fonts.sans500,
                  color: colors.gold,
                }}
              >
                Day {currentDay} · {currentPhase}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 32,
                fontFamily: fonts.display700,
                color: colors.textPrimary,
                letterSpacing: 0.5,
              }}
            >
              Today
            </Text>
          </View>

          {/* Streak badge (left of AI) */}
          <View
            style={{
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Flame size={16} color={colors.gold} />
            <Text
              style={{
                fontSize: 18,
                fontFamily: fonts.sans600,
                color: colors.textPrimary,
                marginLeft: 5,
              }}
            >
              {streak}
            </Text>
            <Text
              style={{
                fontSize: 9,
                fontFamily: fonts.sans400,
                color: colors.textMuted,
                marginLeft: 3,
              }}
            >
              day
            </Text>
          </View>

          {/* AI Mentor toggle */}
          <TouchableOpacity
            onPress={() => setAiOpen(true)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.goldDim,
              borderWidth: 1,
              borderColor: colors.gold,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sparkles size={20} color={colors.gold} />
          </TouchableOpacity>
        </View>

        {/* Progress bar + day score */}
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 12,
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, marginRight: 14 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.sans500,
                  color: colors.textSecondary,
                }}
              >
                Today's Progress
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.sans600,
                  color: colors.gold,
                }}
              >
                {completedCount}/{activities.length}
              </Text>
            </View>
            <View
              style={{
                height: 5,
                backgroundColor: colors.bgMuted,
                borderRadius: 3,
              }}
            >
              <View
                style={{
                  height: 5,
                  borderRadius: 3,
                  width: `${completionPct}%`,
                  backgroundColor: colors.gold,
                }}
              />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                borderWidth: 2,
                borderColor: colors.gold,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.sans600,
                  color: colors.gold,
                }}
              >
                {dayScore ? dayScore : completionPct + "%"}
              </Text>
            </View>
            {dayScore && (
              <Text
                style={{
                  fontSize: 9,
                  fontFamily: fonts.sans400,
                  color: colors.textMuted,
                  marginTop: 2,
                }}
              >
                day score
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* ── Activities ── */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 88,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 10,
            fontFamily: fonts.sans600,
            color: colors.textMuted,
            marginBottom: 14,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          Schedule
        </Text>

        {activities.map((activity) => {
          const ai = activityIcon[activity.type] || activityIcon.journal;
          const IconComp = ai.Icon;
          return (
            <TouchableOpacity
              key={activity.id}
              onLongPress={() => activateDnd(activity)}
              activeOpacity={0.8}
              style={{
                backgroundColor: activity.completed
                  ? colors.bgCard
                  : colors.bgCardLight,
                borderWidth: 1,
                borderColor: activity.completed
                  ? colors.borderSubtle
                  : colors.border,
                borderRadius: 14,
                padding: 14,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Emoji */}
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.bgMuted,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <IconComp
                  size={18}
                  color={activity.completed ? colors.textMuted : ai.color}
                />
              </View>

              {/* Content */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.sans600,
                    color: activity.completed
                      ? colors.textMuted
                      : colors.textPrimary,
                    textDecorationLine: activity.completed
                      ? "line-through"
                      : "none",
                    marginBottom: 2,
                  }}
                >
                  {activity.name}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: fonts.sans400,
                    color: colors.textMuted,
                  }}
                >
                  {activity.time} · {activity.duration}
                  {dndActive && dndActivity?.id === activity.id && (
                    <Text style={{ color: colors.gold }}> · DND</Text>
                  )}
                </Text>
              </View>

              {/* Rating widget */}
              <RatingPicker
                value={activity.rating}
                onChange={(r) => updateRating(activity.id, r)}
              />
            </TouchableOpacity>
          );
        })}

        {/* DND hint */}
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 12,
            padding: 12,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <BellOff size={14} color={colors.textMuted} />
          <Text
            style={{
              fontSize: 11,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
              marginLeft: 8,
              flex: 1,
            }}
          >
            Long-press any activity to silence notifications during that
            practice
          </Text>
        </View>

        {/* Day Score Summary */}
        {dayScore && (
          <View
            style={{
              backgroundColor: colors.goldDim,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 14,
              padding: 18,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontFamily: fonts.sans500,
                color: colors.gold,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 6,
              }}
            >
              Today's Score
            </Text>
            <Text
              style={{
                fontSize: 36,
                fontFamily: fonts.display700,
                color: colors.textPrimary,
                marginBottom: 4,
              }}
            >
              {dayScore}{" "}
              <Text style={{ fontSize: 16, color: colors.textMuted }}>/10</Text>
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: fonts.sans400,
                color: colors.textSecondary,
              }}
            >
              Based on {ratedActivities.length} rated activities · Keep going
            </Text>
          </View>
        )}

        {/* Next milestone */}
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 14,
            padding: 18,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontFamily: fonts.sans500,
              color: colors.gold,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 8,
            }}
          >
            Next Milestone
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: fonts.display600,
              color: colors.textPrimary,
              marginBottom: 4,
            }}
          >
            Inner Silence Phase
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.sans400,
              color: colors.textSecondary,
            }}
          >
            Complete Day 14 to unlock deep meditation practices
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
