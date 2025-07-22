import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const popularPages = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Clients', href: '/clients', icon: Search },
    { name: 'Projects', href: '/projects', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-blue-200 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">CP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Oops! Page not found
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-gray-500">
            Don't worry, it happens to the best of us. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button onClick={handleGoBack} icon={ArrowLeft} variant="outline">
            Go Back
          </Button>
          <Link to="/dashboard">
            <Button icon={Home}>
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Popular Pages */}
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Popular pages
            </h3>
            <div className="space-y-2">
              {popularPages.map((page) => (
                <Link
                  key={page.name}
                  to={page.href}
                  className="flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <page.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                    {page.name}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Still can't find what you're looking for?{' '}
            <Link to="/settings" className="text-blue-600 hover:text-blue-500 font-medium">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};