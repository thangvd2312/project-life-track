import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface UserSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedUsers: User[]) => void;
  alreadySelectedIds?: number[];
}

interface User {
  id: number;
  name: string;
  groups: string[];
  riskStatus: string;
}

const availableUsers: User[] = [
  {
    id: 1,
    name: "홍길동",
    groups: ["고혈압", "당뇨"],
    riskStatus: "2개 확인 필요",
  },
  { id: 2, name: "김영희", groups: ["비만"], riskStatus: "정상" },
  {
    id: 3,
    name: "이철수",
    groups: ["심혈관", "고혈압"],
    riskStatus: "1개 확인 필요",
  },
  { id: 4, name: "박민수", groups: ["당뇨"], riskStatus: "3개 확인 필요" },
  { id: 5, name: "정수진", groups: ["고혈압"], riskStatus: "정상" },
  {
    id: 6,
    name: "최동욱",
    groups: ["비만", "당뇨"],
    riskStatus: "2개 확인 필요",
  },
  { id: 7, name: "강서연", groups: ["심혈관"], riskStatus: "1개 확인 필요" },
];

export function UserSelectionModal({
  isOpen,
  onClose,
  onConfirm,
  alreadySelectedIds = [],
}: UserSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [selectedUserIds, setSelectedUserIds] =
    useState<number[]>(alreadySelectedIds);

  // Reset selection when modal opens with new alreadySelectedIds
  useEffect(() => {
    if (isOpen) {
      setSelectedUserIds(alreadySelectedIds);
    }
  }, [isOpen, alreadySelectedIds]);

  const handleToggleUser = (userId: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleConfirm = () => {
    const selectedUsers = availableUsers.filter((user) =>
      selectedUserIds.includes(user.id)
    );
    onConfirm(selectedUsers);
    onClose();
  };

  const handleCancel = () => {
    setSearchQuery("");
    setGroupFilter("all");
    onClose();
  };

  const filteredUsers = availableUsers.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGroup =
      groupFilter === "all" || user.groups.includes(groupFilter);
    return matchesSearch && matchesGroup;
  });

  const groupColors: { [key: string]: string } = {
    고혈압: "#FF3B30",
    당뇨: "#FF9500",
    비만: "#FFCC00",
    심혈관: "#FF2D55",
  };

  if (!isOpen) return null;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />

        {/* Content */}
        <DialogPrimitive.Content
          className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-[600px] p-0"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
          }}
        >
          <DialogPrimitive.Title className="sr-only">
            이용자 선택
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            케어 프로그램에 참여할 이용자를 선택합니다
          </DialogPrimitive.Description>

          {/* Header */}
          <div
            className="px-6 py-5 flex items-center justify-between"
            style={{
              borderBottom: "1px solid #F2F2F7",
            }}
          >
            <h2 style={{ fontSize: "20px", color: "#1C1C1E" }}>이용자 선택</h2>
            <button
              onClick={handleCancel}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X size={24} style={{ color: "#8A8A8E" }} />
            </button>
          </div>

          {/* Filter Bar */}
          <div
            className="px-6 py-4 flex items-center gap-3"
            style={{
              backgroundColor: "#F8F9FA",
              borderBottom: "1px solid #F2F2F7",
            }}
          >
            {/* Search Input */}
            <Input
              placeholder="이름으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-10 rounded-lg"
              style={{
                borderColor: "#F2F2F7",
                backgroundColor: "#FFFFFF",
              }}
            />

            {/* Group Filter */}
            <Select value={groupFilter} onValueChange={setGroupFilter}>
              <SelectTrigger className="w-[160px] h-10">
                <SelectValue placeholder="그룹 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 그룹</SelectItem>
                <SelectItem value="고혈압">고혈압</SelectItem>
                <SelectItem value="당뇨">당뇨</SelectItem>
                <SelectItem value="비만">비만</SelectItem>
                <SelectItem value="심혈관">심혈관</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User List Table */}
          <div
            className="overflow-y-auto"
            style={{
              maxHeight: "400px",
            }}
          >
            <table className="w-full">
              <thead
                className="sticky top-0"
                style={{ backgroundColor: "#F8F9FA" }}
              >
                <tr>
                  <th
                    className="px-6 py-3"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "60px",
                      textAlign: "left",
                    }}
                  >
                    {/* Checkbox column header - empty */}
                  </th>
                  <th
                    className="px-6 py-3 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "35%",
                    }}
                  >
                    이용자명
                  </th>
                  <th
                    className="px-6 py-3 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "65%",
                    }}
                  >
                    소속 그룹
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr
                    key={user.id}
                    onClick={() => handleToggleUser(user.id)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{
                      borderTop: idx > 0 ? "1px solid #F2F2F7" : "none",
                      backgroundColor: selectedUserIds.includes(user.id)
                        ? "#F0F8FF"
                        : "#FFFFFF",
                    }}
                  >
                    {/* Checkbox Column */}
                    <td className="px-6 py-4">
                      <Checkbox
                        checked={selectedUserIds.includes(user.id)}
                        onCheckedChange={() => handleToggleUser(user.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>

                    {/* User Name Column */}
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {user.name}
                    </td>

                    {/* Groups Column */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {user.groups.map((group) => (
                          <span
                            key={group}
                            className="px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: groupColors[group] || "#007AFF",
                              color: "#FFFFFF",
                              fontSize: "11px",
                            }}
                          >
                            [{group}]
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p style={{ fontSize: "14px", color: "#8A8A8E" }}>
                  검색 결과가 없습니다.
                </p>
              </div>
            )}
          </div>

          {/* Footer / Action Bar */}
          <div
            className="px-6 py-4 flex items-center justify-end gap-3"
            style={{
              borderTop: "1px solid #F2F2F7",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Button
              onClick={handleCancel}
              className="h-10 px-6 rounded-lg"
              style={{
                backgroundColor: "#F2F2F7",
                color: "#1C1C1E",
              }}
            >
              취소
            </Button>
            <Button
              onClick={handleConfirm}
              className="h-10 px-6 rounded-lg"
              style={{
                backgroundColor: "#007AFF",
                color: "#FFFFFF",
              }}
            >
              [ {selectedUserIds.length}명 선택 ]
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
