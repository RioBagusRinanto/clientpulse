import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

// Dashboard Pages
import { DashboardPage } from './pages/DashboardPage';
import { ClientsPage } from './pages/ClientsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { MessagesPage } from './pages/MessagesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { BillingPage } from './pages/BillingPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

// Error Pages
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/clients" element={
              <ProtectedRoute>
                <ClientsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/projects" element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/messages" element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            } />
            
            <Route path="/analytics" element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/billing" element={
              <ProtectedRoute>
                <BillingPage />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Admin Only Route */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminPage />
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;