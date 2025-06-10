
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, ArrowLeft, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const supportContacts = [
    {
      title: "Helpline Number",
      value: "1800-123-4567",
      description: "Toll-free support available 24/7",
      icon: Phone
    },
    {
      title: "Email Support",
      value: "support@agriconnect.gov.in",
      description: "Response within 24 hours",
      icon: Mail
    },
    {
      title: "Regional Office",
      value: "Ministry of Agriculture, New Delhi",
      description: "Visit us during office hours",
      icon: MapPin
    },
    {
      title: "Office Hours",
      value: "9:00 AM - 6:00 PM",
      description: "Monday to Friday",
      icon: Clock
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent Successfully",
        description: "Our support team will contact you within 24 hours",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: ""
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold text-green-800">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-green-800">Contact Support</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Get Help & Support</h2>
          <p className="text-green-600">We're here to assist you with any questions or issues you may have</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Contact Information</CardTitle>
                <CardDescription>
                  Multiple ways to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportContacts.map((contact, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                      <contact.icon className="h-6 w-6 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-green-800">{contact.title}</h4>
                        <p className="text-green-700 font-semibold">{contact.value}</p>
                        <p className="text-sm text-green-600">{contact.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b border-green-100 pb-3">
                    <h4 className="font-medium text-green-800 mb-1">How do I check my application status?</h4>
                    <p className="text-sm text-green-600">You can track your application status using your application number on the status page.</p>
                  </div>
                  <div className="border-b border-green-100 pb-3">
                    <h4 className="font-medium text-green-800 mb-1">What documents are required?</h4>
                    <p className="text-sm text-green-600">Required documents vary by scheme. Check the document upload section for specific requirements.</p>
                  </div>
                  <div className="border-b border-green-100 pb-3">
                    <h4 className="font-medium text-green-800 mb-1">How long does processing take?</h4>
                    <p className="text-sm text-green-600">Processing times vary by scheme, typically 15-30 working days for most applications.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Can I edit my application after submission?</h4>
                    <p className="text-sm text-green-600">Applications cannot be edited after submission. Please contact support for any corrections needed.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border-green-200 focus:border-green-400"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-green-700 mb-1">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="border-green-200 focus:border-green-400"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-green-200 focus:border-green-400"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-green-700 mb-1">
                      Support Category *
                    </label>
                    <select
                      id="category"
                      required
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full p-2 border border-green-200 rounded-md focus:border-green-400 focus:outline-none"
                    >
                      <option value="">Select a category</option>
                      <option value="application">Application Issues</option>
                      <option value="documents">Document Upload</option>
                      <option value="eligibility">Eligibility Questions</option>
                      <option value="payments">Payment Related</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-green-700 mb-1">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="border-green-200 focus:border-green-400"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-green-700 mb-1">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="border-green-200 focus:border-green-400 min-h-[120px]"
                      placeholder="Describe your issue or question in detail..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
