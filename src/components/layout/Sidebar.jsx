import { cn } from "@/lib/utils";

const menuItems = ["Dashboard", "Events"];

const Sidebar = ({
  className,
  sidebarOpen,
  showSubSide,
  setShowSubSide,
  activeItem,
  setActiveItem,
  selectedTab,
  setSelectedTab,
}) => {
  const handleMenuClick = (item) => {
    setActiveItem(item);
    setShowSubSide(true);
  };

  return (
    <>
      <aside
        className={cn(
          "fixed top-[96px] left-0 h-full w-32 bg-sidebar-bg border-r border-border transition-transform duration-300 z-50 boxShadow",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex-1 py-6">
          <nav className="space-y-1 workedOn">
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "py-2 relative px-8 cursor-pointer",
                    activeItem === item && "active"
                  )}
                  onClick={() => handleMenuClick(item)}
                >
                  <a className="DashA">{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <div
        className={cn(
          "fixed top-[96px] left-32 h-full w-64 bg-sidebar-bg border-l border-border flex flex-col transition-transform duration-300 z-40 boxSide",
          sidebarOpen && showSubSide ? "translate-x-0" : "-translate-x-[400px]"
        )}
      >
        <div className="p-5 flex justify-between items-center border-b border-border">
          <p className="text-lg font-bold text-foreground">Event Details</p>
          <button
            onClick={() => setShowSubSide(false)}
            className="text-xl text-red-500 hover:text-red-700 transition"
            aria-label="Close sidebar"
          >
            ✖
          </button>
        </div>

        <div className="listEvent overflow-y-auto px-4 py-2">
          <ul className="space-y-2">
            {[
              "Basic Info",
              "Logo",
              "Website Banner",
              "Community Banner",
              "Social Links",
              "Attendee Profile",
              "Speaker",
              "Sponsors",
              "Schedule/Agenda",
              // "Media Gallery",
              // "Contact",
              // "FAQs",
            ].map((item, index) => (
              <li
                key={index}
                onClick={() => setSelectedTab(item)}
                className={cn(
                  "relative pl-4 py-2 rounded-md border border-border text-sm text-foreground hover:bg-muted hover:text-primary transition",
                  selectedTab === item && "bg-muted text-primary"
                )}
              >
                <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
