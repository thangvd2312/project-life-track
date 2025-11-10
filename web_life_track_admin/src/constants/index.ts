export const USER_MANAGEMENT_TABS = [
  { id: 1, value: "users", label: "이용자 목록" },
  { id: 2, value: "care", label: "케어" },
];

export const RISKS = [
  { id: 1, value: "all", label: "전체" },
  { id: 2, value: "high", label: "고위험" },
  { id: 3, value: "medium", label: "주의" },
  { id: 4, value: "normal", label: "정상" },
];

export const ACTIVITIES = [
  { id: 1, value: "all", label: "전체" },
  { id: 2, value: "active", label: "활동 중" },
  { id: 3, value: "inactive", label: "비활동" },
];

export const GROUP_COLORS: { [key: string]: string } = {
  고혈압: "#FF3B30",
  당뇨: "#FF9500",
  비만: "#FFCC00",
  심혈관: "#FF2D55",
};

export const ICON_MAP: { [key: string]: string } = {
  식단: "🍽️",
  약물: "💊",
  혈압: "🩸",
  심박수: "❤️",
  혈당: "🩸",
  운동: "🏃",
};
