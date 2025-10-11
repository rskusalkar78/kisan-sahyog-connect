import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Eye, EyeOff, User, Mail, Phone, MapPin, CreditCard, Zap, Users, Shield } from 'lucide-react';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    aadharNumber: '',
    state: '',
    district: '',
    role: 'farmer' as 'farmer' | 'admin' | 'officer'
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register } = useAuth();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(loginData.email, loginData.password);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to dashboard...",
        });
        navigate('/');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (email: string, password: string, userType: string) => {
    setError('');
    setIsLoading(true);
    
    // Pre-fill the form
    setLoginData({ email, password });
    
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Quick Login Successful",
          description: `Welcome as ${userType}! Redirecting to dashboard...`,
        });
        navigate('/');
      } else {
        setError('Quick login failed. Please try again.');
      }
    } catch (error) {
      setError('Quick login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simplified validation
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (registerData.password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        phone: registerData.phone || '+91 0000000000',
        aadharNumber: registerData.aadharNumber || '0000-0000-0000',
        state: registerData.state || 'Delhi',
        district: registerData.district || 'New Delhi',
        role: registerData.role
      });

      if (success) {
        toast({
          title: "Registration Successful",
          description: "Account created successfully! Welcome to Kisan Sahyog Connect.",
        });
        navigate('/');
      } else {
        setError('Registration failed. Email might already be in use.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (activeTab === 'login') {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [field]: value }));
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
    'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800">Kisan Sahyog Connect</h1>
              <p className="text-sm text-green-600">Your Gateway to Government Schemes</p>
            </div>
          </div>
        </div>

        <Card className="border-green-200 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800">Welcome</CardTitle>
            <CardDescription className="text-green-600">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login">
                {/* Quick Login Section */}
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Quick Login</h3>
                    <p className="text-sm text-green-600">Choose a demo account to get started instantly</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      variant="outline"
                      className="w-full border-green-200 hover:bg-green-50 justify-start"
                      onClick={() => handleQuickLogin('farmer@example.com', 'password', 'Farmer')}
                      disabled={isLoading}
                    >
                      <Users className="h-4 w-4 mr-3 text-green-600" />
                      <div className="text-left">
                        <div className="font-medium">Login as Farmer</div>
                        <div className="text-xs text-green-600">Access all farmer schemes</div>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 hover:bg-blue-50 justify-start"
                      onClick={() => handleQuickLogin('admin@example.com', 'admin123', 'Admin')}
                      disabled={isLoading}
                    >
                      <Shield className="h-4 w-4 mr-3 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Login as Admin</div>
                        <div className="text-xs text-blue-600">Full system access</div>
                      </div>
                    </Button>
                  </div>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-green-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-green-500">Or login manually</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-green-700">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-green-700">Password</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 pr-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-700"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-green-600 hover:text-green-800 underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <div className="mb-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Create New Account</h3>
                    <p className="text-sm text-green-600">Join thousands of farmers using our platform</p>
                  </div>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name" className="text-green-700">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Your name"
                          value={registerData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-role" className="text-green-700">Role *</Label>
                      <Select value={registerData.role} onValueChange={(value) => handleInputChange('role', value)}>
                        <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="farmer">Farmer</SelectItem>
                          <SelectItem value="officer">Government Officer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-green-700">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={registerData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-green-700">Password *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password (min 4 characters)"
                        value={registerData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 pr-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-700"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password" className="text-green-700">Confirm Password *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                      <Input
                        id="register-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Optional Fields Section */}
                  <div className="mt-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-1 border-t border-green-200"></div>
                      <span className="px-3 text-sm text-green-600 bg-white">Optional Information</span>
                      <div className="flex-1 border-t border-green-200"></div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-phone" className="text-green-700">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                          <Input
                            id="register-phone"
                            type="tel"
                            placeholder="+91 9876543210 (optional)"
                            value={registerData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-state" className="text-green-700">State</Label>
                          <Select value={registerData.state} onValueChange={(value) => handleInputChange('state', value)}>
                            <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                              <SelectValue placeholder="Select state (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              {indianStates.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-district" className="text-green-700">District</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                            <Input
                              id="register-district"
                              type="text"
                              placeholder="Your district (optional)"
                              value={registerData.district}
                              onChange={(e) => handleInputChange('district', e.target.value)}
                              className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-aadhar" className="text-green-700">Aadhar Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                          <Input
                            id="register-aadhar"
                            type="text"
                            placeholder="1234-5678-9012 (optional)"
                            value={registerData.aadharNumber}
                            onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                            className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Link 
                to="/" 
                className="text-sm text-green-600 hover:text-green-800 underline"
              >
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
