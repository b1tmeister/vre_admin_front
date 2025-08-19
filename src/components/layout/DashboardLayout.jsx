import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

const DashboardLayout = ({ render }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSubSide, setShowSubSide] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [selectedTab, setSelectedTab] = useState("");

  const toggleSidebarCycle = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
    } else if (!showSubSide) {
      setShowSubSide(true);
    } else {
      setShowSubSide(false);
      setSidebarOpen(false);
    }
  };

  const toggleSideBar = () => {
    setSidebarOpen(true);
  };

  const mainMarginClass = cn(
    "transition-all duration-300",
    sidebarOpen ? (showSubSide ? "ml-96" : "ml-32") : "ml-0"
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onToggleSidebar={toggleSidebarCycle} />
      <div className="flex flex-1 relative">
        <Sidebar
          className="hidden md:flex"
          sidebarOpen={sidebarOpen}
          showSubSide={showSubSide}
          setShowSubSide={setShowSubSide}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <main className={`${mainMarginClass} flex-1 flex flex-col`}>
          <div className="flex-1 p-6 overflow-auto scrollbar-hide">
            {render(() => {
              setSidebarOpen(true);
              setShowSubSide(true);
            }, selectedTab)}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
