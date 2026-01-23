import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui'
import styles from './Home.module.css'

export function CustomerHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <img src="/image/logo.png" alt="Sures 로고" className={styles.heroLogo} />
          <h1 className={styles.heroTitle}>세무 상담 예약</h1>
          <p className={styles.heroSubtitle}>
            간편하게 세무 상담을 예약하고
            <br />
            전문 세무사의 상담을 받아보세요
          </p>
          <div className={styles.heroActions}>
            <Link to="/customer/reservations/apply">
              <Button variant="accent" size="lg" block>
                예약 신청하기
              </Button>
            </Link>
            <Link to="/customer/reservations/verify">
              <Button variant="outline" size="lg" block className={styles.outlineWhite}>
                예약 조회하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.featuresTitle}>서비스 안내</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>간편한 예약</h3>
              <p className={styles.featureDesc}>
                온라인으로 24시간 언제든지
                <br />
                상담 예약이 가능합니다
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>전문 상담</h3>
              <p className={styles.featureDesc}>
                경험 많은 전문 세무사가
                <br />
                맞춤 상담을 제공합니다
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>예약 확인</h3>
              <p className={styles.featureDesc}>
                예약 내역을 언제든지
                <br />
                확인하고 관리할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <h2>지금 바로 상담 예약하세요</h2>
          <p>
            세무 관련 궁금한 점이 있으신가요?
            <br />
            전문 세무사가 친절하게 상담해 드립니다.
          </p>
          <Link to="/customer/reservations/apply">
            <Button variant="primary" size="lg">
              예약 신청하기
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
