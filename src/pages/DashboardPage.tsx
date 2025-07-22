import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { 
  Users, 
  FolderOpen, 
  MessageCircle, 
  TrendingUp,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { name: 'Active Clients', value: user?.plan === 'free' ? '2' : '12', icon: Users, color: 'text-blue-600' },
    { name: 'Active Projects', value: '8', icon: FolderOpen, color: 'text-green-600' },
    { name: 'Messages Today', value: '24', icon: MessageCircle, color: 'text-purple-600' },
    { name: 'Response Rate', value: '96%', icon: TrendingUp, color: 'text-emerald-600' },
  ];

  const recentProjects = [
    { id: 1, name: 'Website Redesign', client: 'TechCorp', status: 'in-progress', progress: 75 },
    { id: 2, name: 'Mobile App', client: 'StartupXYZ', status: 'review', progress: 90 },
    { id: 3, name: 'Brand Identity', client: 'LocalBiz', status: 'planning', progress: 25 },
  ];

  const recentMessages = [
    { id: 1, client: 'Sarah Johnson', message: 'The design looks great! Can we adjust the color?', time: '10 min ago' },
    { id: 2, client: 'Mike Chen', message: 'When will the first draft be ready?', time: '1 hour ago' },
    { id: 3, client: 'Emma Davis', message: 'Thanks for the quick update!', time: '2 hours ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'review': return 'text-orange-600 bg-orange-100';
      case 'planning': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'review': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back! Here's what's happening with your clients.">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.name} hover>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Free Plan Upgrade Banner */}
        {user?.plan === 'free' && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-blue-900">You're on the Free Plan</h3>
                  <p className="text-blue-700 mt-1">Upgrade to manage unlimited clients and unlock advanced features.</p>
                </div>
                <Button variant="primary" size="sm">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Projects</h3>
                <Button variant="ghost" size="sm" icon={Plus}>
                  New Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => {
                  const StatusIcon = getStatusIcon(project.status);
                  return (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <StatusIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{project.name}</p>
                          <p className="text-sm text-gray-500">{project.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ')}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{project.progress}% complete</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Messages</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{message.client}</p>
                        <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                      </div>
                      <span className="text-xs text-gray-500 ml-4">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};