import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { 
  Phone, 
  Mail, 
  Shield, 
  Heart, 
  HelpCircle,
  AlertTriangle,
  Info,
  MessageCircle,
  Clock,
  MapPin
} from "lucide-react";

// Emergency contacts data
const emergencyContacts = [
  {
    id: 1,
    title: "Campus Security",
    description: "24/7 security assistance",
    phone: "+91-1234567800",
    email: "security@cu.edu.in",
    icon: Shield,
    priority: "emergency"
  },
  {
    id: 2,
    title: "Medical Emergency",
    description: "Campus medical center",
    phone: "+91-1234567801",
    email: "medical@cu.edu.in",
    icon: Heart,
    priority: "emergency"
  },
  {
    id: 3,
    title: "Fire Emergency",
    description: "Fire safety department",
    phone: "+91-1234567802",
    email: "fire@cu.edu.in",
    icon: AlertTriangle,
    priority: "emergency"
  }
];

// General contacts data
const generalContacts = [
  {
    id: 1,
    title: "Admissions Office",
    description: "Admission queries and support",
    phone: "+91-1234567810",
    email: "admissions@cu.edu.in",
    timings: "9:00 AM - 5:00 PM",
    icon: Info
  },
  {
    id: 2,
    title: "Academic Office",
    description: "Academic queries and support",
    phone: "+91-1234567811",
    email: "academic@cu.edu.in",
    timings: "9:00 AM - 5:00 PM",
    icon: HelpCircle
  },
  {
    id: 3,
    title: "Hostel Administration",
    description: "Hostel-related queries",
    phone: "+91-1234567812",
    email: "hostel@cu.edu.in",
    timings: "8:00 AM - 8:00 PM",
    icon: MessageCircle
  },
  {
    id: 4,
    title: "IT Helpdesk",
    description: "Technical support and WiFi issues",
    phone: "+91-1234567813",
    email: "ithelp@cu.edu.in",
    timings: "8:00 AM - 8:00 PM",
    icon: HelpCircle
  },
  {
    id: 5,
    title: "Student Affairs",
    description: "Student welfare and activities",
    phone: "+91-1234567814",
    email: "studentaffairs@cu.edu.in",
    timings: "9:00 AM - 5:00 PM",
    icon: MessageCircle
  },
  {
    id: 6,
    title: "Transport Office",
    description: "Bus routes and transport queries",
    phone: "+91-1234567815",
    email: "transport@cu.edu.in",
    timings: "7:00 AM - 7:00 PM",
    icon: Info
  }
];

// FAQ data
const faqData = [
  {
    question: "How do I get a duplicate ID card?",
    answer: "Visit the Student Affairs office with a written application, copy of police report (if lost), and pay the duplicate card fee of ₹200."
  },
  {
    question: "What are the WiFi credentials?",
    answer: "Connect to 'CU-Student' network. Username: your student ID, Password: your date of birth (DDMMYYYY). For issues, contact IT Helpdesk."
  },
  {
    question: "How do I apply for late entry to hostel?",
    answer: "Fill the late entry form available at hostel reception. For entry after 11 PM, prior permission from Hostel Warden is required."
  },
  {
    question: "Where can I get medical assistance?",
    answer: "Campus Medical Center is open 24/7 for emergencies. OPD hours: 9 AM - 6 PM. For serious emergencies, call the medical emergency number."
  },
  {
    question: "How do I report a maintenance issue in hostel?",
    answer: "Report maintenance issues through the hostel helpdesk or directly to the hostel supervisor. Emergency issues can be reported 24/7."
  },
  {
    question: "What should I do if I lose my belongings?",
    answer: "Check the Lost & Found section in this app or visit the Security Office. For valuable items, file a complaint with campus security."
  }
];

const Help = () => {
  const ContactCard = ({ contact, isEmergency = false }) => {
    const IconComponent = contact.icon;
    
    return (
      <Card className={`p-6 ${isEmergency ? 'border-destructive border-2 bg-destructive/5' : 'hover:shadow-md'} transition-all`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${isEmergency ? 'bg-destructive/10' : 'bg-cu-blue/10'}`}>
            <IconComponent className={`h-6 w-6 ${isEmergency ? 'text-destructive' : 'text-cu-blue'}`} />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{contact.title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{contact.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cu-green" />
                <a 
                  href={`tel:${contact.phone}`}
                  className="text-sm text-cu-blue hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cu-orange" />
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-sm text-cu-blue hover:underline"
                >
                  {contact.email}
                </a>
              </div>
              
              {contact.timings && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{contact.timings}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                variant={isEmergency ? "destructive" : "campus"}
                size="sm"
                onClick={() => window.open(`tel:${contact.phone}`)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`mailto:${contact.email}`)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation title="Help & Emergency" showBack />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="emergency" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="contacts">General Contacts</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="emergency">
            <div className="mb-6">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold text-destructive">Emergency Contacts</h3>
                </div>
                <p className="text-sm text-destructive/80">
                  For immediate assistance and emergencies, contact these numbers available 24/7
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {emergencyContacts.map(contact => (
                  <ContactCard key={contact.id} contact={contact} isEmergency />
                ))}
              </div>
            </div>
            
            {/* Quick Emergency Actions */}
            <Card className="p-6 bg-gradient-to-r from-destructive/5 to-cu-orange/5 border-destructive/20">
              <h3 className="font-semibold mb-4">Quick Emergency Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="destructive" className="w-full" onClick={() => window.open('tel:+911234567800')}>
                  <Shield className="h-4 w-4 mr-2" />
                  Call Security
                </Button>
                <Button variant="warning" className="w-full" onClick={() => window.open('tel:+911234567801')}>
                  <Heart className="h-4 w-4 mr-2" />
                  Medical Emergency
                </Button>
                <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                  <MapPin className="h-4 w-4 mr-2" />
                  Share Location
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="contacts">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {generalContacts.map(contact => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Frequently Asked Questions</h3>
                <p className="text-muted-foreground">
                  Find answers to common questions about campus life and services
                </p>
              </div>
              
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h4 className="font-semibold text-lg mb-3 flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-cu-blue mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h4>
                    <p className="text-muted-foreground pl-7">{faq.answer}</p>
                  </Card>
                ))}
              </div>
              
              <Card className="p-6 mt-8 bg-cu-blue/5 border-cu-blue/20">
                <h4 className="font-semibold mb-2">Still need help?</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  If you can't find the answer you're looking for, feel free to contact our support team.
                </p>
                <Button variant="campus">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Help;