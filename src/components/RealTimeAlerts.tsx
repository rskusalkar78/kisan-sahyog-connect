import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, CheckCircle, Clock, Settings, X, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "urgent";
  timestamp: Date;
  isRead: boolean;
  category: string;
  schemeDate?: Date;
  deadline?: Date;
}

const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "PM-KISAN Application Approved",
      message: "Your PM-KISAN application has been approved and payment will be processed within 7 days.",
      type: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: false,
      category: "Application",
      schemeDate: new Date("2024-12-15"),
      deadline: new Date("2024-12-22")
    },
    {
      id: "2",
      title: "New Organic Farming Subsidy Scheme",
      message: "Government launched new ₹5,000 crore organic farming subsidy scheme. Apply before January 31st, 2025.",
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: false,
      category: "Schemes",
      schemeDate: new Date("2024-12-10"),
      deadline: new Date("2025-01-31")
    },
    {
      id: "3",
      title: "Fasal Bima Document Verification",
      message: "Additional documents needed for your Fasal Bima application. Please upload within 3 days.",
      type: "warning",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: true,
      category: "Documents",
      deadline: new Date("2024-12-18")
    },
    {
      id: "4",
      title: "PM-KISAN Payment Credited",
      message: "PM-KISAN installment of ₹2,000 has been credited to your account ending with 1234.",
      type: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      isRead: true,
      category: "Payment",
      schemeDate: new Date("2024-12-13")
    },
    {
      id: "5",
      title: "Soil Health Card Distribution",
      message: "New soil health cards available for collection at your nearest agriculture office.",
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      isRead: false,
      category: "Schemes",
      schemeDate: new Date("2024-12-12"),
      deadline: new Date("2024-12-30")
    },
    {
      id: "6",
      title: "Kisan Credit Card Interest Rate Reduced",
      message: "KCC interest rates reduced to 4% per annum. Existing loans will be adjusted automatically.",
      type: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      isRead: true,
      category: "Policy",
      schemeDate: new Date("2024-12-11")
    }
  ]);

  const [notifications, setNotifications] = useState({
    applications: true,
    payments: true,
    schemes: true,
    deadlines: true,
    documents: true
  });

  const { toast } = useToast();

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      const randomTypes: Array<"success" | "warning" | "info" | "urgent"> = ["success", "warning", "info", "urgent"];
      const randomCategories = ["Application", "Payment", "Schemes", "Documents", "Deadlines"];
      const sampleMessages = [
        "New government scheme launched for dairy farmers",
        "Your application status has been updated",
        "Payment processing completed",
        "Deadline reminder: Submit documents within 2 days",
        "Scheme eligibility criteria updated"
      ];

      if (Math.random() > 0.7) { // 30% chance of new alert
        const newAlert: Alert = {
          id: Date.now().toString(),
          title: "Real-time Update",
          message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
          type: randomTypes[Math.floor(Math.random() * randomTypes.length)],
          timestamp: new Date(),
          isRead: false,
          category: randomCategories[Math.floor(Math.random() * randomCategories.length)]
        };

        setAlerts(prev => [newAlert, ...prev]);
        
        toast({
          title: "New Alert",
          description: newAlert.message,
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "urgent":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "urgent":
        return "border-red-200 bg-red-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Real-Time Alerts</h2>
          <p className="text-green-600">Stay updated with latest schemes, deadlines, and application status</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-red-100 text-red-800">
            {unreadCount} Unread
          </Badge>
          <Button variant="outline" className="border-green-200 hover:bg-green-50">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enhanced Alerts List */}
        <div className="lg:col-span-2">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Recent Alerts & Updates</CardTitle>
              <CardDescription>
                Latest scheme updates with important dates and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No alerts at the moment</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`border rounded-lg p-4 transition-all cursor-pointer ${
                        getAlertColor(alert.type)
                      } ${!alert.isRead ? "shadow-md" : ""}`}
                      onClick={() => markAsRead(alert.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`font-medium ${!alert.isRead ? "text-gray-900" : "text-gray-700"}`}>
                                {alert.title}
                              </h4>
                              {!alert.isRead && (
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{alert.message}</p>
                            
                            {/* Enhanced Date Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                              {alert.schemeDate && (
                                <div className="flex items-center text-xs text-gray-500">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span className="font-medium">Scheme Date:</span>
                                  <span className="ml-1">{formatDate(alert.schemeDate)}</span>
                                </div>
                              )}
                              {alert.deadline && (
                                <div className="flex items-center text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span className="font-medium">Deadline:</span>
                                  <span className={`ml-1 ${
                                    getDaysUntilDeadline(alert.deadline) <= 3 ? 'text-red-600 font-bold' : 'text-gray-500'
                                  }`}>
                                    {formatDate(alert.deadline)} 
                                    ({getDaysUntilDeadline(alert.deadline)} days left)
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <span className="flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {formatTimestamp(alert.timestamp)}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {alert.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAlert(alert.id);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="lg:col-span-1">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Notification Settings</CardTitle>
              <CardDescription>
                Customize your alert preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <button
                      onClick={() => setNotifications(prev => ({
                        ...prev,
                        [key]: !value
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? "bg-green-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Alert Types:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Success - Approvals, payments
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    Warning - Action required
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Info - New schemes, updates
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Urgent - Deadlines, rejections
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAlerts;
