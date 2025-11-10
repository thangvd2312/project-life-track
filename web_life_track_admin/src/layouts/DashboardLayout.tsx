import { matchPath, useNavigate } from "react-router-dom";
import { SIDEBAR_DASHBOARD_MENU_ITEMS } from "@/constants/layout";
import { cn } from "@/lib/utils";
import DefaultLogo from "@/assets/svgs/logo.svg";
import { URL } from "@/constants/url";

interface IDefaultLayout {
  children: React.ReactNode;
}

const DashboardLayout = (props: IDefaultLayout) => {
  const { children } = props;
  const navigate = useNavigate();

  function isMenuSideBarActive(path: string) {
    const currentPath = window.location.pathname;

    if (path === "/dashboard") {
      return matchPath({ path, end: true }, currentPath) !== null;
    }

    return matchPath({ path, end: false }, currentPath) !== null;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-theme-white-100">
      <aside className="shrink-0 w-[240px] bg-white border-theme-white-200 border">
        <nav className="p-4">
          {SIDEBAR_DASHBOARD_MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = isMenuSideBarActive(item.path);

            return (
              <button
                key={item.id}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all relative",
                  isActive
                    ? "bg-primary text-white"
                    : "bg-transparent text-theme-black-100"
                )}
                onClick={() => navigate(item.path)}
              >
                <Icon size={20} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="shrink-0 flex items-center justify-between px-8 py-4 bg-white border-theme-white-200 h-16">
          <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <div className="flex items-center gap-2">
              <DefaultLogo className="w-8 h-8" />
              <span className="text-[20px] text-primary">HealthLab</span>
            </div>
          </button>

          <div className="flex items-center gap-2 text-sm text-theme-black-100">
            <span>홍길동님</span>
            <span className="text-theme-gray-100">|</span>
            <button
              className="hover:opacity-70 transition-opacity text-primary"
              onClick={() => {
                navigate(URL.Login);
              }}
            >
              로그아웃
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
