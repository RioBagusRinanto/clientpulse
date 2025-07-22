import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { 
  TrendingUp, 
  MessageCircle, 
  Clock, 
  Users,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const stats = [
    { name: 'Response Rate', value: '96%', change: '+2.3%', icon: TrendingUp, positive: true },
    { name: 'Avg Response Time', value: '2.4h', change: '-12m', icon: Clock, positive: true },
    { name: 'Messages This Week', value: '127', change: '+18', icon: MessageCircle, positive: true },
    { name: 'Active Clients', value: '12', change: '+2', icon: Users, positive: true },
  ];

  const weeklyData = [
    { day: 'Mon', messages: 18, responses: 16 },
    { day: 'Tue', messages: 25, responses: 24 },
    { day: 'Wed', messages: 22, responses: 20 },
    { day: 'Thu', messages: 30, responses: 29 },
    { day: 'Fri', messages: 28, responses: 27 },
    { day: 'Sat', messages: 8, responses: 8 },
    { day: 'Sun', messages: 5, responses: 5 },
  ];

  const responseTimeData = [
    { month: 'Jan', time: 3.2 },
    { month: 'Feb', time: 2.8 },
    { month: 'Mar', time: 2.5 },
    { month: 'Apr', time: 2.4 },
    { month: 'May', time: 2.6 },
    { month: 'Jun', time: 2.4 },
  ];

  const projectStatusData = [
    { name: 'Completed', value: 35, color: '#10b981' },
    { name: 'In Progress', value: 40, color: '#3b82f6' },
    { name: 'Review', value: 15, color: '#f59e0b' },
    { name: 'Planning', value: 10, color: '#6b7280' },
  ];

  return (
    <DashboardLayout title="Analytics" subtitle="Track your communication performance and client engagement">
      <div className="space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.name} hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last week</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Message Activity */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Weekly Message Activity</h3>
              <p className="text-sm text-gray-500">Messages sent and responses received</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="messages" fill="#3b82f6" name="Messages Sent" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="responses" fill="#10b981" name="Responses" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Response Time Trend */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Response Time Trend</h3>
              <p className="text-sm text-gray-500">Average response time in hours</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#2563eb' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Status Distribution */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Project Status</h3>
              <p className="text-sm text-gray-500">Distribution of project phases</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {projectStatusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Insights */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Insights & Recommendations</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Excellent Response Rate</h4>
                  <p className="text-sm text-green-700">Your 96% response rate is above industry average. Keep up the great communication!</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Improving Response Time</h4>
                  <p className="text-sm text-blue-700">Your average response time has improved by 12 minutes this week. Clients appreciate quick responses!</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900">Weekend Activity</h4>
                  <p className="text-sm text-orange-700">Consider setting up automated responses for weekend messages to manage client expectations.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};