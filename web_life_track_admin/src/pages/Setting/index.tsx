import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { AccountCreationModal } from "@/components/modals/AccountCreationModal";
import { CreateGroupModal } from "@/components/modals/CreateGroupModal";
import { EditRuleModal } from "@/components/modals/EditRuleModal";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("admins");
  const [isAccountCreationOpen, setIsAccountCreationOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isEditRuleOpen, setIsEditRuleOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<any>(null);

  // Mock admin data
  const admins = [
    {
      id: 1,
      name: "김관리자",
      email: "admin@healthlab.com",
      role: "슈퍼 관리자",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "이매니저",
      email: "manager@healthlab.com",
      role: "관리자",
      createdDate: "2024-03-20",
    },
    {
      id: 3,
      name: "박운영자",
      email: "operator@healthlab.com",
      role: "운영자",
      createdDate: "2024-06-10",
    },
  ];

  // Mock group data
  const groups = [
    {
      id: 1,
      name: "고혈압",
      memberCount: 24,
      color: "#FF3B30",
    },
    {
      id: 2,
      name: "당뇨",
      memberCount: 18,
      color: "#FF9500",
    },
    {
      id: 3,
      name: "비만",
      memberCount: 15,
      color: "#FFCC00",
    },
    {
      id: 4,
      name: "심혈관",
      memberCount: 12,
      color: "#FF2D55",
    },
  ];

  // Mock risk rules
  const riskRules = [
    {
      id: 1,
      title: "고혈압 판단 기준",
      description: "수축기 140mmHg 이상일 때 '주의' 리스크 발생",
      category: "혈압",
    },
    {
      id: 2,
      title: "저혈압 판단 기준",
      description: "수축기 90mmHg 이하일 때 '주의' 리스크 발생",
      category: "혈압",
    },
    {
      id: 3,
      title: "고혈당 판단 기준",
      description: "공복 혈당 126mg/dL 이상일 때 '위험' 리스크 발생",
      category: "혈당",
    },
    {
      id: 4,
      title: "BMI 비만 기준",
      description: "BMI 25 이상일 때 '주의' 리스크 발생",
      category: "체중",
    },
  ];

  // Mock biomarkers
  const [biomarkers, setBiomarkers] = useState([
    { id: 1, name: "혈압", enabled: true },
    { id: 2, name: "혈당", enabled: true },
    { id: 3, name: "체중", enabled: true },
    { id: 4, name: "체온", enabled: false },
    { id: 5, name: "심박수", enabled: true },
    { id: 6, name: "산소포화도", enabled: false },
    { id: 7, name: "콜레스테롤", enabled: true },
  ]);

  const handleToggleBiomarker = (id: number) => {
    setBiomarkers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b))
    );
  };

  const handleEditRule = (rule: any) => {
    setSelectedRule(rule);
    setIsEditRuleOpen(true);
  };

  const handleDeleteAdmin = (adminId: number) => {
    console.log("Delete admin:", adminId);
  };

  const handleDeleteGroup = (groupId: number) => {
    console.log("Delete group:", groupId);
  };

  const handleManageMembers = (groupId: number) => {
    console.log("Manage members for group:", groupId);
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
        설정
      </h1>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className="mb-6 h-12 rounded-lg p-1"
          style={{
            backgroundColor: "#F8F9FA",
            border: "1px solid #F2F2F7",
          }}
        >
          <TabsTrigger
            value="admins"
            className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            style={{
              fontSize: "14px",
            }}
          >
            관리자 계정
          </TabsTrigger>
          <TabsTrigger
            value="groups"
            className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            style={{
              fontSize: "14px",
            }}
          >
            이용자 그룹
          </TabsTrigger>
          <TabsTrigger
            value="rules"
            className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            style={{
              fontSize: "14px",
            }}
          >
            리스크 규칙
          </TabsTrigger>
          <TabsTrigger
            value="biomarkers"
            className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            style={{
              fontSize: "14px",
            }}
          >
            바이오마커
          </TabsTrigger>
        </TabsList>

        {/* Admin Accounts Tab */}
        <TabsContent value="admins" className="space-y-6">
          {/* Action Bar */}
          <div className="flex justify-end">
            <Button
              onClick={() => setIsAccountCreationOpen(true)}
              className="h-10 px-6 rounded-lg"
              style={{
                backgroundColor: "#007AFF",
                color: "#FFFFFF",
              }}
            >
              <Plus size={16} className="mr-2" />새 관리자 추가
            </Button>
          </div>

          {/* Admin List Table */}
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
                      width: "20%",
                    }}
                  >
                    이름
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "30%",
                    }}
                  >
                    이메일
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "20%",
                    }}
                  >
                    역할
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "20%",
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
                    관리
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, idx) => (
                  <tr
                    key={admin.id}
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
                      {admin.name}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {admin.email}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {admin.role}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#8A8A8E",
                      }}
                    >
                      {admin.createdDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => console.log("Edit admin:", admin.id)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Edit size={16} style={{ color: "#007AFF" }} />
                        </button>
                        <button
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Trash2 size={16} style={{ color: "#FF3B30" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* User Groups Tab */}
        <TabsContent value="groups" className="space-y-6">
          {/* Action Bar */}
          <div className="flex justify-end">
            <Button
              onClick={() => setIsCreateGroupOpen(true)}
              className="h-10 px-6 rounded-lg"
              style={{
                backgroundColor: "#007AFF",
                color: "#FFFFFF",
              }}
            >
              <Plus size={16} className="mr-2" />새 그룹 추가
            </Button>
          </div>

          {/* Group List Table */}
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
                      width: "40%",
                    }}
                  >
                    그룹명
                  </th>
                  <th
                    className="px-6 py-4 text-left"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "30%",
                    }}
                  >
                    멤버 수
                  </th>
                  <th
                    className="px-6 py-4 text-center"
                    style={{
                      fontSize: "12px",
                      color: "#8A8A8E",
                      width: "30%",
                    }}
                  >
                    관리
                  </th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, idx) => (
                  <tr
                    key={group.id}
                    style={{
                      borderTop: idx > 0 ? "1px solid #F2F2F7" : "none",
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: group.color }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#1C1C1E",
                          }}
                        >
                          {group.name}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        fontSize: "14px",
                        color: "#1C1C1E",
                      }}
                    >
                      {group.memberCount}명
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => handleManageMembers(group.id)}
                          className="h-8 px-4 rounded-lg"
                          style={{
                            backgroundColor: "#F8F9FA",
                            color: "#007AFF",
                            border: "1px solid #F2F2F7",
                          }}
                        >
                          <Users size={14} className="mr-1" />
                          멤버 관리
                        </Button>
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Trash2 size={16} style={{ color: "#FF3B30" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Risk Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          {riskRules.map((rule) => (
            <div
              key={rule.id}
              className="p-6 rounded-xl flex items-center justify-between"
              style={{
                backgroundColor: "#F8F9FA",
                border: "1px solid #F2F2F7",
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 style={{ fontSize: "16px", color: "#1C1C1E" }}>
                    {rule.title}
                  </h3>
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "#E5E5EA",
                      color: "#8A8A8E",
                      fontSize: "11px",
                    }}
                  >
                    {rule.category}
                  </span>
                </div>
                <p style={{ fontSize: "14px", color: "#8A8A8E" }}>
                  {rule.description}
                </p>
              </div>
              <Button
                onClick={() => handleEditRule(rule)}
                className="h-9 px-5 rounded-lg ml-6"
                style={{
                  backgroundColor: "#007AFF",
                  color: "#FFFFFF",
                }}
              >
                수정
              </Button>
            </div>
          ))}
        </TabsContent>

        {/* Biomarkers Tab */}
        <TabsContent value="biomarkers" className="space-y-3">
          <div
            className="bg-white rounded-xl overflow-hidden"
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            {biomarkers.map((biomarker, idx) => (
              <div
                key={biomarker.id}
                className="px-6 py-5 flex items-center justify-between"
                style={{
                  borderTop: idx > 0 ? "1px solid #F2F2F7" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: "#1C1C1E",
                  }}
                >
                  {biomarker.name}
                </span>
                <Switch
                  checked={biomarker.enabled}
                  onCheckedChange={() => handleToggleBiomarker(biomarker.id)}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AccountCreationModal
        isOpen={isAccountCreationOpen}
        onClose={() => setIsAccountCreationOpen(false)}
      />
      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
      />
      <EditRuleModal
        isOpen={isEditRuleOpen}
        onClose={() => setIsEditRuleOpen(false)}
        rule={selectedRule}
      />
    </div>
  );
}
