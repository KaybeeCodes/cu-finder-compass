import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { Search, MapPin, Navigation as NavigationIcon } from "lucide-react";

// Sample campus locations data
const campusLocations = [
  {
    id: 1,
    name: "Main Administrative Block",
    category: "Administrative",
    description: "Central admin office, admissions, accounts",
    position: { x: 45, y: 30 },
    color: "bg-cu-blue"
  },
  {
    id: 2,
    name: "Engineering Block A",
    category: "Academic",
    description: "Computer Science & Engineering departments",
    position: { x: 30, y: 50 },
    color: "bg-cu-green"
  },
  {
    id: 3,
    name: "Central Library",
    category: "Academic",
    description: "Main library with digital resources",
    position: { x: 55, y: 45 },
    color: "bg-cu-green"
  },
  {
    id: 4,
    name: "Boys Hostel - Block 1",
    category: "Residential",
    description: "Accommodation for male students",
    position: { x: 20, y: 70 },
    color: "bg-cu-orange"
  },
  {
    id: 5,
    name: "Girls Hostel - Block 1",
    category: "Residential", 
    description: "Accommodation for female students",
    position: { x: 75, y: 25 },
    color: "bg-cu-orange"
  },
  {
    id: 6,
    name: "Central Cafeteria",
    category: "Food",
    description: "Main dining hall and food court",
    position: { x: 50, y: 60 },
    color: "bg-destructive"
  },
  {
    id: 7,
    name: "Sports Complex",
    category: "Sports",
    description: "Gym, basketball, volleyball courts",
    position: { x: 70, y: 75 },
    color: "bg-accent"
  },
  {
    id: 8,
    name: "Medical Center",
    category: "Healthcare",
    description: "Campus medical facility",
    position: { x: 25, y: 35 },
    color: "bg-destructive"
  }
];

const CampusMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = campusLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation title="Campus Map" showBack />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-[500px] relative overflow-hidden">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cu-blue" />
                Interactive Campus Map
              </h3>
              
              {/* Map Background */}
              <div className="relative h-full bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-muted-foreground/20 overflow-hidden">
                {/* Campus Outline */}
                <div className="absolute inset-4 border-2 border-cu-blue/30 rounded-lg bg-green-100/50">
                  {/* Roads */}
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 transform -translate-y-1/2"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-300 transform -translate-x-1/2"></div>
                  
                  {/* Location Pins */}
                  {filteredLocations.map((location) => (
                    <button
                      key={location.id}
                      className={`absolute w-4 h-4 ${location.color} rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform cursor-pointer z-10`}
                      style={{
                        left: `${location.position.x}%`,
                        top: `${location.position.y}%`
                      }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-foreground bg-white px-1 py-0.5 rounded shadow-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                        {location.name}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                  <h4 className="text-sm font-medium mb-2">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cu-blue rounded-full"></div>
                      <span>Administrative</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cu-green rounded-full"></div>
                      <span>Academic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cu-orange rounded-full"></div>
                      <span>Residential</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Location Details & List */}
          <div className="space-y-6">
            {/* Selected Location Details */}
            {selectedLocation && (
              <Card className="p-4">
                <h4 className="font-semibold text-lg mb-2">{selectedLocation.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{selectedLocation.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                    {selectedLocation.category}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <NavigationIcon className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </Card>
            )}

            {/* Locations List */}
            <Card className="p-4">
              <h4 className="font-semibold mb-4">All Locations</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <button
                    key={location.id}
                    className="w-full text-left p-2 rounded hover:bg-muted transition-colors"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${location.color} rounded-full`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{location.name}</div>
                        <div className="text-xs text-muted-foreground">{location.category}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;