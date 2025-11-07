import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ReportViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    id: number;
    name: string;
    topic: string;
    target: string;
    date: string;
  } | null;
}

// Mock chart data
const weeklyDataRate = [
  { day: '월', rate: 85 },
  { day: '화', rate: 92 },
  { day: '수', rate: 78 },
  { day: '목', rate: 88 },
  { day: '금', rate: 95 },
  { day: '토', rate: 82 },
  { day: '일', rate: 75 },
];

const healthMetrics = [
  { metric: '혈압', value: 88, baseline: 80 },
  { metric: '혈당', value: 75, baseline: 85 },
  { metric: '체중', value: 92, baseline: 90 },
  { metric: '운동', value: 65, baseline: 70 },
];

export function ReportViewerModal({ isOpen, onClose, report }: ReportViewerModalProps) {
  if (!isOpen || !report) return null;

  const handleDownload = () => {
    console.log("Downloading PDF for report:", report.name);
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
        
        {/* Content */}
        <DialogPrimitive.Content
          className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-[800px] max-h-[90vh] overflow-y-auto p-0"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
          }}
        >
          <DialogPrimitive.Title className="sr-only">{report.name}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            리포트 뷰어
          </DialogPrimitive.Description>

          {/* Header - Sticky */}
          <div 
            className="sticky top-0 z-10 px-8 py-6 flex items-center justify-between"
            style={{
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid #F2F2F7',
            }}
          >
            {/* Left: Title */}
            <h2 style={{ fontSize: '24px', color: '#1C1C1E' }}>
              {report.name}
            </h2>

            {/* Right: Download & Close */}
            <div className="flex items-center gap-3">
              <Button
                onClick={handleDownload}
                className="h-10 px-4 rounded-lg"
                style={{
                  backgroundColor: '#007AFF',
                  color: '#FFFFFF',
                }}
              >
                <Download size={16} className="mr-2" />
                PDF 다운로드
              </Button>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X size={24} style={{ color: '#8A8A8E' }} />
              </button>
            </div>
          </div>

          {/* Content Area - Scrollable */}
          <div className="px-8 py-8 space-y-8">
            {/* Report Metadata */}
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: '#F8F9FA' }}
            >
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div style={{ fontSize: '12px', color: '#8A8A8E' }} className="mb-1">
                    항목
                  </div>
                  <div style={{ fontSize: '14px', color: '#1C1C1E' }}>
                    {report.topic}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#8A8A8E' }} className="mb-1">
                    대상
                  </div>
                  <div style={{ fontSize: '14px', color: '#1C1C1E' }}>
                    {report.target}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#8A8A8E' }} className="mb-1">
                    생성일
                  </div>
                  <div style={{ fontSize: '14px', color: '#1C1C1E' }}>
                    {report.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div>
              <h3 className="mb-4" style={{ fontSize: '18px', color: '#1C1C1E' }}>
                요약
              </h3>
              <p style={{ fontSize: '14px', color: '#1C1C1E', lineHeight: '1.8' }}>
                본 리포트는 {report.target}의 {report.topic} 항목에 대한 주간 분석 결과입니다. 
                전반적인 데이터 기록율은 평균 85%로 양호한 수준을 보이고 있으며, 
                주요 건강 지표들은 목표 범위 내에서 안정적으로 유지되고 있습니다.
                특히 금요일의 데이터 기록율이 95%로 가장 높았으며, 
                일요일이 75%로 가장 낮은 수치를 기록했습니다.
              </p>
            </div>

            {/* Chart 1: Weekly Data Recording Rate */}
            <div>
              <h3 className="mb-4" style={{ fontSize: '18px', color: '#1C1C1E' }}>
                주간 데이터 기록율
              </h3>
              <div 
                className="p-6 rounded-xl"
                style={{ backgroundColor: '#F8F9FA', height: '300px' }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyDataRate} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                    <XAxis 
                      dataKey="day" 
                      stroke="#8A8A8E"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#8A8A8E"
                      style={{ fontSize: '12px' }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #F2F2F7',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#007AFF" 
                      strokeWidth={2}
                      dot={{ fill: '#007AFF', r: 4 }}
                      name="기록율 (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Health Metrics Comparison */}
            <div>
              <h3 className="mb-4" style={{ fontSize: '18px', color: '#1C1C1E' }}>
                건강 지표 달성률
              </h3>
              <div 
                className="p-6 rounded-xl"
                style={{ backgroundColor: '#F8F9FA', height: '300px' }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={healthMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
                    <XAxis 
                      dataKey="metric" 
                      stroke="#8A8A8E"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#8A8A8E"
                      style={{ fontSize: '12px' }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #F2F2F7',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: '12px' }}
                    />
                    <Bar dataKey="value" fill="#007AFF" name="현재 수치" />
                    <Bar dataKey="baseline" fill="#E5E5EA" name="목표 수치" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Findings */}
            <div>
              <h3 className="mb-4" style={{ fontSize: '18px', color: '#1C1C1E' }}>
                주요 발견사항
              </h3>
              <div 
                className="p-6 rounded-xl space-y-3"
                style={{ backgroundColor: '#F8F9FA' }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-2 h-2 rounded-full mt-2"
                    style={{ backgroundColor: '#34C759' }}
                  />
                  <p style={{ fontSize: '14px', color: '#1C1C1E', lineHeight: '1.6' }}>
                    전체 참여자의 데이터 기록율이 지난 주 대비 5% 향상되었습니다.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div 
                    className="w-2 h-2 rounded-full mt-2"
                    style={{ backgroundColor: '#007AFF' }}
                  />
                  <p style={{ fontSize: '14px', color: '#1C1C1E', lineHeight: '1.6' }}>
                    혈압 및 체중 관리 지표가 목표치를 상회하여 양호한 상태입니다.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div 
                    className="w-2 h-2 rounded-full mt-2"
                    style={{ backgroundColor: '#FF9500' }}
                  />
                  <p style={{ fontSize: '14px', color: '#1C1C1E', lineHeight: '1.6' }}>
                    주말 데이터 기록율이 평일 대비 낮으므로, 주말 리마인더 강화가 필요합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="mb-4" style={{ fontSize: '18px', color: '#1C1C1E' }}>
                권장사항
              </h3>
              <div 
                className="p-6 rounded-xl space-y-3"
                style={{ backgroundColor: '#F8F9FA' }}
              >
                <p style={{ fontSize: '14px', color: '#1C1C1E', lineHeight: '1.6' }}>
                  1. 주말 데이터 기록을 독려하기 위한 푸시 알림 시스템 도입
                </p>
                <p style={{ fontSize: '14px', color: '#1C1C1E', lineHeight: '1.6' }}>
                  2. 혈당 및 운동 항목의 지속적인 모니터링 필요
                </p>
                <p style={{ fontSize: '14px', color: '#1C1C1E', lineHeight: '1.6' }}>
                  3. 우수 참여자에 대한 인센티브 프로그램 검토
                </p>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
