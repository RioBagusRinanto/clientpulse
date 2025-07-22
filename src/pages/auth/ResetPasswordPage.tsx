import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      // Mock password reset - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Invalid or missing token
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid reset link</h1>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <div className="space-y-3">
              <Link to="/forgot-password">
                <Button className="w-full">
                  Request new reset link
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Back to login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Password reset successful</h1>
            <p className="text-gray-600 mb-6">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Redirecting to login page in a few seconds...
            </p>
            <Link to="/login">
              <Button className="w-full">
                Continue to login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">CP</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Set new password</h1>
            <p className="text-gray-600 mt-2">
              Choose a strong password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="New Password"
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              icon={Lock}
              required
              helperText="Must be at least 8 characters long"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={Lock}
              required
            />

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              Reset password
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-600 hover:text-blue-500 text-sm">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};