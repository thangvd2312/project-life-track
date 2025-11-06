import type { IRoute } from "@/common/types";
import { LAYOUT, type LayoutValue } from "@/constants/layout";
import { DefaultLayout, PrivateLayout } from "@/layouts";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/Login"));

const withLayout = (
  layout: LayoutValue,
  element: React.ReactNode,
  isPrivate?: boolean
) => {
  let wrapped = element;
  if (layout === LAYOUT.DEFAULT_LAYOUT)
    wrapped = <DefaultLayout>{wrapped}</DefaultLayout>;
  if (isPrivate) wrapped = <PrivateLayout>{wrapped}</PrivateLayout>;
  return <Suspense fallback={null}>{wrapped}</Suspense>;
};

const privateRoutes: IRoute[] = [
  {
    path: "/login",
    element: withLayout(LAYOUT.NONE, <LoginPage />, true),
  },
];

const publicRoutes: IRoute[] = [];

const router = createBrowserRouter([...privateRoutes, ...publicRoutes]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
