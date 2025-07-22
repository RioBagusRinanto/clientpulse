import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Plus, 
  Search, 
  Calendar, 
  User,
  MoreVertical,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { format } from 'date-fns';
import type { Project } from '../types';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete redesign of the corporate website with modern UI/UX',
      clientId: '1',
      status: 'in-progress',
      progress: 75,
      deadline: '2024-02-15T00:00:00Z',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-25T14:30:00Z',
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Native iOS and Android app for customer engagement',
      clientId: '2',
      status: 'review',
      progress: 90,
      deadline: '2024-02-28T00:00:00Z',
      createdAt: '2024-01-20T09:00:00Z',
      updatedAt: '2024-01-26T16:45:00Z',
    },
    {
      id: '3',
      name: 'Brand Identity Package',
      description: 'Logo design, brand guidelines, and marketing materials',
      clientId: '1',
      status: 'planning',
      progress: 25,
      createdAt: '2024-01-25T11:00:00Z',
      updatedAt: '2024-01-25T11:00:00Z',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    clientId: '1',
    deadline: '',
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
      default: return FolderOpen;
    }
  };

  const handleAddProject = () => {
    if (!newProject.name || !newProject.description) return;

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      clientId: newProject.clientId,
      status: 'planning',
      progress: 0,
      deadline: newProject.deadline || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects([...projects, project]);
    setNewProject({ name: '', description: '', clientId: '1', deadline: '' });
    setShowAddModal(false);
  };

  return (
    <DashboardLayout title="Projects" subtitle="Manage and track all your client projects">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <Button onClick={() => setShowAddModal(true)} icon={Plus}>
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const StatusIcon = getStatusIcon(project.status);
            return (
              <Card key={project.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className="w-6 h-6 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Client #{project.clientId}
                    </div>
                    {project.deadline && (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Due {format(new Date(project.deadline), 'MMM d, yyyy')}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      Updated {format(new Date(project.updatedAt), 'MMM d')}
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
            );
          })}
        </div>

        {/* Add Project Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <h3 className="text-lg font-medium">Create New Project</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Project Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Enter project name"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Enter project description"
                    rows={3}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client
                  </label>
                  <select
                    value={newProject.clientId}
                    onChange={(e) => setNewProject({ ...newProject, clientId: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">Sarah Johnson - TechCorp</option>
                    <option value="2">Mike Chen - StartupXYZ</option>
                  </select>
                </div>
                <Input
                  label="Deadline (Optional)"
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
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
                    onClick={handleAddProject}
                    className="flex-1"
                  >
                    Create Project
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