import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScriptViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScriptViewerModal({ isOpen, onClose }: ScriptViewerModalProps) {
  const handlePdfDownload = () => {
    // Simulate PDF download
    console.log("Downloading PDF...");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[900px] p-0 max-h-[90vh]"
        style={{
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          border: "none",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <DialogTitle className="sr-only">안부콜 스크립트</DialogTitle>
        <DialogDescription className="sr-only">
          안부콜 스크립트 상세 내용을 확인합니다.
        </DialogDescription>

        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6"
          style={{ borderBottom: "1px solid #F2F2F7" }}
        >
          <h2 style={{ fontSize: "20px", color: "#1C1C1E" }}>
            안부콜 스크립트
          </h2>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePdfDownload}
              className="h-9 px-4"
              style={{
                borderColor: "#F2F2F7",
                backgroundColor: "#FFFFFF",
                color: "#1C1C1E",
                fontSize: "13px",
              }}
            >
              <Download size={16} className="mr-2" />[ PDF 다운로드 ]
            </Button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: "#8A8A8E" }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="flex" style={{ height: "calc(90vh - 88px)" }}>
          {/* Left Column - Information Panel */}
          <div
            className="w-[35%] p-6 overflow-y-auto"
            style={{
              backgroundColor: "#F8F9FA",
              borderRight: "1px solid #E5E5EA",
            }}
          >
            {/* Section 1: 이용자 정보 */}
            <div className="mb-6">
              <h3
                className="mb-4"
                style={{ fontSize: "16px", color: "#1C1C1E" }}
              >
                이용자 정보
              </h3>
              <div className="space-y-3">
                <div>
                  <div style={{ fontSize: "13px", color: "#8A8A8E" }}>이름</div>
                  <div
                    style={{ fontSize: "14px", color: "#1C1C1E" }}
                    className="mt-1"
                  >
                    홍길동 (82세)
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#8A8A8E" }}>
                    연락처
                  </div>
                  <div
                    style={{ fontSize: "14px", color: "#1C1C1E" }}
                    className="mt-1"
                  >
                    010-1234-5678
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: AI 분석 결과 요약 */}
            <div className="mb-6">
              <h3
                className="mb-4"
                style={{ fontSize: "16px", color: "#1C1C1E" }}
              >
                AI 분석 결과 요약
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <AlertTriangle
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#FF9500" }}
                  />
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#1C1C1E",
                      lineHeight: "1.5",
                    }}
                  >
                    <span style={{ color: "#1C1C1E" }}>식단:</span> 당류 및
                    불포화지방 섭취 비율이 목표치보다 15% 높음.
                  </div>
                </div>
                <div className="flex gap-2">
                  <AlertTriangle
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#FF9500" }}
                  />
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#1C1C1E",
                      lineHeight: "1.5",
                    }}
                  >
                    <span style={{ color: "#1C1C1E" }}>복약:</span> 아침 혈압약
                    복약 이행률 85% (주말 오전 누락 발생).
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: 안부콜 일정 */}
            <div>
              <h3
                className="mb-4"
                style={{ fontSize: "16px", color: "#1C1C1E" }}
              >
                안부콜 일정
              </h3>
              <div className="space-y-3">
                <div>
                  <div style={{ fontSize: "13px", color: "#8A8A8E" }}>일시</div>
                  <div
                    style={{ fontSize: "14px", color: "#1C1C1E" }}
                    className="mt-1"
                  >
                    2025-10-24 10:00 AM
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#8A8A8E" }}>
                    담당자
                  </div>
                  <div
                    style={{ fontSize: "14px", color: "#1C1C1E" }}
                    className="mt-1"
                  >
                    김상담 (120재단)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Script Panel */}
          <div className="w-[65%] p-6 overflow-y-auto">
            {/* Section 1: 오프닝 */}
            <div className="mb-8">
              <h3
                className="mb-4"
                style={{ fontSize: "16px", color: "#1C1C1E" }}
              >
                🕐 1. 오프닝 (30초)
              </h3>

              <div className="mb-4">
                <div
                  className="px-4 py-2 rounded-t-lg"
                  style={{
                    backgroundColor: "#E3F2FD",
                    color: "#1976D2",
                    fontSize: "13px",
                  }}
                >
                  상담사 멘트
                </div>
                <div
                  className="px-4 py-4 rounded-b-lg"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E5E5EA",
                    borderTop: "none",
                    fontSize: "14px",
                    color: "#1C1C1E",
                    lineHeight: "1.6",
                  }}
                >
                  "안녕하세요, 어르신! 120재단 건강관리팀 김상담입니다. 오늘
                  컨디션은 어떠신가요? 요즘 날씨가 많이 쌀쌀해졌는데 건강 관리
                  잘 하고 계시는지 확인차 전화 드렸어요."
                </div>
              </div>

              <div className="mb-4">
                <div
                  className="px-4 py-2 rounded-t-lg"
                  style={{
                    backgroundColor: "#FFF9E6",
                    color: "#F57C00",
                    fontSize: "13px",
                  }}
                >
                  실무 메모
                </div>
                <div
                  className="px-4 py-4 rounded-b-lg"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E5E5EA",
                    borderTop: "none",
                    fontSize: "14px",
                    color: "#1C1C1E",
                    lineHeight: "1.6",
                  }}
                >
                  • 통화 초반 어르신의 음성 톤과 에너지 수준을 파악합니다.
                  <br />• 불편한 점이 있다면 경청하고 공감을 표현합니다.
                </div>
              </div>
            </div>

            {/* Section 2: 건강 안부 및 데이터 기반 솔루션 */}
            <div className="mb-8">
              <h3
                className="mb-4"
                style={{ fontSize: "16px", color: "#1C1C1E" }}
              >
                🍚 2. 건강 안부 및 데이터 기반 솔루션 (2분 30초)
              </h3>

              <div className="mb-4">
                <div
                  className="px-4 py-2 rounded-t-lg"
                  style={{
                    backgroundColor: "#E3F2FD",
                    color: "#1976D2",
                    fontSize: "13px",
                  }}
                >
                  상담사 멘트
                </div>
                <div
                  className="px-4 py-4 rounded-b-lg"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E5E5EA",
                    borderTop: "none",
                    fontSize: "14px",
                    color: "#1C1C1E",
                    lineHeight: "1.6",
                  }}
                >
                  <p className="mb-3">
                    "어르신, 지난주 건강 데이터를 확인해 봤는데요, 전반적으로 잘
                    관리하고 계시네요! 다만 몇 가지 개선하면 좋을 부분을
                    말씀드릴게요."
                  </p>

                  <p className="mb-3">
                    <span style={{ color: "#FF9500" }}>▪ 식단 관련:</span>
                    <br />
                    "요즘 단 음식이나 기름진 음식을 조금 많이 드신 것 같아요.
                    당류와 불포화지방 섭취가 목표치보다 15% 정도 높게
                    나왔거든요. 혹시 최근에 특별히 드신 음식이 있으신가요?"
                    <br />
                    (어르신 응답 청취)
                    <br />
                    "아, 그러셨군요. 그럼 이번 주는 조금만 조절해 보시면
                    어떨까요? 간식은 과일로 드시고, 기름진 음식 대신 채소 위주로
                    드시면 좋을 것 같아요."
                  </p>

                  <p>
                    <span style={{ color: "#FF9500" }}>▪ 복약 관련:</span>
                    <br />
                    "혈압약은 잘 챙겨 드시고 계신데, 주말 아침에 가끔 빼먹으시는
                    것 같더라고요. 이행률이 85%인데, 100%로 올리면 혈압 관리가
                    훨씬 안정될 거예요. 혹시 잊으시나요, 아니면 불편한 점이
                    있으신가요?"
                    <br />
                    (어르신 응답 청취)
                    <br />
                    "알겠습니다. 그럼 제가 주말 아침에 문자 알림을 한 번 더
                    보내드릴게요. 약은 꼭 아침 식사 후에 드시는 게 중요하니까 꼭
                    기억해 주세요!"
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div
                  className="px-4 py-2 rounded-t-lg"
                  style={{
                    backgroundColor: "#FFF9E6",
                    color: "#F57C00",
                    fontSize: "13px",
                  }}
                >
                  실무 메모
                </div>
                <div
                  className="px-4 py-4 rounded-b-lg"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E5E5EA",
                    borderTop: "none",
                    fontSize: "14px",
                    color: "#1C1C1E",
                    lineHeight: "1.6",
                  }}
                >
                  • AI 분석 결과를 기반으로 구체적인 수치(15%, 85%)를 언급하여
                  신뢰감을 높입니다.
                  <br />
                  • 어르신이 방어적으로 반응하지 않도록 긍정적인 톤을
                  유지합니다.
                  <br />• 실질적인 해결책(과일 간식, 문자 알림)을 제시하여 행동
                  변화를 유도합니다.
                </div>
              </div>
            </div>

            {/* Section 3: 심리/생활 지원 */}
            <div className="mb-8">
              <h3
                className="mb-4"
                style={{ fontSize: "16px", color: "#1C1C1E" }}
              >
                💬 3. 심리/생활 지원 (1분 30초)
              </h3>

              <div className="mb-4">
                <div
                  className="px-4 py-2 rounded-t-lg"
                  style={{
                    backgroundColor: "#E3F2FD",
                    color: "#1976D2",
                    fontSize: "13px",
                  }}
                >
                  상담사 멘트
                </div>
                <div
                  className="px-4 py-4 rounded-b-lg"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E5E5EA",
                    borderTop: "none",
                    fontSize: "14px",
                    color: "#1C1C1E",
                    lineHeight: "1.6",
                  }}
                >
                  <p className="mb-3">
                    "어르신, 요즘 기분은 어떠세요? 혹시 외로우시거나 답답하신 건
                    없으신가요?"
                    <br />
                    (어르신 응답 청취)
                  </p>

                  <p className="mb-3">
                    "그러시군요. 날씨가 추워지면서 밖에 나가기도 힘드실 텐데,
                    집에서라도 가벼운 스트레칭이나 산책을 하시면 기분 전환에
                    도움이 되실 거예요. 혹시 요즘 재미있게 보시는 TV
                    프로그램이나 취미 활동이 있으신가요?"
                    <br />
                    (어르신 응답 청취)
                  </p>

                  <p>
                    "아, 그거 좋으시네요! 그런 활동들이 건강에도 정말 좋답니다.
                    앞으로도 계속 즐겁게 하세요!"
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div
                  className="px-4 py-2 rounded-t-lg"
                  style={{
                    backgroundColor: "#FFF9E6",
                    color: "#F57C00",
                    fontSize: "13px",
                  }}
                >
                  실무 메모
                </div>
                <div
                  className="px-4 py-4 rounded-b-lg"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E5E5EA",
                    borderTop: "none",
                    fontSize: "14px",
                    color: "#1C1C1E",
                    lineHeight: "1.6",
                  }}
                >
                  • 어르신의 심리 상태를 파악하고 정서적 지원을 제공합니다.
                  <br />
                  • 긍정적인 활동이나 취미를 격려하여 삶의 질을 높입니다.
                  <br />• 어르신이 언급한 긍정적인 내용(가족, 취미 등)을
                  기억하여 클로징에 활용합니다.
                </div>
              </div>
            </div>

            {/* Section 4: 클로징 */}
            <div className="mb-4">
              <h3
                className="mb-4"
                style={{ fontSize: "16px", color: "#1C1C1E" }}
              >
                💛 4. 클로징 (30초)
              </h3>

              <div className="mb-4">
                <div
                  className="px-4 py-2 rounded-t-lg"
                  style={{
                    backgroundColor: "#E3F2FD",
                    color: "#1976D2",
                    fontSize: "13px",
                  }}
                >
                  상담사 멘트
                </div>
                <div
                  className="px-4 py-4 rounded-b-lg"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E5E5EA",
                    borderTop: "none",
                    fontSize: "14px",
                    color: "#1C1C1E",
                    lineHeight: "1.6",
                  }}
                >
                  "어르신, 오늘도 건강하게 잘 지내고 계셔서 정말 다행이에요.
                  앞으로도 건강 관리 잘 하시고, 불편한 점 있으시면 언제든지 연락
                  주세요. 다음 주에 또 안부 전화 드릴게요. 건강하세요!"
                </div>
              </div>

              <div>
                <div
                  className="px-4 py-2 rounded-t-lg"
                  style={{
                    backgroundColor: "#FFF9E6",
                    color: "#F57C00",
                    fontSize: "13px",
                  }}
                >
                  실무 메모
                </div>
                <div
                  className="px-4 py-4 rounded-b-lg"
                  style={{
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #E5E5EA",
                    borderTop: "none",
                    fontSize: "14px",
                    color: "#1C1C1E",
                    lineHeight: "1.6",
                  }}
                >
                  <span style={{ color: "#1C1C1E" }}>**[개인화]**</span> 통화 중
                  어르신이 긍정적으로 언급한 내용(예: 가족, 취미)을 다시
                  언급하며 따뜻하게 마무리.
                  <br />
                  <br />
                  예시: "손주분들 만나시는 거 정말 즐거워하시는 것 같아서 보기
                  좋았어요. 다음에 또 만나시면 즐거운 시간 보내세요!"
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
