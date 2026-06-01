import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Linking,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Shield,
  Download,
  Trash2,
  ChevronRight,
  Bell,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  User,
  Music,
  X,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { colors, fonts } from "@/theme";
import { useState, useEffect } from "react";
import { useProfileStore } from "@/utils/useProfileStore";

const AI_MODELS = [
  {
    key: "gemini-flash",
    label: "Gemini 2.5 Flash",
    tier: "Free",
    provider: "Google",
    desc: "Fast, smart, no cost",
  },
  {
    key: "gpt4o-mini",
    label: "GPT-4o Mini",
    tier: "Free",
    provider: "OpenAI",
    desc: "Compact & capable",
  },
  {
    key: "claude-haiku",
    label: "Claude Haiku",
    tier: "Free",
    provider: "Anthropic",
    desc: "Thoughtful & safe",
  },
  {
    key: "gemini-pro",
    label: "Gemini 2.5 Pro",
    tier: "Paid",
    provider: "Google",
    desc: "Deep reasoning",
  },
  {
    key: "gpt4o",
    label: "GPT-4o",
    tier: "Paid",
    provider: "OpenAI",
    desc: "Most capable GPT",
  },
  {
    key: "claude-sonnet",
    label: "Claude Sonnet 4",
    tier: "Paid",
    provider: "Anthropic",
    desc: "Best quality AI",
  },
];

function SectionLabel({ label }) {
  return (
    <Text
      style={{
        fontSize: 10,
        fontFamily: fonts.sans500,
        color: colors.textMuted,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 14,
      }}
    >
      {label}
    </Text>
  );
}

const MANTRA_DONATE_URL = "https://www.youtube.com/watch?v=Mr_uHJPUlO8";

