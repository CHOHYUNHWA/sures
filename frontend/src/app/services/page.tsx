import type { Metadata } from 'next'
import { Hero } from '@/components/ui'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '서비스 소개 | 슈어스세무회계',
  description: '경리 아웃소싱, 세무조사 대응, 양도·상속·증여 자문, 조세불복 대행 등 전문 세무 서비스를 제공합니다.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="업무 안내"
        subtitle="신고 대행을 넘어 사업의 성장을 이끄는 파트너가 되겠습니다"
      />

      {/* 서비스 소개 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className="grid-2">
            <div className={styles.serviceDetail}>
              <h3 className={styles.serviceTitle}>경리 아웃소싱</h3>
              <div className={styles.divider}></div>
              <p className={styles.serviceSubtitle}>복잡한 장부 관리를 전문가에게</p>
              <ul className={styles.serviceList}>
                <li>일반 회계 처리 및 결산</li>
                <li>급여 계산 및 4대 보험 관리</li>
                <li>부가세 신고 및 종합소득세 신고</li>
                <li>법인세 신고 및 세무조정</li>
                <li>각종 세무 신고 대행</li>
              </ul>
            </div>

            <div className={styles.serviceDetail}>
              <h3 className={styles.serviceTitle}>세무조사 대응</h3>
              <div className={styles.divider}></div>
              <p className={styles.serviceSubtitle}>철저한 준비와 전문적인 대응</p>
              <ul className={styles.serviceList}>
                <li>세무조사 사전 준비 및 컨설팅</li>
                <li>조사 자료 준비 및 검토</li>
                <li>세무조사 입회 및 대응</li>
                <li>의견 진술 및 소명 자료 작성</li>
                <li>과세 전 적부심사 청구</li>
              </ul>
            </div>

            <div className={styles.serviceDetail}>
              <h3 className={styles.serviceTitle}>양도·상속·증여 자문</h3>
              <div className={styles.divider}></div>
              <p className={styles.serviceSubtitle}>절세 전략과 정확한 신고</p>
              <ul className={styles.serviceList}>
                <li>부동산 양도소득세 절세 컨설팅</li>
                <li>상속세 및 증여세 신고 대행</li>
                <li>가업승계 및 사전증여 설계</li>
                <li>부동산 취득세 및 재산세 자문</li>
                <li>세무조사 대비 사전 검토</li>
              </ul>
            </div>

            <div className={styles.serviceDetail}>
              <h3 className={styles.serviceTitle}>조세불복 대행</h3>
              <div className={styles.divider}></div>
              <p className={styles.serviceSubtitle}>부당한 과세에 대한 권리 구제</p>
              <ul className={styles.serviceList}>
                <li>이의신청 대리 및 자료 작성</li>
                <li>심사청구 및 심판청구 대행</li>
                <li>과세전적부심사 청구</li>
                <li>경정청구 및 환급 신청</li>
                <li>행정소송 자료 준비 지원</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 산업별 특화 */}
      <section className={`${styles.section} ${styles.sectionSpecialty}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.specialtyTitle}>
            다양한 산업에 최적화된 세무 서비스
          </h2>
          <p className={styles.specialtyDescription}>
            1인 미디어 창작자, SNS마켓 사업자, 프리랜서 등<br />
            변화하는 산업 구조에 맞춘 전문 상담을 제공합니다
          </p>
          <div className={styles.industryGrid}>
            <div className={styles.industryItem}>
              <span className={styles.industryIcon}>🎥</span>
              <p className={styles.industryName}>1인 미디어 창작자</p>
            </div>
            <div className={styles.industryItem}>
              <span className={styles.industryIcon}>🛍️</span>
              <p className={styles.industryName}>SNS마켓 사업자</p>
            </div>
            <div className={styles.industryItem}>
              <span className={styles.industryIcon}>💼</span>
              <p className={styles.industryName}>프리랜서</p>
            </div>
            <div className={styles.industryItem}>
              <span className={styles.industryIcon}>🏢</span>
              <p className={styles.industryName}>소상공인</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
