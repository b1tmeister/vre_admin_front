import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BasicInfo from "@/components/Event/BasicInfo";
import LogoUpload from "@/components/Event/LogoUpload";
import WebsiteBanner from "@/components/Event/WebsiteBanner";
import CommunityBanner from "@/components/Event/CommunityBanner";
import SocialLinks from "@/components/Event/SocialLinks";
import AttendeeProfile from "@/components/Event/AttendeeProfile";
import SpeakersProfile from "@/components/Event/SpeakersProfile";
import SponsorsProfile from "@/components/Event/SponsorsProfile";
import ScheduleAgenda from "@/components/Event/ScheduleAgenda";

interface IndexProps {
  selectedTab: string;
  onEditClick?: () => void;
}

const Index = ({ selectedTab, onEditClick }: IndexProps) => {
  // Dynamic breadcrumb label based on selected tab
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Event List", href: "/" },
    ...(selectedTab && selectedTab !== "Event List"
      ? [{ label: selectedTab }]
      : []),
  ];

  const {data: Events} = useEvent

  const renderContent = () => {
    switch (selectedTab) {
      case "Basic Info":
        return <BasicInfo />;
      case "Logo":
        return <LogoUpload />;
      case "Website Banner":
        return <WebsiteBanner/>;  
      case "Community Banner":
        return <CommunityBanner/>;  
      case "Social Links":
        return <SocialLinks/>;  
      case "Attendee Profile":
        return <AttendeeProfile/>;    
      case "Speaker":
        return <SpeakersProfile/>;   
      case "Sponsors":
        return <SponsorsProfile/>;   
      case "Schedule/Agenda":
        return <ScheduleAgenda/>;         
      default:
        return (
          <>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Event List
            </h1>

            <button className="mb-5 px-3 py-1 rounded-md text-lg bg-purple-400 text-white">
              Add Event
            </button>

            <div className="rounded-lg border border-border p-3 mb-3">
              <ul className="flex text-sm font-medium text-muted-foreground">
                <li className="w-1/5 flex justify-center">Logo</li>
                <li className="w-1/5 flex justify-center">Event Name & ID</li>
                <li className="w-1/5 flex justify-center">ID</li>
                <li className="w-1/5 flex justify-center">Date</li>
                <li className="w-1/5 flex justify-center">Action</li>
              </ul>
            </div>

            <div className="rounded-lg p-6 border border-border">
              <ul className="flex items-center text-sm text-foreground">
                <li className="w-1/5 flex justify-center">
                  <img
                    src="http://res.cloudinary.com/testvre/image/upload/v1753686793/75916861-b9a4-4a20-b2b3-7697130d75dd/event_logo_75916861-b9a4-4a20-b2b3-7697130d75dd.png"
                    alt="event_img"
                    className="w-16"
                  />
                </li>
                <li className="w-1/5 flex justify-center">
                  <p>Bengaluru Tech Summit</p>
                </li>
                <li className="w-1/5 flex justify-center">
                  <p>f1wcj657ghd865jf543klpo6</p>
                </li>
                <li className="w-1/5 flex justify-center">
                  <p>25 July 2025</p>
                </li>
                <li className="w-1/5 flex justify-center">
                  <div className="flex space-x-2">
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
                      onClick={onEditClick}
                    >
                      Edit
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                      Preview
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </>
        );
    }
  };

  return (
    <div className="p-20 pt-5 pb-5 mb-24 mt-24">
      <Breadcrumbs items={breadcrumbItems} />
      {renderContent()}
    </div>
  );
};

export default Index;
