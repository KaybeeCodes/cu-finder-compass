import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Building, 
  Search, 
  Calendar, 
  Phone,
  Compass
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Campus Map",
      description: "Interactive map of CU campus",
      icon: MapPin,
      path: "/map",
      variant: "hero" as const,
      gradient: "from-cu-blue to-cu-green"
    },
    {
      title: "Places Directory",
      description: "Find buildings, hostels & facilities",
      icon: Building,
      path: "/places",
      variant: "campus" as const
    },
    {
      title: "Lost & Found",
      description: "Report or find lost items",
      icon: Search,
      path: "/lost-found",
      variant: "accent" as const
    },
    {
      title: "Events & Notices",
      description: "Campus events and announcements",
      icon: Calendar,
      path: "/events",
      variant: "campus" as const
    },
    {
      title: "Help & Emergency",
      description: "Important contacts & support",
      icon: Phone,
      path: "/help",
      variant: "warning" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/5">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cu-blue to-cu-green rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-cu-blue to-cu-green p-4 rounded-full shadow-lg">
                <Compass className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-cu-blue to-cu-green bg-clip-text text-transparent">
              CU Compass
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your ultimate guide to navigate Chandigarh University campus with ease
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={item.path}
                className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-md"
              >
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10">
                      <IconComponent className="h-8 w-8 text-cu-blue" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                  </div>
                  <Button
                    variant={item.variant}
                    size="lg"
                    onClick={() => navigate(item.path)}
                    className="w-full"
                  >
                    Explore
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Buildings", value: "50+" },
            { label: "Hostels", value: "20+" },
            { label: "Students", value: "40K+" },
            { label: "Facilities", value: "100+" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-2xl md:text-3xl font-bold text-cu-blue mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;