import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  Lightbulb,
  Phone,
  Settings,
} from "lucide-react";
import { URL } from "@/constants/url";

export const LAYOUT = {
  DASHBOARD_LAYOUT: "DASHBOARD_LAYOUT",
  NONE: "NONE",
};

export const SIDEBAR_DASHBOARD_MENU_ITEMS = [
  {
    id: "dashboard",
    path: URL.Dashboard,
    icon: LayoutDashboard,
    label: "통합 대시보드",
  },
  {
    id: "users",
    path: URL.Users,
    icon: Users,
    label: "이용자 관리",
    hasNotification: false,
  },
  {
    id: "risk",
    path: URL.Risks,
    icon: AlertTriangle,
    label: "리스크 관리",
  },
  {
    id: "insights",
    path: URL.Insight,
    icon: Lightbulb,
    label: "인사이트",
  },
  {
    id: "care-call",
    path: URL.CareCall,
    icon: Phone,
    label: "안부콜 관리",
  },
  {
    id: "settings",
    path: URL.Setting,
    icon: Settings,
    label: "설정",
    hasNotification: false,
  },
] as const;

export type LayoutValue = (typeof LAYOUT)[keyof typeof LAYOUT];
