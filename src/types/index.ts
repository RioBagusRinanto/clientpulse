export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  avatar?: string;
  status: 'active' | 'inactive';
  projectsCount: number;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  progress: number;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: 'message' | 'feedback' | 'status-update';
  attachments?: string[];
  createdAt: string;
}

export interface StatusUpdate {
  id: string;
  projectId: string;
  title: string;
  message: string;
  schedule: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
  lastSent?: string;
  nextScheduled?: string;
  createdAt: string;
}

export interface Analytics {
  totalProjects: number;
  activeClients: number;
  messagesThisWeek: number;
  responseRate: number;
  projectsCompleted: number;
  avgResponseTime: string;
}