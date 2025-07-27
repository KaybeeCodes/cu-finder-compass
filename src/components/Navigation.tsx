import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationProps {
  title?: string;
  showBack?: boolean;
}

const Navigation = ({ title = "CU Compass", showBack = false }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showBack && !isHome && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-cu-blue hover:bg-cu-blue/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-bold text-cu-blue">{title}</h1>
          </div>
          
          {!isHome && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-cu-blue hover:bg-cu-blue/10"
            >
              <Home className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;