import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Plus, 
  Search, 
  Mail, 
  Building,
  MoreVertical,
  Edit,
  Trash2,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Client } from '../types';

export const ClientsPage: React.FC = () => {
  const { user } = useAuth();
  const [clients, setClients] = useLocalStorage<Client[]>('clients', [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      company: 'TechCorp Inc.',
      status: 'active',
      projectsCount: 3,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@startupxyz.com',
      company: 'StartupXYZ',
      status: 'active',
      projectsCount: 1,
      createdAt: '2024-01-20T14:30:00Z',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    company: '',
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email) return;

    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name,
      email: newClient.email,
      company: newClient.company,
      status: 'active',
      projectsCount: 0,
      createdAt: new Date().toISOString(),
    };

    setClients([...clients, client]);
    setNewClient({ name: '', email: '', company: '' });
    setShowAddModal(false);
  };

  const canAddClient = user?.plan !== 'free' || clients.length < 2;

  return (
    <DashboardLayout title="Clients" subtitle="Manage your client relationships">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
            />
          </div>
          
          <Button
            onClick={() => setShowAddModal(true)}
            icon={Plus}
            disabled={!canAddClient}
          >
            Add Client
          </Button>
        </div>

        {/* Free Plan Limit Warning */}
        {user?.plan === 'free' && clients.length >= 2 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <p className="text-orange-800">
                You've reached the 2-client limit for the free plan. 
                <Button variant="ghost" size="sm" className="ml-2 text-orange-800 hover:text-orange-900">
                  Upgrade to add more clients
                </Button>
              </p>
            </CardContent>
          </Card>
        )}

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} hover>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-500">{client.company}</p>
                    </div>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    {client.projectsCount} active project{client.projectsCount !== 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status}
                  </span>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Client Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <h3 className="text-lg font-medium">Add New Client</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Full Name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="Enter client name"
                />
                <Input
                  label="Email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  placeholder="Enter email address"
                />
                <Input
                  label="Company (Optional)"
                  value={newClient.company}
                  onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                  placeholder="Enter company name"
                />
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddClient}
                    className="flex-1"
                  >
                    Add Client
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};