// Mock user data

export interface User {
  id: number;
  name: string;
  groups: string[];
  riskStatus: string;
  careStatus: string;
  inputTypes: string[];
  outputTypes: string[];
  lastActive: string;
}

export const MOCK_USERS = [
  {
    id: 1,
    name: "홍길동",
    groups: ["고혈압", "당뇨"],
    riskStatus: "2개 확인 필요",
    careStatus: "1개 진행 중",
    inputTypes: ["식단", "약물"],
    outputTypes: ["혈압", "심박수"],
    lastActive: "2025-10-08",
  },
  {
    id: 2,
    name: "김영희",
    groups: ["비만"],
    riskStatus: "정상",
    careStatus: "2개 진행 중",
    inputTypes: ["식단", "운동"],
    outputTypes: ["혈당", "심박수"],
    lastActive: "2025-10-09",
  },
  {
    id: 3,
    name: "이철수",
    groups: ["심혈관", "고혈압"],
    riskStatus: "1개 확인 필요",
    careStatus: "진행 중인 케어 없음",
    inputTypes: ["약물"],
    outputTypes: ["혈압"],
    lastActive: "2025-10-07",
  },
  {
    id: 4,
    name: "박민수",
    groups: ["당뇨"],
    riskStatus: "3개 확인 필요",
    careStatus: "3개 진행 중",
    inputTypes: ["식단", "약물", "운동"],
    outputTypes: ["혈당", "혈압", "심박수"],
    lastActive: "2025-10-09",
  },
  {
    id: 5,
    name: "정수진",
    groups: ["고혈압"],
    riskStatus: "정상",
    careStatus: "1개 진행 중",
    inputTypes: ["식단"],
    outputTypes: ["혈압"],
    lastActive: "2025-10-06",
  },
  {
    id: 6,
    name: "최동욱",
    groups: ["비만", "당뇨"],
    riskStatus: "2개 확인 필요",
    careStatus: "2개 진행 중",
    inputTypes: ["식단", "운동"],
    outputTypes: ["혈당", "심박수"],
    lastActive: "2025-10-08",
  },
];

export interface CareCard {
  id: number;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  isExpiring: boolean;
}

// Mock care cards data
export const INITIAL_CARE_CARDS = [
  {
    id: 1,
    title: "주 2회 혈압 관리",
    category: "심혈관",
    startDate: "2025-10-01",
    endDate: "2025-11-01",
    isExpiring: false,
  },
  {
    id: 2,
    title: "당뇨 식단 집중 케어",
    category: "내분비",
    startDate: "2025-09-15",
    endDate: "2025-10-15",
    isExpiring: true,
  },
  {
    id: 3,
    title: "생활습관 개선 프로그램",
    category: "생활습관",
    startDate: "2025-10-05",
    endDate: "2025-12-05",
    isExpiring: false,
  },
  {
    id: 4,
    title: "스트레스 관리 케어",
    category: "정신건강",
    startDate: "2025-09-20",
    endDate: "2025-10-20",
    isExpiring: true,
  },
];
