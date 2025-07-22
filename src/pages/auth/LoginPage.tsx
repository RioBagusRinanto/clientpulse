import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">CP</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-600 mt-2">Sign in to your ClientPulse account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full"
              icon={ArrowRight}
              loading={loading}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500 text-sm">
              Forgot your password?
            </Link>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">Don't have an account? </span>
            <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium text-sm">
              Sign up
            </Link>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Demo accounts:</p>
            <p className="text-xs text-gray-500">User: user@demo.com</p>
            <p className="text-xs text-gray-500">Admin: admin@demo.com</p>
            <p className="text-xs text-gray-500">Password: any password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};