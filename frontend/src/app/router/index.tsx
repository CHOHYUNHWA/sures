import { createBrowserRouter } from 'react-router-dom'
import { CustomerHomePage } from '@/pages/customer/home'
import { AdminLoginPage } from '@/pages/admin/login'
import { AdminLayout } from '@/widgets/sidebar'
import { CustomerLayout } from '@/widgets/header'

export const router = createBrowserRouter([
  // Customer Routes
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <CustomerHomePage /> },
      // 추가 고객 라우트는 여기에
    ],
  },
  // Admin Routes
  {
    path: '/admin',
    children: [
      { path: 'login', element: <AdminLoginPage /> },
      {
        element: <AdminLayout />,
        children: [
          // 추가 관리자 라우트는 여기에
        ],
      },
    ],
  },
  // Default redirect
  {
    path: '/',
    element: <CustomerHomePage />,
  },
])
