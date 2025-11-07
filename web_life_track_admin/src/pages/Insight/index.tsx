import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  Download,
  FileSpreadsheet,
  FileImage,
} from "lucide-react";
import { CreateReportModal } from "@/components/modals/CreateReportModal";
import { ReportViewerModal } from "@/components/modals/ReportViewerModal";
import { UploadMaterialModal } from "@/components/modals/UploadMaterialModal";

const hasReportsNotification = true;
const hasLibraryNotification = true;

function onTabRead(tab: string) {
  console.log(`Marked "${tab}" tab as read`);
}

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState("reports");
  const [reportSearchQuery, setReportSearchQuery] = useState("");
  const [librarySearchQuery, setLibrarySearchQuery] = useState("");
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
  const [isReportViewerOpen, setIsReportViewerOpen] = useState(false);
  const [isUploadMaterialOpen, setIsUploadMaterialOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Handle tab change and mark as read
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onTabRead) {
      if (value === "reports") {
        onTabRead("reports");
      } else if (value === "library") {
        onTabRead("library");
      }
    }
  };

  // Mark reports tab as read on mount (since it's the default tab)
  useEffect(() => {
    if (onTabRead) {
      onTabRead("reports");
    }
  }, []);

  // Mock reports data
  const reports = [
    {
      id: 1,
      name: "2025년 10월 건강 종합 리포트",
      topic: "종합 건강",
      target: "전체",
      date: "2025-10-05",
    },
    {
      id: 2,
      name: "고혈압 그룹 월간 분석",
      topic: "심혈관",
      target: "고혈압 그룹",
      date: "2025-10-01",
    },
    {
      id: 3,
      name: "홍길동 개인 리포트",
      topic: "종합 건강",
      target: "홍길동",
      date: "2025-09-28",
    },
    {
      id: 4,
      name: "주간 데이터 기록율 분석",
      topic: "데이터 품질",
      target: "전체",
      date: "2025-09-25",
    },
  ];

  // Mock library data
  const libraryItems = [
    {
      id: 1,
      name: "혈압 관리 가이드라인 2025",
      uploader: "김관리자",
      category: "심혈관",
      fileType: "pdf",
      date: "2025-09-15",
    },
    {
      id: 2,
      name: "당뇨병 환자 식단표",
      uploader: "이영양사",
      category: "내분비",
      fileType: "excel",
      date: "2025-09-10",
    },
    {
      id: 3,
      name: "운동 프로그램 안내서",
      uploader: "박트레이너",
      category: "생활습관",
      fileType: "pdf",
      date: "2025-09-05",
    },
  ];

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText size={18} style={{ color: "#FF3B30" }} />;
      case "excel":
        return <FileSpreadsheet size={18} style={{ color: "#34C759" }} />;
      case "word":
        return <FileText size={18} style={{ color: "#007AFF" }} />;
      case "image":
        return <FileImage size={18} style={{ color: "#FF9500" }} />;
      default:
        return <FileText size={18} style={{ color: "#8A8A8E" }} />;
    }
  };

  const handleReportClick = (report: any) => {
    setSelectedReport(report);
    setIsReportViewerOpen(true);
  };

  const handleCreateReport = (reportData: any) => {
    console.log("Creating report:", reportData);
    setIsCreateReportOpen(false);
  };

  const handleUploadMaterial = (materialData: any) => {
    console.log("Uploading material:", materialData);
    setIsUploadMaterialOpen(false);
  };

  return (
    <div className="p-8">
      {/* Page Title */}
      <h1
        className="mb-6"
        style={{
          fontSize: "28px",
          color: "#1C1C1E",
        }}
      >
        인사이트
      </h1>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList
          className="mb-6 h-12 rounded-lg p-1"
          style={{
            backgroundColor: "#F8F9FA",
            border: "1px solid #F2F2F7",
          }}
        >
          <TabsTrigger
            value="reports"
            className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm relative"
            style={{
              fontSize: "14px",
            }}
          >
            리포트
            {hasReportsNotification && (
              <div
                className="absolute top-2 right-2"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#007AFF",
                }}
              />
            )}
          </TabsTrigger>
          <TabsTrigger
            value="library"
            className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm relative"
            style={{
              fontSize: "14px",
            }}
          >
            자료실
            {hasLibraryNotification && (
              <div
                className="absolute top-2 right-2"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#007AFF",
                }}
              />
            )}
          </TabsTrigger>
        </TabsList>

        {/* Reports Tab Content */}
        <TabsContent value="reports" className="space-y-6">
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            {/* Left: Search */}
            <Input
              type="text"
              placeholder="리포트 이름으로 검색..."
              value={reportSearchQuery}
              onChange={(e) => setReportSearchQuery(e.target.value)}
              className="w-[400px] h-10 rounded-lg"
              style={{
                borderColor: "#F2F2F7",
                backgroundColor: "#FFFFFF",
              }}
            />

            {/* Right: Create Button */}
            <Button
              onClick={() => setIsCreateReportOpen(true)}
              className="h-10 px-6 rounded-lg"
              style={{
                backgroundColor: "#007AFF",
                color: "#FFFFFF",
              }}
            >
              <Plus size={16} className="mr-2" />
              리포트 생성
            </Button>
          </div>

          {/* Report List Table */}
          <div
            className="bg-white rounded-xl overflow-hidden"
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <table className="w-full">
              <thead style={{ backgroundColor: "#F8F9FA" }}>
                <tr>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "35%",
                    }}
                  >
                    리포트 이름
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "20%",
                    }}
                  >
                    항목
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "20%",
                    }}
                  >
                    대상(그룹/개인)
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "15%",
                    }}
                  >
                    생성일
                  </th>
                  <th
                    className="px-6 py-4 text-center"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "10%",
                    }}
                  >
                    다운로드
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, idx) => (
                  <tr
                    key={report.id}
                    onClick={() => handleReportClick(report)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{
                      borderTop: idx > 0 ? "1px solid #F2F2F7" : "none",
                    }}
                  >
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {report.name}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {report.topic}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {report.target}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#8A8A8E",
                      }}
                    >
                      {report.date}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Download report:", report.name);
                        }}
                        className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <FileText size={18} style={{ color: "#007AFF" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Library Tab Content */}
        <TabsContent value="library" className="space-y-6">
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            {/* Left: Search */}
            <Input
              type="text"
              placeholder="자료 검색..."
              value={librarySearchQuery}
              onChange={(e) => setLibrarySearchQuery(e.target.value)}
              className="w-[400px] h-10 rounded-lg"
              style={{
                borderColor: "#F2F2F7",
                backgroundColor: "#FFFFFF",
              }}
            />

            {/* Right: Upload Button */}
            <Button
              onClick={() => setIsUploadMaterialOpen(true)}
              className="h-10 px-6 rounded-lg"
              style={{
                backgroundColor: "#F8F9FA",
                color: "#007AFF",
                border: "1px solid #F2F2F7",
              }}
            >
              <Plus size={16} className="mr-2" />
              자료 업로드
            </Button>
          </div>

          {/* Library List Table */}
          <div
            className="bg-white rounded-xl overflow-hidden"
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <table className="w-full">
              <thead style={{ backgroundColor: "#F8F9FA" }}>
                <tr>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "30%",
                    }}
                  >
                    지식 콘텐츠 이름
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "15%",
                    }}
                  >
                    업로드한 사람
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "15%",
                    }}
                  >
                    카테고리
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "15%",
                    }}
                  >
                    파일 형식
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "15%",
                    }}
                  >
                    생성일
                  </th>
                  <th
                    className="px-6 py-4 text-center"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "10%",
                    }}
                  >
                    다운로드
                  </th>
                </tr>
              </thead>
              <tbody>
                {libraryItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    style={{
                      borderTop: idx > 0 ? "1px solid #F2F2F7" : "none",
                    }}
                  >
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {item.uploader}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {item.category}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getFileIcon(item.fileType)}
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#8A8A8E",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.fileType}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#8A8A8E",
                      }}
                    >
                      {item.date}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => console.log("Download:", item.name)}
                        className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download size={18} style={{ color: "#007AFF" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <CreateReportModal
        isOpen={isCreateReportOpen}
        onClose={() => setIsCreateReportOpen(false)}
        onSubmit={handleCreateReport}
      />
      <ReportViewerModal
        isOpen={isReportViewerOpen}
        onClose={() => setIsReportViewerOpen(false)}
        report={selectedReport}
      />
      <UploadMaterialModal
        isOpen={isUploadMaterialOpen}
        onClose={() => setIsUploadMaterialOpen(false)}
        onSubmit={handleUploadMaterial}
      />
    </div>
  );
}
