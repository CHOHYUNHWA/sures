import { Hero, ValueCard, ServiceCard, ProcessStep, FadeIn, BottomCTA } from '@/components/ui'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title={<>당신의 필요에<br /> <span style={{ color: '#c0a460' }}>확신</span>을 더하는 파트너</>}
        subtitle={<>시작부터 결이 다른 전략으로<br />모든 세무 문제를 해결하세요.</>}
        backgroundImage="/image/sures_background.png"
      />

      {/* 핵심 가치 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <h2 className={styles.sectionTitle}>슈어스는 고객의 확신을<br className={styles.mobileBreak} /> 성공으로 연결합니다.</h2>
          </FadeIn>
          <div className="grid-3">
            <FadeIn delay={0}>
              <ValueCard
                icon="👨‍💼"
                title="대표 세무사 전담"
                description="믿을 수 있는 전문가와 함께하세요. 직원에게 맡기기만 하는 사무소와는 다릅니다. 더 꼼꼼하게 더 전문적으로 대표 세무사가 직접 관리합니다."
                delay={0}
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <ValueCard
                icon="🕐"
                title="스마트 온라인 예약"
                description="언제 어디서나 편리하게 예약하세요. 24시간 네이버 예약과 카카오톡 채널을 통해 간편하게 소통하실 수 있습니다."
                delay={0}
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <ValueCard
                icon="🏢"
                title="기업 재무팀 경력"
                description="기업 재무팀 경력으로 실무를 깊게 이해합니다. 업무 현장과 업종을 고려한 최적의 절세 전략과 세무환경을 구축합니다."
                delay={0}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <h2 className={styles.sectionTitle}>전문 세무 서비스</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className={styles.sectionSubtitle}>
              신고 대행을 넘어 사업의 성장을 이끄는 파트너가 되겠습니다
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className={styles.serviceGrid}>
              <div className={styles.serviceTag}>
                <div className={styles.serviceTitle}>법인세</div>
                <div className={styles.serviceBadges}>
                  <span className={styles.badge}>법인결산</span>
                  <span className={styles.badge}>세무조정</span>
                </div>
              </div>
              <div className={styles.serviceTag}>
                <div className={styles.serviceTitle}>종합소득세</div>
                <div className={styles.serviceBadges}>
                  <span className={styles.badge}>개인사업자</span>
                  <span className={styles.badge}>성실신고</span>
                </div>
              </div>
              <div className={styles.serviceTag}>
                <div className={styles.serviceTitle}>경리 아웃소싱</div>
                <div className={styles.serviceBadges}>
                  <span className={styles.badge}>장부관리</span>
                  <span className={styles.badge}>원천세</span>
                </div>
              </div>
              <div className={styles.serviceTag}>
                <div className={styles.serviceTitle}>양도·상속·증여</div>
                <div className={styles.serviceBadges}>
                  <span className={styles.badge}>절세전략</span>
                  <span className={styles.badge}>사후관리</span>
                </div>
              </div>
              <div className={styles.serviceTag}>
                <div className={styles.serviceTitle}>부가가치세</div>
                <div className={styles.serviceBadges}>
                  <span className={styles.badge}>일반/간이</span>
                  <span className={styles.badge}>예정/확정</span>
                </div>
              </div>
              <div className={styles.serviceTag}>
                <div className={styles.serviceTitle}>세무조사 대응</div>
                <div className={styles.serviceBadges}>
                  <span className={styles.badge}>전략적대응</span>
                  <span className={styles.badge}>납세자보호</span>
                </div>
              </div>
              <div className={styles.serviceTag}>
                <div className={styles.serviceTitle}>조세불복</div>
                <div className={styles.serviceBadges}>
                  <span className={styles.badge}>이의신청</span>
                  <span className={styles.badge}>심판청구</span>
                </div>
              </div>
              <div className={styles.serviceTag}>
                <div className={styles.serviceTitle}>신규창업자</div>
                <div className={styles.serviceBadges}>
                  <span className={styles.badge}>사업자등록</span>
                  <span className={styles.badge}>창업감면</span>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className={styles.serviceButtonWrapper}>
              <a href="/services" className={styles.serviceButton}>
                자세히 보기
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 예약 프로세스 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <h2 className={styles.sectionTitle}>간편한 온라인 예약 절차</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className={styles.sectionSubtitle}>
              단 3단계로 세무 상담 예약을 완료하세요
            </p>
          </FadeIn>
          <div className={styles.processGrid}>
            <FadeIn delay={0.1}>
              <ProcessStep
                step={1}
                title="날짜 선택"
                description="원하시는 상담 날짜를 선택하세요"
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <ProcessStep
                step={2}
                title="시간 선택"
                description="예약 가능한 시간대를 확인하고 선택하세요"
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <ProcessStep
                step={3}
                title="정보 입력"
                description="고객 정보와 상담 내용을 입력하면 완료!"
                showArrow={false}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      <BottomCTA />
    </>
  )
}
