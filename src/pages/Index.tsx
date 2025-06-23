
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, TrendingUp, Calendar, MapPin, FileText, Award, BookOpen, CheckCircle, Bot, Upload, Phone, Clock, AlertCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const recentNews = [
    {
      title: "New MSP rates announced for Rabi crops 2024-25",
      date: "Dec 2024",
      category: t('news.policy')
    },
    {
      title: "Digital Agriculture Mission 2.0 launched",
      date: "Nov 2024",
      category: t('news.technology')
    },
    {
      title: "Subsidy rates increased for organic farming",
      date: "Nov 2024",
      category: t('news.subsidy')
    }
  ];

  const quickStats = [
    { label: t('stats.total_schemes'), value: "150+", icon: Award },
    { label: t('stats.beneficiaries'), value: "25 Cr+", icon: TrendingUp },
    { label: t('stats.budget'), value: "₹2.8L Cr", icon: FileText },
    { label: t('stats.states'), value: "36", icon: MapPin }
  ];

  const recentApplications = [
    {
      id: "AGC12345678",
      scheme: "PM-KISAN Samman Nidhi",
      status: "Under Review",
      date: "Dec 15, 2024",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: "AGC12345679",
      scheme: "Soil Health Card Scheme",
      status: "Approved",
      date: "Dec 10, 2024",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: "AGC12345680",
      scheme: "Pradhan Mantri Fasal Bima Yojana",
      status: "Documents Required",
      date: "Dec 8, 2024",
      statusColor: "bg-red-100 text-red-800"
    }
  ];

  const quickActions = [
    {
      title: "Apply for New Scheme",
      description: "Browse and apply for government schemes",
      icon: FileText,
      color: "green",
      action: () => navigate("/schemes")
    },
    {
      title: "Check Eligibility",
      description: "Find schemes you qualify for",
      icon: CheckCircle,
      color: "blue",
      action: () => navigate("/eligibility")
    },
    {
      title: "Upload Documents",
      description: "Submit required documents",
      icon: Upload,
      color: "purple",
      action: () => navigate("/documents")
    },
    {
      title: "Track Applications",
      description: "Monitor your application status",
      icon: Clock,
      color: "orange",
      action: () => navigate("/status")
    }
  ];

  const handleNotificationClick = () => {
    toast({
      title: t('header.notifications'),
      description: "You have 3 new scheme updates available",
    });
  };

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case "schemes":
        navigate("/schemes");
        break;
      case "eligibility":
        navigate("/eligibility");
        break;
      case "documents":
        navigate("/documents");
        break;
      case "status":
        navigate("/status");
        break;
      case "support":
        navigate("/support");
        break;
      case "assistant":
        toast({
          title: "Application Assistant",
          description: "Opening AI-powered application assistant...",
        });
        break;
      case "alerts":
        toast({
          title: "Real-Time Alerts",
          description: "Opening real-time alerts dashboard...",
        });
        break;
      default:
        toast({
          title: feature,
          description: `Opening ${feature}...`,
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">{t('app.title')}</h1>
                <p className="text-sm text-green-600">{t('app.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button
                variant="outline"
                size="sm"
                onClick={handleNotificationClick}
                className="border-green-200 hover:bg-green-50"
              >
                <Bell className="h-4 w-4 mr-2" />
                {t('header.notifications')}
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                {t('header.login')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            {t('hero.title')}
          </h2>
          <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg border-green-200 focus:border-green-400 focus:ring-green-400"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700">
                {t('search.button')}
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {quickStats.map((stat, index) => (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-green-800">{stat.value}</div>
                  <div className="text-sm text-green-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Dashboard */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">Quick Actions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <action.icon className={`h-12 w-12 text-${action.color}-600 mx-auto mb-4`} />
                  <h4 className="font-semibold text-green-800 mb-2">{action.title}</h4>
                  <p className="text-sm text-green-600">{action.description}</p>
                  <Button className={`mt-4 w-full bg-${action.color}-600 hover:bg-${action.color}-700`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Applications */}
      <section className="py-12 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-green-800">Recent Applications</h3>
            <Button 
              variant="outline" 
              className="border-green-200 hover:bg-green-100"
              onClick={() => navigate("/status")}
            >
              <User className="h-4 w-4 mr-2" />
              View All Applications
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentApplications.map((application) => (
              <Card key={application.id} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={application.statusColor}>
                      {application.status}
                    </Badge>
                    <div className="flex items-center text-sm text-green-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {application.date}
                    </div>
                  </div>
                  <h4 className="font-semibold text-green-800 mb-2">{application.scheme}</h4>
                  <p className="text-sm text-green-600 mb-3">Application ID: {application.id}</p>
                  <Button variant="outline" className="w-full border-green-200 hover:bg-green-50">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">{t('features.new')}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card 
              className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleFeatureClick("schemes")}
            >
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-green-800 mb-2">{t('features.schemes_db')}</h4>
                <p className="text-sm text-green-600">{t('features.schemes_desc')}</p>
                <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
                  {t('features.explore')}
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleFeatureClick("eligibility")}
            >
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-green-800 mb-2">{t('features.eligibility')}</h4>
                <p className="text-sm text-green-600">{t('features.eligibility_desc')}</p>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700" variant="secondary">
                  {t('features.check')}
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleFeatureClick("documents")}
            >
              <CardContent className="p-6 text-center">
                <Upload className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-green-800 mb-2">{t('features.documents')}</h4>
                <p className="text-sm text-green-600">{t('features.documents_desc')}</p>
                <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700" variant="secondary">
                  {t('features.upload')}
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleFeatureClick("status")}
            >
              <CardContent className="p-6 text-center">
                <Bell className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h4 className="font-semibold text-green-800 mb-2">{t('features.status')}</h4>
                <p className="text-sm text-green-600">{t('features.status_desc')}</p>
                <Button className="mt-4 w-full bg-orange-600 hover:bg-orange-700" variant="secondary">
                  {t('features.track')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent News & Updates */}
      <section className="py-12 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-green-800">{t('news.title')}</h3>
            <Button variant="outline" className="border-green-200 hover:bg-green-100">
              <BookOpen className="h-4 w-4 mr-2" />
              {t('news.view_all')}
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentNews.map((news, index) => (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {news.category}
                    </Badge>
                    <div className="flex items-center text-sm text-green-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {news.date}
                    </div>
                  </div>
                  <h4 className="font-semibold text-green-800 leading-snug">{news.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-800 mb-8">{t('quick.title')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: t('nav.schemes'), icon: Award, color: "green", action: "schemes" },
              { title: t('nav.documents'), icon: Upload, color: "blue", action: "documents" },
              { title: t('nav.status'), icon: CheckCircle, color: "purple", action: "status" },
              { title: t('nav.support'), icon: Phone, color: "orange", action: "support" }
            ].map((item, index) => (
              <Card 
                key={index} 
                className="border-green-200 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                onClick={() => handleFeatureClick(item.action)}
              >
                <CardContent className="p-8 text-center">
                  <item.icon className={`h-12 w-12 mx-auto mb-4 text-${item.color}-600`} />
                  <h4 className="font-semibold text-green-800">{item.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Award className="h-6 w-6" />
            <span className="text-xl font-bold">{t('app.title')}</span>
          </div>
          <p className="text-green-200 mb-4">
            {t('footer.tagline')}
          </p>
          <div className="text-sm text-green-300">
            © 2024 {t('app.title')}. {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
