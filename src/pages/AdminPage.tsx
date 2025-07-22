import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Users, 
  Activity, 
  Database,
  Settings,
  Search,
  MoreVertical,
  Ban,
  Mail,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'system', name: 'System', icon: Database },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const stats = [
    { name: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { name: 'Active Subscriptions', value: '1,923', change: '+8%', icon: TrendingUp, color: 'text-green-600' },
    { name: 'Monthly Revenue', value: '$48,291', change: '+15%', icon: TrendingUp, color: 'text-emerald-600' },
    { name: 'Support Tickets', value: '23', change: '-5%', icon: AlertTriangle, color: 'text-orange-600' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'pro', status: 'active', joined: '2024-01-26' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'free', status: 'active', joined: '2024-01-25' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', plan: 'enterprise', status: 'active', joined: '2024-01-24' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', plan: 'pro', status: 'suspended', joined: '2024-01-23' },
  ];

  const systemMetrics = [
    { name: 'Server Uptime', value: '99.98%', status: 'healthy' },
    { name: 'Response Time', value: '245ms', status: 'healthy' },
    { name: 'Error Rate', value: '0.02%', status: 'healthy' },
    { name: 'Database Load', value: '68%', status: 'warning' },
  ];

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'pro': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <DashboardLayout title="Admin Panel" subtitle="Manage users, monitor system performance, and configure settings">
      <div className="space-y-8">
        {/* Admin Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.name} hover>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">Recent User Signups</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(user.plan)}`}>
                            {user.plan}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(user.joined), 'MMM d')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">System Health</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemMetrics.map((metric) => (
                      <div key={metric.name} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-gray-900">{metric.value}</span>
                          <CheckCircle className={`w-4 h-4 ${getMetricStatusColor(metric.status)}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
                />
              </div>
              <Button variant="outline">Export Users</Button>
            </div>

            {/* Users Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="font-medium text-gray-600">
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(user.plan)}`}>
                              {user.plan}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(user.joined), 'MMM d, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Mail className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Ban className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemMetrics.map((metric) => (
                <Card key={metric.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      </div>
                      <CheckCircle className={`w-8 h-8 ${getMetricStatusColor(metric.status)}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">System Logs</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-green-600">[INFO] User authentication successful - user@example.com</div>
                  <div className="text-blue-600">[DEBUG] Database connection established</div>
                  <div className="text-orange-600">[WARN] High memory usage detected: 85%</div>
                  <div className="text-green-600">[INFO] Backup completed successfully</div>
                  <div className="text-gray-600">[INFO] System health check passed</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Application Settings</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Name
                    </label>
                    <Input value="ClientPulse" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Support Email
                    </label>
                    <Input value="support@clientpulse.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum File Size (MB)
                    </label>
                    <Input value="10" type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Timeout (minutes)
                    </label>
                    <Input value="30" type="number" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Feature Flags</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">New Dashboard</h4>
                    <p className="text-sm text-gray-500">Enable the new dashboard interface</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Beta Features</h4>
                    <p className="text-sm text-gray-500">Allow users to access beta features</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};