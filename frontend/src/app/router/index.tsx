import { createBrowserRouter, Navigate } from 'react-router-dom'
import { CustomerHomePage } from '@/pages/customer/home'
import { ReservationApplyPage } from '@/pages/customer/reservation-apply'
import { ReservationCompletePage } from '@/pages/customer/reservation-complete'
import { ReservationVerifyPage } from '@/pages/customer/reservation-verify'
import { ReservationDetailPage } from '@/pages/customer/reservation-detail'
import { AdminLoginPage } from '@/pages/admin/login'
import { AdminRegisterPage } from '@/pages/admin/register'
import { AdminReservationListPage } from '@/pages/admin/reservation-list'
import { AdminReservationCreatePage } from '@/pages/admin/reservation-create'
import { AdminLayout } from '@/widgets/sidebar'
import { CustomerLayout } from '@/widgets/header'

export const router = createBrowserRouter([
  // Customer Routes
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <CustomerHomePage /> },
      { path: 'reservations/apply', element: <ReservationApplyPage /> },
      { path: 'reservations/complete', element: <ReservationCompletePage /> },
      { path: 'reservations/verify', element: <ReservationVerifyPage /> },
      { path: 'reservations/:id', element: <ReservationDetailPage /> },
    ],
  },
  // Admin Routes
  {
    path: '/admin',
    children: [
      { path: 'login', element: <AdminLoginPage /> },
      { path: 'register', element: <AdminRegisterPage /> },
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/reservations" replace /> },
          { path: 'reservations', element: <AdminReservationListPage /> },
          { path: 'reservations/new', element: <AdminReservationCreatePage /> },
        ],
      },
    ],
  },
  // Default redirect
  {
    path: '/',
    element: <Navigate to="/customer" replace />,
  },
])
