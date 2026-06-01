import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Droplets,
  Utensils,
  FileText,
  Activity,
  Plus,
  Eye,
  EyeOff,
  Share2,
} from "lucide-react-native";
import { colors, fonts } from "@/theme";
import { useState } from "react";

const { width } = Dimensions.get("window");

// ── Simple sparkline bar chart ───────────────────────────────────────────────
const GRAPH_SERIES = [
  {
    key: "score",
    label: "Day Score",
    color: colors.gold,
    data: [5, 6, 7, 6, 8, 7, 8, 9, 8, 7, 8, 8],
  },
  {
    key: "energy",
    label: "Energy",
    color: "#F7A847",
    data: [4, 5, 5, 6, 7, 6, 7, 8, 7, 8, 7, 9],
  },
  {
    key: "sleep",
    label: "Sleep",
    color: colors.info,
    data: [6, 6, 7, 7, 7, 8, 7, 8, 8, 7, 8, 8],
  },
  {
    key: "weight",
    label: "Weight",
    color: colors.success,
    data: [8, 8, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6],
  },
  {
    key: "water",
    label: "Water",
    color: "#64B5F6",
    data: [3, 4, 5, 5, 6, 5, 6, 7, 6, 7, 5, 7],
  },
  {
    key: "waist",
    label: "Waist",
    color: "#CE93D8",
    data: [8, 8, 8, 7, 7, 7, 7, 7, 6, 6, 6, 6],
  },
];

const CHART_H = 80;
const CHART_W = width - 64;

function MiniSparkline({ series, visible }) {
  if (!visible) return null;
  const days = series[0].data.length;
  const colW = CHART_W / (days - 1);

  return (
    <View style={{ height: CHART_H, position: "relative", marginTop: 8 }}>
      {/* Y grid lines */}
      {[0, 0.5, 1].map((r) => (
        <View
          key={r}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: CHART_H * (1 - r) - 1,
            height: 1,
            backgroundColor: colors.borderSubtle,
          }}
        />
      ))}
      {/* Lines */}
      {series.map((s) => {
        const maxV = Math.max(...s.data);
        const minV = Math.min(...s.data);
        const range = maxV - minV || 1;
        return s.data.map((v, i) => {
          if (i === 0) return null;
          const prev = s.data[i - 1];
          const x1 = (i - 1) * colW;
          const x2 = i * colW;
          const y1 = CHART_H - ((prev - minV) / range) * (CHART_H - 12) - 6;
          const y2 = CHART_H - ((v - minV) / range) * (CHART_H - 12) - 6;
          const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
          return (
            <View
              key={`${s.key}-${i}`}
              style={{
                position: "absolute",
                left: x1,
                top: Math.min(y1, y2),
                width: len,
                height: 2,
                backgroundColor: s.color,
                opacity: 0.8,
                transform: [{ rotate: `${angle}deg` }],
                transformOrigin: "left center",
              }}
            />
          );
        });
      })}
    </View>
  );
}

