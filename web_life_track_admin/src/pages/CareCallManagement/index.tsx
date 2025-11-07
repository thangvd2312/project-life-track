import { useState } from "react";
import { Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { UserDetailModal } from "@/components/modals/UserDetailModal";
import { ScriptViewerModal } from "@/components/modals/ScriptViewerModal";

interface CareCall {
  id: string;
  userName: string;
  date: string;
  time: string;
  manager: string;
  organization: string;
}

const mockCareCallData: CareCall[] = [
  {
    id: "1",
    userName: "홍길동",
    date: "2025-10-23",
    time: "10:00",
    manager: "김담당",
    organization: "120재단",
  },
  {
    id: "2",
    userName: "김영희",
    date: "2025-10-23",
    time: "14:30",
    manager: "이담당",
    organization: "봉사단",
  },
  {
    id: "3",
    userName: "박철수",
    date: "2025-10-23",
    time: "16:00",
    manager: "김담당",
    organization: "120재단",
  },
];

export default function CareCallManagementPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 9, 23)); // Oct 23, 2025
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleUserClick = (userName: string) => {
    setSelectedUser(userName);
    setIsUserModalOpen(true);
  };

  const handleScriptClick = () => {
    setIsScriptModalOpen(true);
  };

  return (
    <div className="p-8">
      {/* Page Title */}
      <h1 className="mb-6" style={{ fontSize: "24px", color: "#1C1C1E" }}>
        맞춤 안부콜 관리
      </h1>

      {/* Filter Bar */}
      <div
        className="p-6 rounded-lg mb-6"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #F2F2F7",
        }}
      >
        <div className="flex items-center gap-4">
          <label
            htmlFor="date-picker"
            style={{
              fontSize: "14px",
              color: "#1C1C1E",
              minWidth: "80px",
            }}
          >
            안부콜 일자
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start"
                style={{
                  height: "40px",
                  borderColor: "#F2F2F7",
                  backgroundColor: "#FFFFFF",
                  color: "#1C1C1E",
                  fontSize: "14px",
                }}
              >
                <Calendar
                  size={16}
                  className="mr-2"
                  style={{ color: "#8A8A8E" }}
                />
                {selectedDate
                  ? format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })
                  : "날짜 선택"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Care Call List Table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #F2F2F7",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow
              style={{
                backgroundColor: "#F8F9FA",
                borderBottom: "1px solid #F2F2F7",
              }}
            >
              <TableHead
                style={{
                  color: "#1C1C1E",
                  fontSize: "14px",
                  padding: "16px 24px",
                }}
              >
                이용자
              </TableHead>
              <TableHead
                style={{
                  color: "#1C1C1E",
                  fontSize: "14px",
                  padding: "16px 24px",
                }}
              >
                안부콜 일자
              </TableHead>
              <TableHead
                style={{
                  color: "#1C1C1E",
                  fontSize: "14px",
                  padding: "16px 24px",
                }}
              >
                시간
              </TableHead>
              <TableHead
                style={{
                  color: "#1C1C1E",
                  fontSize: "14px",
                  padding: "16px 24px",
                }}
              >
                담당자
              </TableHead>
              <TableHead
                style={{
                  color: "#1C1C1E",
                  fontSize: "14px",
                  padding: "16px 24px",
                }}
              >
                소속
              </TableHead>
              <TableHead
                style={{
                  color: "#1C1C1E",
                  fontSize: "14px",
                  padding: "16px 24px",
                }}
              >
                스크립트
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCareCallData.map((call) => (
              <TableRow
                key={call.id}
                style={{ borderBottom: "1px solid #F2F2F7" }}
              >
                <TableCell style={{ padding: "16px 24px" }}>
                  <button
                    onClick={() => handleUserClick(call.userName)}
                    className="hover:opacity-70 transition-opacity"
                    style={{
                      color: "#007AFF",
                      fontSize: "14px",
                      textDecoration: "underline",
                    }}
                  >
                    {call.userName}
                  </button>
                </TableCell>
                <TableCell
                  style={{
                    color: "#1C1C1E",
                    fontSize: "14px",
                    padding: "16px 24px",
                  }}
                >
                  {call.date}
                </TableCell>
                <TableCell
                  style={{
                    color: "#1C1C1E",
                    fontSize: "14px",
                    padding: "16px 24px",
                  }}
                >
                  {call.time}
                </TableCell>
                <TableCell
                  style={{
                    color: "#1C1C1E",
                    fontSize: "14px",
                    padding: "16px 24px",
                  }}
                >
                  {call.manager}
                </TableCell>
                <TableCell
                  style={{
                    color: "#1C1C1E",
                    fontSize: "14px",
                    padding: "16px 24px",
                  }}
                >
                  {call.organization}
                </TableCell>
                <TableCell style={{ padding: "16px 24px" }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleScriptClick}
                    className="h-8 px-4"
                    style={{
                      borderColor: "#F2F2F7",
                      backgroundColor: "#FFFFFF",
                      color: "#1C1C1E",
                      fontSize: "13px",
                    }}
                  >
                    [ 보기 ]
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <UserDetailModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        userName={selectedUser || ""}
      />

      <ScriptViewerModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
      />
    </div>
  );
}
