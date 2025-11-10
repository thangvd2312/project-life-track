import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDetailModal } from "@/components/modals/UserDetailModal";
import { CreateCareCardModal } from "@/components/modals/CreateCareCardModal";
import { INITIAL_CARE_CARDS, type CareCard, type User } from "@/constants/mock";
import { USER_MANAGEMENT_TABS } from "@/constants";
import UserListTab from "@/pages/UserManagement/UserListTab";
import UserCareTab from "@/pages/UserManagement/UserCareTab";

const UserManagementPage = () => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("users");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [isCreateCareOpen, setIsCreateCareOpen] = useState(false);

  const [careCards, setCareCards] = useState<CareCard[]>(INITIAL_CARE_CARDS);

  const handleUserRowClick = (user: User) => {
    setSelectedUser(user);
    setIsUserDetailOpen(true);
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

  useEffect(() => {
    if (location.state) {
      const initialTabFromState = location.state?.initialTab;
      if (initialTabFromState) {
        setActiveTab(initialTabFromState);
        window.history.replaceState(null, "", location.pathname);
      }
    }
  }, [location]);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl text-theme-black-100">이용자 관리</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 h-12 rounded-lg p-1 bg-theme-white-100 border border-theme-white-200">
          {USER_MANAGEMENT_TABS.map((tab) => {
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.value}
                className="h-10 px-6 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
              >
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <UserListTab handleUserRowClick={handleUserRowClick} />
        <UserCareTab
          careCards={careCards}
          setCareCards={setCareCards}
          setIsCreateCareOpen={setIsCreateCareOpen}
        />
        {/* Care Tab */}
      </Tabs>

      {/* Modals */}
      {selectedUser && (
        <UserDetailModal
          isOpen={isUserDetailOpen}
          onClose={() => setIsUserDetailOpen(false)}
          userName={selectedUser.name}
          userData={selectedUser}
        />
      )}
      <CreateCareCardModal
        isOpen={isCreateCareOpen}
        onClose={() => setIsCreateCareOpen(false)}
        onSubmit={handleCreateCare}
      />
    </div>
  );
};

export default UserManagementPage;
