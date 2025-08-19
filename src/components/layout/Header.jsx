import { Search, ChevronDown, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import list from "@/assets/Images/list.png";
import vreLogo from "../../assets/Images/vre_logo_SVG_Final.svg";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="h-16 bg-header-bg border-border flex items-center justify-between px-6 py-12 z-10 boxShadow w-full fixed">
      <div className="flex-1 max-w-md mx-8 flex flex-row items-center gap-5">
        <img
          src={list}
          alt=""
          className="w-5 h-5 cursor-pointer"
          onClick={onToggleSidebar}
        />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search" className="pl-10 bg-muted/50 border-0" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="md:hidden">
          <div className="w-4 h-4 flex flex-col gap-1">
            <div className="w-full h-0.5 bg-foreground"></div>
            <div className="w-full h-0.5 bg-foreground"></div>
            <div className="w-full h-0.5 bg-foreground"></div>
          </div>
        </Button>

        <div className="flex items-center gap-2">
          <img src={vreLogo} alt="VRE-LOGO" width={200} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="gap-1">
          <span>EN</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
        <div className="w-10 h-6 bg-muted rounded-full relative">
          <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
        </div>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Sarah Kortney
          </span>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              SK
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
