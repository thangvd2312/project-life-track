import { useState } from "react";
import { Download } from "lucide-react";
import { generatePath, useNavigate } from "react-router-dom";
import { CreateCareCardModal } from "@/components/modals/CreateCareCardModal";
import {
  INITIAL_CARE_CARDS,
  MOCK_USERS,
  type CareCard,
  type User,
} from "@/constants/mock";
import { ACTIVITIES, RISKS } from "@/constants";
import type { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/datatable";
import { URL } from "@/constants/url";

const UserManagementPage = () => {
  const navigate = useNavigate();

  const [isCreateCareOpen, setIsCreateCareOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");

  const [careCards, setCareCards] = useState<CareCard[]>(INITIAL_CARE_CARDS);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "이용자 ID",
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "이용자명",
      enableSorting: false,
    },
    {
      accessorKey: "address",
      header: "이메일 주소",
      enableSorting: false,
    },
    {
      accessorKey: "riskStatus",
      header: "리스크 상태",
      enableSorting: false,
    },
    {
      accessorKey: "healthScore",
      header: "건강 점수",
      enableSorting: false,
    },
    {
      accessorKey: "recordDate",
      header: "최근 건강 기록일",
      enableSorting: false,
    },
    {
      accessorKey: "lastActive",
      header: "최근 접속일",
      enableSorting: false,
    },
  ];

  const handleUserRowClick = (user: User) => {
    const path = generatePath(URL.UserDetail, { userId: user.id });
    navigate(path);
  };

  const handleCreateCare = (data: any) => {
    const newCard = {
      id: careCards.length + 1,
      title: data.title,
      category: data.category,
      startDate: data.startDate,
      endDate: data.endDate,
      isExpiring: false,
    };
    setCareCards([...careCards, newCard]);
  };

  return (
    <div className="p-8 space-y-3">
      <h1 className="mb-6 text-3xl text-theme-black-100">이용자 관리</h1>

      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-theme-200">
        <Input
          placeholder="이름, 그룹으로tabpop 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs h-10 rounded-lg border border-theme-white-200 bg-white"
        />
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-[180px] h-10">
            <SelectValue placeholder="리스크 등급" />
          </SelectTrigger>
          <SelectContent>
            {RISKS.map((risk) => {
              return (
                <SelectItem key={risk.id} value={risk.value}>
                  {risk.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select value={activityFilter} onValueChange={setActivityFilter}>
          <SelectTrigger className="w-[180px] h-10">
            <SelectValue placeholder="최근 활동 여부" />
          </SelectTrigger>
          <SelectContent>
            {ACTIVITIES.map((activity) => {
              return (
                <SelectItem key={activity.id} value={activity.value}>
                  {activity.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="ml-auto h-10 rounded-lg text-primary border border-primary"
        >
          <Download size={16} className="mr-2" /> CSV로 내보내기
        </Button>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-theme-200">
        <DataTable
          columns={columns}
          data={MOCK_USERS}
          handleUserRowClick={handleUserRowClick}
        />
      </div>

      <CreateCareCardModal
        isOpen={isCreateCareOpen}
        onClose={() => setIsCreateCareOpen(false)}
        onSubmit={handleCreateCare}
      />
    </div>
  );
};

export default UserManagementPage;
