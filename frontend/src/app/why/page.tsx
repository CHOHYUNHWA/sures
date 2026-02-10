import type { Metadata } from 'next'
import { Hero, FadeIn, BottomCTA } from '@/components/ui'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '슈어스세무회계, 당신의 필요에 확신을 더하는 파트너',
  description: 'SURES는 고객의 확신을 성공으로 연결합니다. 확신, 트렌드, 방어, 밀착 - 4가지 핵심 가치로 고객의 성공을 지원합니다.',
}

export default function WhyPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title={
          <>
            <span style={{ color: '#BE9F5D' }}>SURES</span>는<br />
            고객의 확신<span style={{ color: '#BE9F5D' }}>SURE</span>을<br />
            성공<span style={{ color: '#BE9F5D' }}>SUCCESS</span>으로 연결합니다
          </>
        }
        backgroundImage="/image/sures_background.png"
        badge="Why SURES"
      />

      {/* 핵심 가치 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <p className={styles.sectionSubtitle}>
              4가지 핵심 가치로 고객의 성공을 지원합니다
            </p>
          </FadeIn>
          <div className="grid-2">
            <FadeIn delay={0}>
              <div className={styles.valueCard}>
                <div className={styles.valueNumber}>01</div>
                <h3 className={styles.valueTitle}>확신</h3>
                <p className={styles.valueSubtitle}>세금 고민 없는 경영</p>
                <p className={styles.valueDescription}>
                  복잡한 세무를 단순하게, 불안함을 확신으로 바꿔드립니다.
                  정확한 신고와 사전 검토로 세무 리스크를 최소화하고,
                  안심하고 사업에 집중할 수 있도록 돕습니다.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className={styles.valueCard}>
                <div className={styles.valueNumber}>02</div>
                <h3 className={styles.valueTitle}>트렌드</h3>
                <p className={styles.valueSubtitle}>업종별 맞춤 세무 전략</p>
                <p className={styles.valueDescription}>
                  급변하는 산업 환경에 대응하는 최신 세무 전략을 제공합니다.
                  1인 창작자, 플랫폼 사업자 등 새로운 비즈니스 모델에 대한
                  전문적인 세무 서비스로 경쟁력을 높입니다.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className={styles.valueCard}>
                <div className={styles.valueNumber}>03</div>
                <h3 className={styles.valueTitle}>방어</h3>
                <p className={styles.valueSubtitle}>과세 리스크 관리</p>
                <p className={styles.valueDescription}>
                  신고 이전의 세무를 봅니다. 사전 검토와 철저한 준비로
                  세무조사와 불필요한 과세를 예방합니다. 절세 전략 수립과
                  조세불복 대응까지 전 과정을 지원합니다.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className={styles.valueCard}>
                <div className={styles.valueNumber}>04</div>
                <h3 className={styles.valueTitle}>밀착</h3>
                <p className={styles.valueSubtitle}>밀착형 소통 서비스</p>
                <p className={styles.valueDescription}>
                  24시간 온라인 예약, 카카오톡 상담으로 언제든 연락 가능합니다.
                  빠른 응대와 체계적인 관리로 고객의 세무 업무를
                  효율적으로 처리합니다.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <BottomCTA />
    </>
  )
}
