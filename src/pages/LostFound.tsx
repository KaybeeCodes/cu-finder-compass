import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Tag
} from "lucide-react";

// Sample lost items data
const sampleLostItems = [
  {
    id: 1,
    title: "iPhone 13 Pro",
    description: "Black iPhone 13 Pro with cracked screen protector. Has a blue case.",
    category: "Electronics",
    location: "Central Library",
    date: "2024-01-15",
    contact: "john.doe@cu.edu.in",
    type: "lost"
  },
  {
    id: 2,
    title: "CU ID Card",
    description: "Student ID card belonging to Priya Sharma, B.Tech CSE 3rd year",
    category: "Documents",
    location: "Engineering Block A",
    date: "2024-01-14",
    contact: "9876543210",
    type: "found"
  },
  {
    id: 3,
    title: "Red Backpack",
    description: "Red Nike backpack with laptop and textbooks inside",
    category: "Bag",
    location: "Sports Complex",
    date: "2024-01-13",
    contact: "mike.wilson@cu.edu.in",
    type: "lost"
  },
  {
    id: 4,
    title: "Wired Earphones",
    description: "White Apple EarPods found near the cafeteria",
    category: "Electronics",
    location: "Central Cafeteria",
    date: "2024-01-12",
    contact: "security@cu.edu.in",
    type: "found"
  }
];

const LostFound = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = ["all", "Electronics", "Documents", "Bag", "Clothing", "Accessories", "Books"];
  
  const filteredItems = sampleLostItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lostItems = filteredItems.filter(item => item.type === "lost");
  const foundItems = filteredItems.filter(item => item.type === "found");

  const ItemCard = ({ item }) => (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-lg">{item.title}</h4>
        <Badge variant={item.type === "lost" ? "destructive" : "secondary"}>
          {item.type === "lost" ? "Lost" : "Found"}
        </Badge>
      </div>
      
      <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Tag className="h-4 w-4 text-cu-blue" />
          <span>{item.category}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-cu-green" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-cu-orange" />
          <span>{new Date(item.date).toLocaleDateString()}</span>
        </div>
      </div>
      
      <Button variant="outline" size="sm" className="w-full">
        {item.contact.includes("@") ? (
          <>
            <Mail className="h-4 w-4 mr-2" />
            Contact via Email
          </>
        ) : (
          <>
            <Phone className="h-4 w-4 mr-2" />
            Contact via Phone
          </>
        )}
      </Button>
    </Card>
  );

  const ReportForm = ({ type }) => (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">
        Report {type === "lost" ? "Lost" : "Found"} Item
      </h3>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Item Title</label>
          <Input placeholder="e.g., iPhone 13, Blue Backpack, Student ID" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea 
            placeholder="Provide detailed description including color, brand, distinctive features..."
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select className="w-full p-2 border border-input rounded-md bg-background">
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input placeholder="Where was it lost/found?" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <Input type="date" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Contact Information</label>
          <Input placeholder="Email or phone number" />
        </div>
        
        <Button variant="campus" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Submit Report
        </Button>
      </form>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation title="Lost & Found" showBack />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "campus" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="browse">Browse Items</TabsTrigger>
            <TabsTrigger value="report-lost">Report Lost</TabsTrigger>
            <TabsTrigger value="report-found">Report Found</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Lost Items */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-destructive">
                  Lost Items ({lostItems.length})
                </h3>
                <div className="space-y-4">
                  {lostItems.length > 0 ? (
                    lostItems.map(item => <ItemCard key={item.id} item={item} />)
                  ) : (
                    <Card className="p-8 text-center">
                      <p className="text-muted-foreground">No lost items found matching your criteria</p>
                    </Card>
                  )}
                </div>
              </div>
              
              {/* Found Items */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-cu-green">
                  Found Items ({foundItems.length})
                </h3>
                <div className="space-y-4">
                  {foundItems.length > 0 ? (
                    foundItems.map(item => <ItemCard key={item.id} item={item} />)
                  ) : (
                    <Card className="p-8 text-center">
                      <p className="text-muted-foreground">No found items matching your criteria</p>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="report-lost">
            <div className="max-w-2xl mx-auto">
              <ReportForm type="lost" />
            </div>
          </TabsContent>
          
          <TabsContent value="report-found">
            <div className="max-w-2xl mx-auto">
              <ReportForm type="found" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LostFound;