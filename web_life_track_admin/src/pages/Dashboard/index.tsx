import { useState } from "react";
import { Edit3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HighRiskMonitoring,
  HealthDistribution,
  HealthTrendPrediction,
  CombinedRiskAlerts,
} from "@/pages/Dashboard/charts";
import { AddWidgetModal } from "@/components/modals/AddWidgetModal";

const DashboardPage = () => {
  const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false);
  const [addedWidgetIds, setAddedWidgetIds] = useState<string[]>([
    "high-risk-monitoring",
    "health-distribution",
    "health-trend-prediction",
    "combined-risk-alerts",
  ]);

  const handleAddWidgets = (widgetIds: string[]) => {
    setAddedWidgetIds((prev) => [...prev, ...widgetIds]);
    console.log("Adding widgets:", widgetIds);
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-theme-black-100">통합 대시보드</h1>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsAddWidgetModalOpen(true)}
            className="flex items-center gap-2 h-10 px-4 rounded-lg text-sm"
          >
            <Plus size={16} /> 위젯 추가
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 h-10 px-4 rounded-lg border border-theme-white-200 text-theme-black-100 text-sm bg-white"
          >
            <Edit3 size={16} /> 대시보드 편집
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <HighRiskMonitoring />
        <HealthDistribution />
        <HealthTrendPrediction />
        <CombinedRiskAlerts />
      </div>

      <AddWidgetModal
        isOpen={isAddWidgetModalOpen}
        onClose={() => setIsAddWidgetModalOpen(false)}
        onAddWidgets={handleAddWidgets}
        addedWidgetIds={addedWidgetIds}
      />
    </div>
  );
};

export default DashboardPage;
