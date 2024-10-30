"use client";

import { useEffect, useState } from "react";
import { User } from "@/app/interfaces/user";
import BalanceCard from "../balanceCard";
import Sidebar from "../sidebar";
import TransactionHistory from "../transactionalHistory";
import TransactionForm from "../transactionForm";
import { useRouter } from "next/navigation";
import InvestmentsCard from "../investments";
import OtherServicesCard from "../other-services";

export default function Dashboard() {
  const router = useRouter();
  const [storedUser, setStoredUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [transactionHistoryUpdated, setTransactionHistoryUpdated] = useState<boolean>(false);

  const fetchUserData = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setStoredUser(JSON.parse(user));
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleTransactionUpdate = () => {
    setTransactionHistoryUpdated(!transactionHistoryUpdated);
  };

  const renderTransactionComponent = (user: User) => {
    switch (activeSection) {
      case "dashboard":
        return <TransactionForm user={user} updateUser={fetchUserData} onTransactionSubmit={handleTransactionUpdate} />;
      case "transactions":
        return <TransactionForm user={user} updateUser={fetchUserData} onTransactionSubmit={handleTransactionUpdate} />;
      case "investments":
        return <InvestmentsCard />;
      case "other-services":
        return <OtherServicesCard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:m-auto">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-4 md:p-8 flex flex-col space-y-8 ">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="flex-1">
            {storedUser && <BalanceCard user={storedUser} />}
            {storedUser && renderTransactionComponent(storedUser)}
          </div>
        </div>
      </main>
      <TransactionHistory updateHistoryTrigger={transactionHistoryUpdated} />
    </div>
  );
}