function ProgressGraph() {
  const [graphVisible, setGraphVisible] = useState(true);
  const [activeSeries, setActiveSeries] = useState([
    "score",
    "energy",
    "sleep",
  ]);

  const toggle = (key) =>
    setActiveSeries((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  const visibleSeries = GRAPH_SERIES.filter((s) =>
    activeSeries.includes(s.key),
  );

  return (
    <View
      style={{
        backgroundColor: colors.bgCard,
        borderWidth: 1,
        borderColor: colors.borderSubtle,
        borderRadius: 16,
        padding: 18,
        marginBottom: 28,
      }}
    >
      {/* Header row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontFamily: fonts.sans600,
            color: colors.textPrimary,
          }}
        >
          Progress Overview
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={() => setGraphVisible(!graphVisible)}>
            {graphVisible ? (
              <Eye size={18} color={colors.gold} />
            ) : (
              <EyeOff size={18} color={colors.textMuted} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.bgMuted,
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Share2 size={14} color={colors.textMuted} />
            <Text
              style={{
                fontSize: 11,
                fontFamily: fonts.sans500,
                color: colors.textMuted,
                marginLeft: 5,
              }}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Series legend / filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, marginBottom: 4 }}
      >
        {GRAPH_SERIES.map((s) => {
          const active = activeSeries.includes(s.key);
          return (
            <TouchableOpacity
              key={s.key}
              onPress={() => toggle(s.key)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 999,
                marginRight: 6,
                backgroundColor: active ? s.color + "22" : colors.bgMuted,
                borderWidth: 1,
                borderColor: active ? s.color : colors.borderSubtle,
              }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: active ? s.color : colors.textMuted,
                  marginRight: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: fonts.sans500,
                  color: active ? s.color : colors.textMuted,
                }}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Chart */}
      {graphVisible && visibleSeries.length > 0 && (
        <MiniSparkline series={visibleSeries} visible />
      )}
      {!graphVisible && (
        <View
          style={{ height: 40, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
            }}
          >
            Graph hidden · tap the eye icon to show
          </Text>
        </View>
      )}

      {/* Day labels */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        {["1", "", "", "", "", "", "7", "", "", "", "", "12"].map((l, i) => (
          <Text
            key={i}
            style={{
              fontSize: 9,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
              textAlign: "center",
              width: CHART_W / 11,
            }}
          >
            {l}
          </Text>
        ))}
      </View>
    </View>
  );
}

// ── Metric grid, water tracker, sections (unchanged) ─────────────────────────
const metrics = [
  { label: "Weight", value: "72.4", unit: "kg", trend: "▼ 1.2", good: true },
  { label: "Energy", value: "7", unit: "/10", trend: "▲ 2", good: true },
  { label: "Sleep", value: "7.5", unit: "hrs", trend: "▲ 0.5", good: true },
  { label: "Waist", value: "84", unit: "cm", trend: "▼ 1.5", good: true },
];

const sections = [
  {
    icon: <Utensils size={20} color={colors.gold} />,
    label: "Nutrition Log",
    sub: "Meals · Ginger · Ajwain · Fasting",
    bg: colors.goldDim,
    border: colors.border,
  },
  {
    icon: <Activity size={20} color={colors.success} />,
    label: "Health Metrics",
    sub: "Blood markers · BP · HbA1c",
    bg: "rgba(94,155,116,0.15)",
    border: "rgba(94,155,116,0.4)",
  },
  {
    icon: <FileText size={20} color={colors.info} />,
    label: "Medical Vault",
    sub: "Reports · Scans · Test uploads",
    bg: "rgba(91,143,185,0.15)",
    border: "rgba(91,143,185,0.4)",
  },
];

export default function WellnessScreen() {
  const insets = useSafeAreaInsets();
  const [waterGlasses, setWaterGlasses] = useState(5);
  const waterGoal = 8;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />

      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 24,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderSubtle,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 34,
              fontFamily: fonts.display700,
              color: colors.textPrimary,
              letterSpacing: 0.5,
              marginBottom: 4,
            }}
          >
            Wellness
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.sans400,
              color: colors.textSecondary,
            }}
          >
            Nutrition · Metrics · Medical vault
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: colors.goldDim,
            borderWidth: 1,
            borderColor: colors.border,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Plus size={22} color={colors.gold} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: insets.bottom + 88,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Progress graph ── */}
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
          Progress Graph
        </Text>
        <ProgressGraph />

        {/* ── Vitals grid ── */}
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
          This Week's Vitals
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 28,
          }}
        >
          {metrics.map((m) => (
            <View
              key={m.label}
              style={{
                width: (width - 60) / 2,
                backgroundColor: colors.bgCard,
                borderWidth: 1,
                borderColor: colors.borderSubtle,
                borderRadius: 14,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: fonts.sans500,
                  color: colors.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  marginBottom: 8,
                }}
              >
                {m.label}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontFamily: fonts.sans600,
                    color: colors.textPrimary,
                  }}
                >
                  {m.value}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.sans400,
                    color: colors.textMuted,
                    marginLeft: 4,
                  }}
                >
                  {m.unit}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: fonts.sans500,
                  color: m.good ? colors.success : colors.error,
                  marginTop: 4,
                }}
              >
                {m.trend} this week
              </Text>
            </View>
          ))}
        </View>

        {/* ── Water ── */}
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
          Hydration
        </Text>
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
            borderRadius: 14,
            padding: 20,
            marginBottom: 28,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Droplets size={18} color={colors.info} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: fonts.sans600,
                  color: colors.textPrimary,
                  marginLeft: 8,
                }}
              >
                Water
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                fontFamily: fonts.sans500,
                color: colors.textSecondary,
              }}
            >
              {waterGlasses} / {waterGoal} glasses
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 6, marginBottom: 14 }}>
            {Array.from({ length: waterGoal }).map((_, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    i < waterGlasses ? colors.info : colors.bgMuted,
                }}
              />
            ))}
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              onPress={() => setWaterGlasses((w) => Math.max(0, w - 1))}
              style={{
                flex: 1,
                backgroundColor: colors.bgMuted,
                borderRadius: 10,
                paddingVertical: 10,
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
                − Glass
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setWaterGlasses((w) => Math.min(waterGoal, w + 1))}
              style={{
                flex: 1,
                backgroundColor: "rgba(91,143,185,0.15)",
                borderWidth: 1,
                borderColor: "rgba(91,143,185,0.4)",
                borderRadius: 10,
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: fonts.sans600,
                  color: colors.info,
                }}
              >
                + Glass
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Quick Access ── */}
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
          Quick Access
        </Text>
        {sections.map((s) => (
          <TouchableOpacity
            key={s.label}
            style={{
              backgroundColor: s.bg,
              borderWidth: 1,
              borderColor: s.border,
              borderRadius: 14,
              padding: 18,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: colors.bgCard,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 14,
              }}
            >
              {s.icon}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: fonts.sans600,
                  color: colors.textPrimary,
                  marginBottom: 2,
                }}
              >
                {s.label}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.sans400,
                  color: colors.textMuted,
                }}
              >
                {s.sub}
              </Text>
            </View>
            <Text style={{ fontSize: 20, color: colors.textMuted }}>›</Text>
          </TouchableOpacity>
        ))}

        <View
          style={{
            backgroundColor: colors.bgCard,
            borderRadius: 12,
            padding: 14,
            marginTop: 8,
            borderWidth: 1,
            borderColor: colors.borderSubtle,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontFamily: fonts.sans400,
              color: colors.textMuted,
              lineHeight: 18,
              textAlign: "center",
            }}
          >
            Always consult a qualified clinician for medical decisions. Shoonya
            is not a medical device.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
