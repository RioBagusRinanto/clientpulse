import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FolderOpen, 
  MessageCircle, 
  BarChart3, 
  Settings, 
  CreditCard,
  Shield,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';


const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Messages', href: '/messages', icon: MessageCircle },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Billing', href: '/billing', icon: CreditCard },
];

const adminNavigation = [
  { name: 'Admin Panel', href: '/admin', icon: Shield },
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">CP</span>
          </div>
          <span className="ml-3 text-xl font-semibold text-gray-900">ClientPulse</span>
        </div>
        
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${isActive(item.href) 
                    ? 'bg-blue-50 text-blue-700 border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-blue-500' : 'text-gray-400'}`} />
                {item.name}
              </NavLink>
            ))}
            
            {user?.role === 'admin' && (
              <div className="mt-8">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Admin
                </h3>
                <div className="mt-2 space-y-1">
                  {adminNavigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={`
                        group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                        ${isActive(item.href) 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-blue-500' : 'text-gray-400'}`} />
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </nav>
          
          <div className="flex-shrink-0 px-4 pb-4">
            <div className="flex items-center p-3 rounded-lg bg-gray-50">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.plan} Plan</p>
              </div>
              <button
                onClick={logout}
                className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};