import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Send, 
  Search, 
  Paperclip,
  User,
  MessageCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Message } from '../types';
import { format } from 'date-fns';

export const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useLocalStorage<Message[]>('messages', [
    {
      id: '1',
      projectId: '1',
      senderId: 'client-1',
      senderName: 'Sarah Johnson',
      content: 'The website mockups look great! I love the color scheme and layout. Can we make the hero section a bit more prominent?',
      type: 'feedback',
      createdAt: '2024-01-26T09:30:00Z',
    },
    {
      id: '2',
      projectId: '1',
      senderId: 'user-1',
      senderName: 'You',
      content: 'Absolutely! I\'ll adjust the hero section to make it more prominent. I\'ll have the updated version ready by tomorrow.',
      type: 'message',
      createdAt: '2024-01-26T10:15:00Z',
    },
    {
      id: '3',
      projectId: '2',
      senderId: 'client-2',
      senderName: 'Mike Chen',
      content: 'When will the first prototype be ready for testing? Our team is excited to see the progress.',
      type: 'message',
      createdAt: '2024-01-26T14:20:00Z',
    },
    {
      id: '4',
      projectId: '1',
      senderId: 'system',
      senderName: 'System',
      content: 'Project status update: Website Redesign is now 75% complete. Next milestone: Final review scheduled for next week.',
      type: 'status-update',
      createdAt: '2024-01-26T16:00:00Z',
    },
  ]);

  const [selectedProject, setSelectedProject] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    { id: '1', name: 'Website Redesign', client: 'Sarah Johnson' },
    { id: '2', name: 'Mobile App Development', client: 'Mike Chen' },
    { id: '3', name: 'Brand Identity Package', client: 'Sarah Johnson' },
  ];

  const filteredMessages = messages
    .filter(message => 
      message.projectId === selectedProject &&
      (message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
       message.senderName.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      projectId: selectedProject,
      senderId: 'user-1',
      senderName: 'You',
      content: newMessage,
      type: 'message',
      createdAt: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'feedback': return 'bg-blue-50 border-blue-200';
      case 'status-update': return 'bg-green-50 border-green-200';
      default: return 'bg-white border-gray-200';
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'feedback': return MessageCircle;
      case 'status-update': return CheckCircle2;
      default: return MessageCircle;
    }
  };

  return (
    <DashboardLayout title="Messages" subtitle="Communicate with your clients and track project discussions">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        {/* Project List */}
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Projects</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                    selectedProject === project.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <p className="font-medium text-gray-900">{project.name}</p>
                  <p className="text-sm text-gray-500">{project.client}</p>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-500">
                      {messages.filter(m => m.projectId === project.id).length} messages
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages Area */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {projects.find(p => p.id === selectedProject)?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    with {projects.find(p => p.id === selectedProject)?.client}
                  </p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                  />
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredMessages.map(message => {
                const TypeIcon = getMessageTypeIcon(message.type);
                const isCurrentUser = message.senderId.startsWith('user');
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                      <div className={`
                        p-3 rounded-lg border
                        ${isCurrentUser 
                          ? 'bg-blue-600 text-white' 
                          : getMessageTypeColor(message.type)
                        }
                      `}>
                        {!isCurrentUser && (
                          <div className="flex items-center mb-2">
                            <TypeIcon className="w-4 h-4 mr-2 text-gray-600" />
                            <span className="font-medium text-sm text-gray-900">
                              {message.senderName}
                            </span>
                            {message.type !== 'message' && (
                              <span className="ml-2 px-2 py-1 text-xs bg-white text-gray-600 rounded-full">
                                {message.type.replace('-', ' ')}
                              </span>
                            )}
                          </div>
                        )}
                        <p className={`text-sm ${isCurrentUser ? 'text-white' : 'text-gray-900'}`}>
                          {message.content}
                        </p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                        {format(new Date(message.createdAt), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-end space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={2}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  icon={Send}
                  disabled={!newMessage.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};