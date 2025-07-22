import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Check, 
  Download,
  Calendar,
  Users,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const BillingPage: React.FC = () => {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for trying out ClientPulse',
      features: [
        'Up to 2 clients',
        'Basic messaging',
        'Simple analytics',
        'Email support',
      ],
      limitations: ['Limited features', 'Basic support'],
      current: user?.plan === 'free',
    },
    {
      name: 'Pro',
      price: { monthly: 29, yearly: 290 },
      description: 'For growing businesses and agencies',
      features: [
        'Unlimited clients',
        'Advanced messaging',
        'Team collaboration',
        'Detailed analytics',
        'Automated status updates',
        'Priority support',
        'Custom branding',
      ],
      popular: true,
      current: user?.plan === 'pro',
    },
    {
      name: 'Enterprise',
      price: { monthly: 99, yearly: 990 },
      description: 'For large teams and agencies',
      features: [
        'Everything in Pro',
        'Advanced team management',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Advanced security',
        'Custom reporting',
      ],
      current: user?.plan === 'enterprise',
    },
  ];

  const invoices = [
    { id: 'INV-001', date: '2024-01-01', amount: 29, status: 'paid' },
    { id: 'INV-002', date: '2023-12-01', amount: 29, status: 'paid' },
    { id: 'INV-003', date: '2023-11-01', amount: 29, status: 'paid' },
  ];

  const handleUpgrade = (planName: string) => {
    // In a real app, this would integrate with Stripe
    alert(`Upgrading to ${planName} plan... (This would integrate with Stripe)`);
  };

  return (
    <DashboardLayout title="Billing & Subscription" subtitle="Manage your subscription and billing information">
      <div className="space-y-8">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Current Plan</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-900 capitalize">{user?.plan} Plan</h4>
                <p className="text-gray-600">
                  {user?.plan === 'free' 
                    ? 'You\'re currently on the free plan with limited features' 
                    : 'Your subscription is active and will renew automatically'
                  }
                </p>
              </div>
              {user?.plan !== 'free' && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${user?.plan === 'pro' ? 29 : 99}<span className="text-sm font-normal text-gray-500">/month</span>
                  </p>
                  <p className="text-sm text-gray-500">Next billing: Feb 1, 2024</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly <span className="text-green-600 text-xs">(Save 16%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-gray-500">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.current ? 'outline' : plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => !plan.current && handleUpgrade(plan.name)}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Usage Stats (for paid plans) */}
        {user?.plan !== 'free' && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Usage This Month</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-gray-600">Active Clients</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">847</p>
                    <p className="text-gray-600">Messages Sent</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                    <p className="text-gray-600">Status Updates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Billing History */}
        {user?.plan !== 'free' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Billing History</h3>
                <Button variant="outline" size="sm" icon={Download}>
                  Download All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {invoice.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${invoice.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};