import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACTIVITIES, GROUP_COLORS, RISKS } from "@/constants";
import { Button } from "@/components/ui/button";
import { MOCK_USERS, type User } from "@/constants/mock";
import DataTable from "@/components/datatable";

interface IUserListTabProps {
  handleUserRowClick: (user: User) => void;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "이용자명",
    enableSorting: true,
  },
  {
    accessorKey: "groups",
    header: "소속 그룹",
    enableSorting: false,
    cell: ({ row }) => {
      const userGroups: string[] = row.getValue("groups") || [];
      return (
        <div className="flex flex-wrap gap-1">
          {userGroups.map((group) => (
            <span
              key={group}
              className="px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: GROUP_COLORS[group] || "#007AFF",
                color: "#FFFFFF",
                fontSize: "11px",
              }}
            >
              [{group}]
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "riskStatus",
    enableSorting: true,
    header: "리스크 상태",
  },
  {
    accessorKey: "careStatus",
    enableSorting: true,
    header: "케어 상태 ",
  },
  {
    accessorKey: "inputTypes",
    enableSorting: false,
    header: "데이터 인풋",
  },
  {
    accessorKey: "outputTypes",
    enableSorting: false,
    header: "활성 바이오마커",
  },
  {
    accessorKey: "lastActive",
    enableSorting: true,
    header: "최근 활동일",
  },
];

const UserListTab = (props: IUserListTabProps) => {
  const { handleUserRowClick } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");

  return (
    <TabsContent value="users" className="space-y-4">
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-theme-200">
        <Input
          placeholder="이름, 그룹으로 검색"
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
    </TabsContent>
  );
};

export default UserListTab;
