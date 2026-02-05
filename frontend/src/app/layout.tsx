import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import { FloatingKakao } from '@/components/ui'
import './globals.css'

export const metadata: Metadata = {
  title: '슈어스세무회계, 당신의 필요에 확신을 더하는 파트너',
  description: '24시간 온라인 예약으로 편리하게, 전문 세무사와 정확하게. 경리 아웃소싱, 세무조사 대응, 양도·상속·증여 자문, 조세불복 대행 서비스를 제공합니다.',
  keywords: ['세무사', '세무회계', '세금', '세무상담', '강동구', '천호동', '슈어스'],
  icons: {
    icon: '/image/square_logo.png',
    apple: '/image/square_logo.png',
  },
  openGraph: {
    title: '슈어스세무회계',
    description: '세무 예약의 새로운 기준 - 24시간 온라인 예약',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div className="page-wrapper">
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingKakao />
        </div>
      </body>
    </html>
  )
}
