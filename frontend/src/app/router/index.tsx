import { createBrowserRouter, Navigate } from 'react-router-dom'
import { CustomerHomePage } from '@/pages/customer/home'
import { ServicesPage } from '@/pages/customer/services'
import { WhyPage } from '@/pages/customer/why'
import { ContactPage } from '@/pages/customer/contact'
 import { CustomerLayout } from '@/widgets/header'

export const router = createBrowserRouter([
  // Customer Routes
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <CustomerHomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'why', element: <WhyPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
  // Default redirect
  {
    path: '/',
    element: <Navigate to="/customer" replace />,
  },
])