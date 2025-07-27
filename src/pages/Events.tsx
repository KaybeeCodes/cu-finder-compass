import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Bell,
  Star,
  ExternalLink
} from "lucide-react";

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Annual Tech Fest 2024",
    description: "Join us for the biggest technology festival featuring hackathons, tech talks, startup exhibitions, and networking opportunities.",
    date: "2024-02-15",
    time: "9:00 AM - 6:00 PM",
    location: "Main Auditorium",
    category: "Festival",
    type: "event",
    attendees: 500,
    isRegistrationOpen: true,
    priority: "high",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Mid-Semester Exam Schedule",
    description: "Mid-semester examinations for all courses will commence from February 20th. Please check your individual timetables.",
    date: "2024-02-20",
    time: "Various Times",
    location: "All Academic Blocks",
    category: "Academic",
    type: "notice",
    priority: "high",
    isImportant: true
  },
  {
    id: 3,
    title: "Cultural Night - Bollywood Theme",
    description: "Get ready for an enchanting evening of Bollywood music, dance performances, and entertainment.",
    date: "2024-02-10",
    time: "7:00 PM - 10:00 PM", 
    location: "Open Air Theatre",
    category: "Cultural",
    type: "event",
    attendees: 300,
    isRegistrationOpen: true,
    priority: "medium"
  },
  {
    id: 4,
    title: "Library Renovation Notice",
    description: "Central Library will be partially closed for renovation work from Feb 12-16. Limited services will be available.",
    date: "2024-02-12",
    time: "All Day",
    location: "Central Library",
    category: "Notice",
    type: "notice",
    priority: "medium"
  },
  {
    id: 5,
    title: "Guest Lecture: AI in Healthcare",
    description: "Distinguished speaker Dr. Sarah Johnson will discuss the latest applications of AI in healthcare industry.",
    date: "2024-02-08",
    time: "2:00 PM - 4:00 PM",
    location: "Seminar Hall, Block A",
    category: "Academic",
    type: "event",
    attendees: 150,
    isRegistrationOpen: true,
    priority: "medium"
  },
  {
    id: 6,
    title: "Sports Week Registration",
    description: "Registration open for annual sports week. Various indoor and outdoor sports competitions.",
    date: "2024-02-25",
    time: "5:00 PM - 8:00 PM",
    location: "Sports Complex",
    category: "Sports",
    type: "event",
    attendees: 400,
    isRegistrationOpen: true,
    priority: "low"
  }
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  
  const categories = ["all", "Academic", "Cultural", "Festival", "Sports", "Notice"];
  const types = ["all", "event", "notice"];
  
  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = filteredEvents.filter(event => new Date(event.date) < new Date());

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "bg-destructive";
      case "medium": return "bg-cu-orange";
      case "low": return "bg-cu-green";
      default: return "bg-secondary";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Academic": "bg-cu-blue",
      "Cultural": "bg-cu-green",
      "Festival": "bg-cu-orange",
      "Sports": "bg-accent",
      "Notice": "bg-destructive"
    };
    return colors[category] || "bg-secondary";
  };

  const EventCard = ({ event }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              {event.isImportant && (
                <Star className="h-4 w-4 text-cu-orange fill-current" />
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge 
                variant="secondary" 
                className={`${getCategoryColor(event.category)}/10 text-foreground`}
              >
                {event.category}
              </Badge>
              <Badge 
                variant="outline"
                className={`${getPriorityColor(event.priority)}/10 text-foreground`}
              >
                {event.priority} priority
              </Badge>
              {event.type === "event" && event.isRegistrationOpen && (
                <Badge variant="secondary" className="bg-cu-green/10 text-cu-green">
                  Registration Open
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-cu-blue" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-cu-green" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-cu-orange" />
            <span>{event.location}</span>
          </div>
          {event.attendees && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-accent" />
              <span>{event.attendees} expected attendees</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {event.type === "event" && event.isRegistrationOpen && (
            <Button variant="campus" size="sm" className="flex-1">
              Register Now
            </Button>
          )}
          <Button variant="outline" size="sm" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation title="Events & Notices" showBack />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events and notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="flex gap-2">
              {types.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? "campus" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type === "all" ? "All" : type === "event" ? "Events" : "Notices"}
                </Button>
              ))}
            </div>
            
            <div className="w-px h-8 bg-border mx-2"></div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "accent" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-cu-blue mb-1">
              {upcomingEvents.length}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-cu-green mb-1">
              {filteredEvents.filter(e => e.type === "event").length}
            </div>
            <div className="text-sm text-muted-foreground">Events</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-cu-orange mb-1">
              {filteredEvents.filter(e => e.type === "notice").length}
            </div>
            <div className="text-sm text-muted-foreground">Notices</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive mb-1">
              {filteredEvents.filter(e => e.priority === "high").length}
            </div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </Card>
        </div>

        {/* Events Sections */}
        <div className="space-y-8">
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Bell className="h-5 w-5 text-cu-blue" />
                <h2 className="text-2xl font-bold">Upcoming Events & Notices</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-muted-foreground">Past Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map(event => (
                  <div key={event.id} className="opacity-60">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
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

export default Events;