function MantraLink({ url }) {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(url)}
      style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
      activeOpacity={0.7}
    >
      <Music size={14} color={colors.gold} />
      <Text
        style={{
          fontSize: 14,
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

function DonateModal({ visible, onClose }) {
  const insets = useSafeAreaInsets();

  const handleRazorpay = () => {
    Linking.openURL("https://razorpay.me/@gods").catch(() =>
      Alert.alert("Error", "Could not open Razorpay. Please try again."),
    );
    onClose();
  };

  const handlePayPal = () => {
    const paypalUrl =
      process.env.EXPO_PUBLIC_PAYPAL_URL || "https://paypal.me/ShoonyaApp";
    Linking.openURL(paypalUrl).catch(() =>
      Alert.alert("Error", "Could not open PayPal. Please try again."),
    );
    onClose();
  };

  const handleUPI = () => {
    const upiId = process.env.EXPO_PUBLIC_UPI_ID || "shoonya@upi";
    const upiUrl = `upi://pay?pa=${upiId}&pn=Shoonya&cu=INR&tn=Donation+to+Shoonya`;
    Linking.openURL(upiUrl).catch(() =>
      Alert.alert("UPI", "Open your UPI app and pay to: " + upiId),
    );
    onClose();
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
            paddingBottom: insets.bottom + 24,
          }}
        >
          {/* Handle */}
          <View
            style={{ alignItems: "center", paddingTop: 12, marginBottom: 4 }}
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
                Donate
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: fonts.sans400,
                  color: colors.textMuted,
                  marginTop: 1,
                }}
              >
                Pay in your currency · choose your amount
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20, paddingTop: 20, gap: 10 }}>
            {/* Razorpay */}
            <TouchableOpacity
              onPress={handleRazorpay}
              style={{ borderRadius: 12, overflow: "hidden" }}
            >
              <LinearGradient
                colors={["#072654", "#1447CC"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingVertical: 18, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: fonts.sans600,
                    color: "#FFFFFF",
                  }}
                >
                  Pay via Razorpay
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: fonts.sans400,
                    color: "rgba(255,255,255,0.65)",
                    marginTop: 3,
                  }}
                >
                  Cards · NetBanking · UPI · Wallets
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* PayPal */}
            <TouchableOpacity
              onPress={handlePayPal}
              style={{
                backgroundColor: "#003087",
                borderRadius: 12,
                paddingVertical: 18,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: fonts.sans600,
                  color: "#FFFFFF",
                }}
              >
                Pay with PayPal
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: fonts.sans400,
                  color: "rgba(255,255,255,0.65)",
                  marginTop: 3,
                }}
              >
                International · any currency
              </Text>
            </TouchableOpacity>

            {/* UPI */}
            <TouchableOpacity
              onPress={handleUPI}
              style={{
                backgroundColor: colors.bgMuted,
                borderWidth: 1,
                borderColor: colors.borderSubtle,
                borderRadius: 12,
                paddingVertical: 18,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: fonts.sans600,
                  color: colors.textPrimary,
                }}
              >
                Pay via UPI
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: fonts.sans400,
                  color: colors.textMuted,
                  marginTop: 3,
                }}
              >
                GPay · PhonePe · Paytm · Any UPI app
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 11,
                fontFamily: fonts.sans400,
                color: colors.textMuted,
                textAlign: "center",
                paddingTop: 4,
              }}
            >
              You choose the amount that feels right 🙏
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { selfieUri, displayName, hydrate } = useProfileStore();
  const [teacherJournal, setTeacherJournal] = useState(true);
  const [teacherMedical, setTeacherMedical] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [selectedModel, setSelectedModel] = useState("gemini-flash");
  const [connected, setConnected] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />
      <DonateModal visible={showDonate} onClose={() => setShowDonate(false)} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 88 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <LinearGradient
          colors={[colors.bgCardLight, colors.bg]}
          style={{
            paddingTop: insets.top + 24,
            paddingHorizontal: 24,
            paddingBottom: 28,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 92,
                height: 92,
                borderRadius: 46,
                backgroundColor: colors.bgMuted,
                borderWidth: 2.5,
                borderColor: colors.gold,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 14,
                overflow: "hidden",
              }}
            >
              {selfieUri ? (
                <Image
                  source={{ uri: selfieUri }}
                  style={{ width: 92, height: 92 }}
                  contentFit="cover"
                />
              ) : (
                <User size={38} color={colors.gold} strokeWidth={1.5} />
              )}
            </View>
            <Text
              style={{
                fontSize: 22,
                fontFamily: fonts.display600,
                color: colors.textPrimary,
                marginBottom: 14,
              }}
            >
              {displayName || "Priya Sharma"}
            </Text>
            <View
              style={{
                backgroundColor: colors.goldDim,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 999,
                paddingHorizontal: 16,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.sans600,
                  color: colors.gold,
                }}
              >
                Resurrection & Rise · Day 12
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={{ paddingHorizontal: 24 }}>
          {/* ── AI Model ── */}
          <SectionLabel label="AI Mentor Settings" />
          <View
            style={{
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 16,
              padding: 16,
              marginBottom: 28,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: colors.goldDim,
                  borderWidth: 1,
                  borderColor: colors.border,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <Sparkles size={18} color={colors.gold} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.sans600,
                    color: colors.textPrimary,
                  }}
                >
                  Choose Your AI Model
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: fonts.sans400,
                    color: colors.textMuted,
                  }}
                >
                  One tap to connect · free or paid
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: connected
                    ? "rgba(94,155,116,0.2)"
                    : colors.bgMuted,
                  borderWidth: 1,
                  borderColor: connected
                    ? "rgba(94,155,116,0.5)"
                    : colors.borderSubtle,
                  borderRadius: 999,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: fonts.sans600,
                    color: connected ? colors.success : colors.textMuted,
                  }}
                >
                  {connected ? "● Connected" : "○ Not connected"}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 9,
                fontFamily: fonts.sans500,
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 8,
              }}
            >
              Free Models
            </Text>
            {AI_MODELS.filter((m) => m.tier === "Free").map((m) => (
              <TouchableOpacity
                key={m.key}
                onPress={() => setSelectedModel(m.key)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 12,
                  backgroundColor:
                    selectedModel === m.key ? colors.goldDim : colors.bgMuted,
                  borderWidth: 1,
                  borderColor:
                    selectedModel === m.key
                      ? colors.border
                      : colors.borderSubtle,
                  borderRadius: 10,
                  marginBottom: 6,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: fonts.sans600,
                      color: colors.textPrimary,
                    }}
                  >
                    {m.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: fonts.sans400,
                      color: colors.textMuted,
                    }}
                  >
                    {m.provider} · {m.desc}
                  </Text>
                </View>
                {selectedModel === m.key && (
                  <CheckCircle2
                    size={18}
                    color={colors.gold}
                    fill={colors.gold}
                  />
                )}
              </TouchableOpacity>
            ))}

            <Text
              style={{
                fontSize: 9,
                fontFamily: fonts.sans500,
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginTop: 10,
                marginBottom: 8,
              }}
            >
              Paid Models
            </Text>
            {AI_MODELS.filter((m) => m.tier === "Paid").map((m) => (
              <TouchableOpacity
                key={m.key}
                onPress={() => setSelectedModel(m.key)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 12,
                  backgroundColor:
                    selectedModel === m.key ? colors.goldDim : colors.bgMuted,
                  borderWidth: 1,
                  borderColor:
                    selectedModel === m.key
                      ? colors.border
                      : colors.borderSubtle,
                  borderRadius: 10,
                  marginBottom: 6,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: fonts.sans600,
                      color: colors.textPrimary,
                    }}
                  >
                    {m.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: fonts.sans400,
                      color: colors.textMuted,
                    }}
                  >
                    {m.provider} · {m.desc}
                  </Text>
                </View>
                {selectedModel === m.key && (
                  <CheckCircle2
                    size={18}
                    color={colors.gold}
                    fill={colors.gold}
                  />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setConnected(!connected)}
              style={{ borderRadius: 10, overflow: "hidden", marginTop: 12 }}
            >
              <LinearGradient
                colors={[colors.gold, colors.goldLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 14,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={16} color="#1A0F16" />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.sans600,
                    color: "#1A0F16",
                    marginLeft: 8,
                  }}
                >
                  {connected ? "Disconnect Model" : "Connect with One Tap"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* ── Teacher visibility ── */}
          <SectionLabel label="Teacher Visibility" />
          <View
            style={{
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 28,
            }}
          >
            {[
              {
                label: "Journal",
                sub: "Teacher can view your entries",
                val: teacherJournal,
                set: setTeacherJournal,
              },
              {
                label: "Medical Reports",
                sub: "Teacher can view your health data",
                val: teacherMedical,
                set: setTeacherMedical,
              },
            ].map((row, i, arr) => (
              <View
                key={row.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 18,
                  borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                  borderBottomColor: colors.borderSubtle,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  {row.val ? (
                    <Eye size={18} color={colors.gold} />
                  ) : (
                    <EyeOff size={18} color={colors.textMuted} />
                  )}
                  <View style={{ marginLeft: 12 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: fonts.sans600,
                        color: colors.textPrimary,
                      }}
                    >
                      {row.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: fonts.sans400,
                        color: colors.textMuted,
                      }}
                    >
                      {row.sub}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={row.val}
                  onValueChange={row.set}
                  trackColor={{ false: colors.bgMuted, true: colors.goldDim }}
                  thumbColor={row.val ? colors.gold : colors.textMuted}
                />
              </View>
            ))}
          </View>

          {/* ── Settings ── */}
          <SectionLabel label="Settings" />
          <View
            style={{
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 28,
            }}
          >
            {[
              {
                label: "Account & Security",
                icon: <Shield size={18} color={colors.gold} />,
                type: "arrow",
              },
              {
                label: "Notifications",
                icon: <Bell size={18} color={colors.gold} />,
                type: "toggle",
                val: notifications,
                set: setNotifications,
              },
            ].map((row, i, arr) => (
              <View
                key={row.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 18,
                  borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                  borderBottomColor: colors.borderSubtle,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 17,
                      backgroundColor: colors.bgMuted,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 14,
                    }}
                  >
                    {row.icon}
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: fonts.sans500,
                      color: colors.textPrimary,
                    }}
                  >
                    {row.label}
                  </Text>
                </View>
                {row.type === "toggle" ? (
                  <Switch
                    value={row.val}
                    onValueChange={row.set}
                    trackColor={{ false: colors.bgMuted, true: colors.goldDim }}
                    thumbColor={row.val ? colors.gold : colors.textMuted}
                  />
                ) : (
                  <ChevronRight size={18} color={colors.textMuted} />
                )}
              </View>
            ))}
          </View>

          {/* ── Data ── */}
          <SectionLabel label="Your Data" />
          <View
            style={{
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 28,
            }}
          >
            {[
              {
                label: "Export My Data",
                icon: <Download size={18} color={colors.info} />,
                color: colors.info,
              },
              {
                label: "Delete My Account",
                icon: <Trash2 size={18} color={colors.error} />,
                color: colors.error,
              },
            ].map((row, i, arr) => (
              <TouchableOpacity
                key={row.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 18,
                  borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                  borderBottomColor: colors.borderSubtle,
                }}
              >
                <View
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: colors.bgMuted,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 14,
                  }}
                >
                  {row.icon}
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.sans500,
                    color: row.color,
                    flex: 1,
                  }}
                >
                  {row.label}
                </Text>
                <ChevronRight size={18} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Support the Journey ── */}
          <SectionLabel label="Support the Journey" />
          <View
            style={{
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 16,
              padding: 20,
              marginBottom: 28,
              alignItems: "center",
              gap: 16,
            }}
          >
            <MantraLink url={MANTRA_DONATE_URL} />
            <Text
              style={{
                fontSize: 13,
                fontFamily: fonts.sans400,
                color: colors.textSecondary,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              If this journey has touched your heart, your offering keeps the
              flame alive for others.
            </Text>
            <TouchableOpacity
              onPress={() => setShowDonate(true)}
              style={{ width: "100%", borderRadius: 14, overflow: "hidden" }}
            >
              <LinearGradient
                colors={[colors.gold, colors.goldLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.sans600,
                    color: "#1A0F16",
                  }}
                >
                  Donate
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: colors.borderSubtle,
              borderRadius: 14,
              paddingVertical: 16,
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: fonts.sans500,
                color: colors.textMuted,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 10,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Shoonya v1.0.0 · Made for your transformation
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
