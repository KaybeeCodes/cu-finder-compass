import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Search, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation as NavigationIcon,
  Building,
  Home,
  Utensils,
  GraduationCap,
  Dumbbell,
  ShoppingBag
} from "lucide-react";

// Sample places data
const placesData = [
  {
    id: 1,
    name: "Central Library",
    category: "Academic",
    description: "Main university library with vast collection of books, journals, and digital resources. Study halls and computer lab available.",
    timings: "7:00 AM - 11:00 PM",
    phone: "+91-1234567890",
    image: "/placeholder.svg",
    facilities: ["WiFi", "AC", "Study Rooms", "Computer Lab"],
    icon: GraduationCap
  },
  {
    id: 2,
    name: "Engineering Block A",
    category: "Academic",
    description: "Houses Computer Science, Electronics, and Mechanical Engineering departments with modern labs and classrooms.",
    timings: "8:00 AM - 8:00 PM",
    phone: "+91-1234567891",
    image: "/placeholder.svg",
    facilities: ["Labs", "Lecture Halls", "Faculty Offices"],
    icon: Building
  },
  {
    id: 3,
    name: "Boys Hostel - Himalaya",
    category: "Hostels",
    description: "Modern accommodation facility for male students with mess, common room, and recreational facilities.",
    timings: "24/7",
    phone: "+91-1234567892",
    image: "/placeholder.svg",
    facilities: ["Mess", "WiFi", "Laundry", "Common Room", "Security"],
    icon: Home
  },
  {
    id: 4,
    name: "Girls Hostel - Aravali",
    category: "Hostels",
    description: "Secure and comfortable accommodation for female students with all modern amenities.",
    timings: "24/7",
    phone: "+91-1234567893",
    image: "/placeholder.svg",
    facilities: ["Mess", "WiFi", "Laundry", "Common Room", "24x7 Security"],
    icon: Home
  },
  {
    id: 5,
    name: "Central Cafeteria",
    category: "Food",
    description: "Main dining facility offering variety of cuisines including North Indian, South Indian, Chinese, and Continental.",
    timings: "7:00 AM - 10:00 PM",
    phone: "+91-1234567894",
    image: "/placeholder.svg",
    facilities: ["Multiple Cuisines", "Hygenic Food", "Seating Area"],
    icon: Utensils
  },
  {
    id: 6,
    name: "Sports Complex",
    category: "Gym/Sports",
    description: "Complete fitness center with gymnasium, indoor courts for badminton, basketball, and outdoor facilities.",
    timings: "5:00 AM - 10:00 PM",
    phone: "+91-1234567895",
    image: "/placeholder.svg",
    facilities: ["Gym", "Indoor Courts", "Outdoor Fields", "Swimming Pool"],
    icon: Dumbbell
  },
  {
    id: 7,
    name: "University Store",
    category: "Shopping",
    description: "On-campus store for stationery, books, university merchandise, and daily essentials.",
    timings: "9:00 AM - 8:00 PM",
    phone: "+91-1234567896",
    image: "/placeholder.svg",
    facilities: ["Stationery", "Books", "Merchandise", "Essentials"],
    icon: ShoppingBag
  },
  {
    id: 8,
    name: "Medical Center",
    category: "Admin",
    description: "Campus healthcare facility with qualified doctors and nurses for emergency and routine medical care.",
    timings: "24/7 Emergency, 9:00 AM - 6:00 PM OPD",
    phone: "+91-1234567897",
    image: "/placeholder.svg",
    facilities: ["Emergency Care", "OPD", "Pharmacy", "Ambulance"],
    icon: Building
  }
];

const categoryIcons = {
  "Academic": GraduationCap,
  "Hostels": Home,
  "Food": Utensils,
  "Gym/Sports": Dumbbell,
  "Shopping": ShoppingBag,
  "Admin": Building
};

const categoryColors = {
  "Academic": "bg-cu-green",
  "Hostels": "bg-cu-orange", 
  "Food": "bg-destructive",
  "Gym/Sports": "bg-accent",
  "Shopping": "bg-cu-blue",
  "Admin": "bg-secondary"
};

const Places = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = ["all", "Academic", "Hostels", "Food", "Gym/Sports", "Shopping", "Admin"];
  
  const filteredPlaces = placesData.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const PlaceCard = ({ place }) => {
    const IconComponent = place.icon;
    
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${categoryColors[place.category]}/10`}>
                <IconComponent className={`h-5 w-5 text-cu-blue`} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{place.name}</h3>
                <Badge variant="secondary" className="mt-1">
                  {place.category}
                </Badge>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {place.description}
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-cu-green" />
              <span>{place.timings}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-cu-blue" />
              <span>{place.phone}</span>
            </div>
          </div>
          
          {/* Facilities */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Facilities:</h4>
            <div className="flex flex-wrap gap-1">
              {place.facilities.slice(0, 3).map((facility, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {facility}
                </Badge>
              ))}
              {place.facilities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{place.facilities.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <MapPin className="h-4 w-4 mr-2" />
              View on Map
            </Button>
            <Button variant="campus" size="sm" className="flex-1">
              <NavigationIcon className="h-4 w-4 mr-2" />
              Directions
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation title="Places Directory" showBack />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => {
              const IconComponent = category !== "all" ? categoryIcons[category] : Building;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "campus" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  {IconComponent && <IconComponent className="h-4 w-4" />}
                  {category === "all" ? "All Places" : category}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {categories.slice(1).map(category => {
            const count = placesData.filter(place => place.category === category).length;
            const IconComponent = categoryIcons[category];
            return (
              <Card key={category} className="p-4 text-center">
                <IconComponent className="h-6 w-6 mx-auto mb-2 text-cu-blue" />
                <div className="text-2xl font-bold text-cu-blue">{count}</div>
                <div className="text-xs text-muted-foreground">{category}</div>
              </Card>
            );
          })}
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No places found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Places;