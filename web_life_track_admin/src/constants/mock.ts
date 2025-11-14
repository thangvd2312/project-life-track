// Mock user data

export interface User {
  id: number;
  name: string;
  riskStatus: string;
  lastActive: string;
  recordDate: string;
  address: string;
  healthScore: string;
}

export const MOCK_USERS = [
  {
    id: 1,
    name: "홍길동",
    riskStatus: "2개 확인 필요",
    lastActive: "2025-10-08",
    recordDate: "2025-10-08",
    address: "서울특별시 강남구 테헤란로 152",
    healthScore: "",
  },
  {
    id: 2,
    name: "김영희",
    riskStatus: "정상",
    lastActive: "2025-10-09",
    recordDate: "2025-10-08",
    address: "부산광역시 해운대구 센텀중앙로 45",
    healthScore: "",
  },
  {
    id: 3,
    name: "이철수",
    riskStatus: "1개 확인 필요",
    lastActive: "2025-10-07",
    recordDate: "2025-10-08",
    address: "대구광역시 수성구 들안로 234",
    healthScore: "",
  },
  {
    id: 4,
    name: "박민수",
    riskStatus: "3개 확인 필요",
    lastActive: "2025-10-09",
    recordDate: "2025-10-08",
    address: "인천광역시 남동구 예술로 88",
    healthScore: "",
  },
  {
    id: 5,
    name: "정수진",
    riskStatus: "정상",
    lastActive: "2025-10-06",
    recordDate: "2025-10-08",
    address: "광주광역시 서구 상무대로 120",
    healthScore: "",
  },
  {
    id: 6,
    name: "최동욱",
    riskStatus: "2개 확인 필요",
    lastActive: "2025-10-08",
    recordDate: "2025-10-08",
    address: "대전광역시 유성구 대학로 59",
    healthScore: "",
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
