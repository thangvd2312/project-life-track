import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X,
  Search,
  TrendingUp,
  AlertTriangle,
  List,
  BarChart3,
  Activity,
  ArrowUpDown,
  PieChart,
  LineChart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconChecked from "@/assets/svgs/ic-checked.svg";
import { cn } from "@/lib/utils";

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidgets?: (widgetIds: string[]) => void;
  addedWidgetIds?: string[];
}

interface Widget {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: "realtime" | "analysis" | "data";
}

const allWidgets: Widget[] = [
  {
    id: "high-risk-monitoring",
    title: "고위험군 라이브 모니터링",
    description: "지정된 고위험군 유저들의 핵심 지표를 실시간으로 추적합니다.",
    icon: TrendingUp,
    category: "realtime",
  },
  {
    id: "combined-risk-alerts",
    title: "복합 리스크 경고",
    description:
      "여러 위험 요인이 동시 발생한 사용자를 보여주는 경고 목록입니다.",
    icon: AlertTriangle,
    category: "realtime",
  },
  {
    id: "onboarding-funnel",
    title: "온보딩 현황 퍼널",
    description: "가입부터 첫 데이터 기록까지의 사용자 전환율을 시각화합니다.",
    icon: BarChart3,
    category: "analysis",
  },
  {
    id: "power-inactive-users",
    title: "파워 유저 / 비활성 유저",
    description: "가장 활발하거나 비활성 상태인 사용자 목록을 보여줍니다.",
    icon: List,
    category: "analysis",
  },
  {
    id: "metric-volatility",
    title: "지표 변동성 분석",
    description: "건강 데이터의 변동 폭이 가장 큰 사용자들을 보여줍니다.",
    icon: Activity,
    category: "analysis",
  },
  {
    id: "metric-improvement",
    title: "지표 개선/악화 상위 사용자",
    description:
      "건강 지표가 가장 많이 개선되거나 악화된 상위 사용자 목록입니다.",
    icon: ArrowUpDown,
    category: "analysis",
  },
  {
    id: "health-distribution",
    title: "건강 지표 분포도",
    description:
      "특정 지표의 정상, 주의, 위험 구간에 따른 사용자 분포를 보여줍니다.",
    icon: PieChart,
    category: "data",
  },
  {
    id: "health-trend-prediction",
    title: "건강 트렌드 예측",
    description: "현재 데이터를 기반으로 미래의 건강 점수 추세를 예측합니다.",
    icon: LineChart,
    category: "data",
  },
];

export function AddWidgetModal({
  isOpen,
  onClose,
  onAddWidgets,
  addedWidgetIds = [],
}: AddWidgetModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "realtime" | "analysis" | "data"
  >("all");
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);

  const handleWidgetToggle = (widgetId: string) => {
    if (addedWidgetIds.includes(widgetId)) return;

    setSelectedWidgets((prev) =>
      prev.includes(widgetId)
        ? prev.filter((id) => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const handleAddWidgets = () => {
    if (onAddWidgets && selectedWidgets.length > 0) {
      onAddWidgets(selectedWidgets);
      setSelectedWidgets([]);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedWidgets([]);
    setSearchQuery("");
    setActiveCategory("all");
    onClose();
  };

  const filteredWidgets = allWidgets.filter((widget) => {
    const matchesSearch =
      widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || widget.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isOpen) return null;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <DialogPrimitive.Content className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-[900px] p-0 bg-white rounded-2xl shadow-theme-300 max-h-[90vh]">
          <DialogPrimitive.Title className="sr-only">
            위젯 추가하기
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            대시보드에 추가할 위젯을 선택하세요
          </DialogPrimitive.Description>

          <button
            onClick={handleClose}
            className="absolute top-6 right-6 z-10 rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-theme-gray-100" />
          </button>

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-theme-white-200">
            <h2 className="mb-4 text-2xl text-theme-black-100">
              위젯 추가하기
            </h2>

            {/* Search Bar */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-gray-100"
              />
              <Input
                type="text"
                placeholder="추가할 위젯을 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-12 rounded-lg border-theme-white-200 bg-theme-white-100"
              />
            </div>
          </div>

          <div className={cn("px-8 py-6 overflow-y-auto h-[calc(90vh-480px)]")}>
            <Tabs
              value={activeCategory}
              onValueChange={(value) => setActiveCategory(value as any)}
            >
              <TabsList className="mb-6 h-12 rounded-lg p-1 bg-theme-white-100 border border-theme-white-200">
                <TabsTrigger
                  value="all"
                  className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                >
                  전체
                </TabsTrigger>
                <TabsTrigger
                  value="realtime"
                  className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                >
                  실시간 모니터링
                </TabsTrigger>
                <TabsTrigger
                  value="analysis"
                  className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                >
                  사용자 분석
                </TabsTrigger>
                <TabsTrigger
                  value="data"
                  className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                >
                  데이터 및 예측
                </TabsTrigger>
              </TabsList>

              {/* Widget Grid */}
              <div className="grid grid-cols-3 gap-4">
                {filteredWidgets.map((widget) => {
                  const Icon = widget.icon;
                  const isAdded = addedWidgetIds.includes(widget.id);
                  const isSelected = selectedWidgets.includes(widget.id);

                  return (
                    <button
                      key={widget.id}
                      onClick={() => handleWidgetToggle(widget.id)}
                      disabled={isAdded}
                      className={cn(
                        "relative p-5 rounded-xl text-left transition-all group",
                        isAdded
                          ? "bg-theme-white-100 cursor-not-allowed opacity-60"
                          : "bg-white cursor-pointer opacity-100",
                        isSelected
                          ? "border border-primary"
                          : "border border-theme-white-200"
                      )}
                    >
                      {/* Icon */}
                      <div
                        className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center mb-3",
                          isAdded ? "bg-theme-white-500" : "bg-theme-white-600"
                        )}
                      >
                        <Icon
                          size={24}
                          style={{
                            color: isAdded ? "#8A8A8E" : "#007AFF",
                          }}
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className={cn(
                          "mb-2 text-sm leading-[1.4]",
                          isAdded
                            ? "text-theme-gray-100"
                            : "text-theme-black-100"
                        )}
                      >
                        {widget.title}
                      </h3>

                      <p className="text-sm text-theme-gray-100 leading-normal">
                        {widget.description}
                      </p>

                      {isSelected && !isAdded && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center bg-primary">
                          <IconChecked />
                        </div>
                      )}

                      {/* Added Badge */}
                      {isAdded && (
                        <div className="absolute top-4 right-4 px-2 py-1 rounded bg-theme-white-500 text-theme-gray-100 text-xs">
                          추가됨
                        </div>
                      )}

                      {!isAdded && (
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-theme-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Empty State */}
              {filteredWidgets.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm text-theme-gray-100">
                    검색 결과가 없습니다.
                  </p>
                </div>
              )}
            </Tabs>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 flex items-center justify-between border-t border-theme-white-200">
            <div className="text-sm text-theme-gray-100">
              {selectedWidgets.length > 0 && (
                <span>{selectedWidgets.length}개의 위젯 선택됨</span>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleClose}
                className="h-11 px-6 rounded-lg bg-theme-white-200 text-theme-black-100"
              >
                취소
              </Button>
              <Button
                onClick={handleAddWidgets}
                disabled={selectedWidgets.length === 0}
                className={cn(
                  "h-11 px-6 rounded-lg",
                  selectedWidgets.length > 0
                    ? "bg-primary text-white cursor-pointer"
                    : "bg-theme-white-500 text-theme-gray-100 cursor-not-allowed"
                )}
              >
                대시보드에 추가
              </Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
