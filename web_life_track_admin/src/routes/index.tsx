import type { IRoute } from "@/common/types";
import { LAYOUT, type LayoutValue } from "@/constants/layout";
import { URL } from "@/constants/url";
import { DashboardLayout, PrivateLayout } from "@/layouts";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/Login"));
const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const UserManagementPage = lazy(() => import("@/pages/UserManagement"));
const RiskManagementPage = lazy(() => import("@/pages/RiskManagement"));
const InsightPage = lazy(() => import("@/pages/Insight"));
const CareCallManagementPage = lazy(() => import("@/pages/CareCallManagement"));
const SettingPage = lazy(() => import("@/pages/Setting"));
const CareCardDetailPage = lazy(() => import("@/pages/CareCardDetail"));

const withLayout = (
  layout: LayoutValue,
  element: React.ReactNode,
  isPrivate?: boolean
) => {
  let wrapped = element;
  if (layout === LAYOUT.DASHBOARD_LAYOUT)
    wrapped = <DashboardLayout>{wrapped}</DashboardLayout>;
  if (isPrivate) wrapped = <PrivateLayout>{wrapped}</PrivateLayout>;
  return <Suspense fallback={null}>{wrapped}</Suspense>;
};

const privateRoutes: IRoute[] = [
  {
    path: URL.Dashboard,
    element: withLayout(LAYOUT.DASHBOARD_LAYOUT, <DashboardPage />, true),
  },
  {
    path: URL.Users,
    element: withLayout(LAYOUT.DASHBOARD_LAYOUT, <UserManagementPage />, true),
  },
  {
    path: URL.Risks,
    element: withLayout(LAYOUT.DASHBOARD_LAYOUT, <RiskManagementPage />, true),
  },
  {
    path: URL.Insight,
    element: withLayout(LAYOUT.DASHBOARD_LAYOUT, <InsightPage />, true),
  },
  {
    path: URL.CareCall,
    element: withLayout(
      LAYOUT.DASHBOARD_LAYOUT,
      <CareCallManagementPage />,
      true
    ),
  },
  {
    path: URL.Setting,
    element: withLayout(LAYOUT.DASHBOARD_LAYOUT, <SettingPage />, true),
  },
  {
    path: URL.CareCardDetail,
    element: withLayout(LAYOUT.DASHBOARD_LAYOUT, <CareCardDetailPage />, true),
  },
];

const publicRoutes: IRoute[] = [
  { path: URL.Login, element: withLayout(LAYOUT.NONE, <LoginPage />, false) },
];

const router = createBrowserRouter([...privateRoutes, ...publicRoutes]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
