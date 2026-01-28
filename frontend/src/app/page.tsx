import { Hero, ValueCard, ServiceCard, ProcessStep } from '@/components/ui'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="당신의 필요에 확신을 더하는 파트너"
        subtitle="시작부터 결이 다른 전략으로 모든 세무 문제를 해결하세요."
        backgroundImage="/image/sures_background.png"
      >
        <div className={styles.ctaButtons}>
          <a
            href="http://pf.kakao.com/_zqepn"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButtonOutline}
          >
            카카오톡 문의
          </a>
          <a
            href="https://map.naver.com/p/entry/place/2083776809?c=15.00,0,0,0,dh&placePath=/ticket?fromPanelNum=1&additionalHeight=76&timestamp=202601281353&locale=ko&svcName=map_pcv5&additionalHeight=76&timestamp=202601281353&locale=ko&svcName=map_pcv5&fromPanelNum=1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButtonPrimary}
          >
            예약하기 →
          </a>
        </div>
      </Hero>

      {/* 핵심 가치 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>슈어스는 고객의 확신을 성공으로 연결합니다.</h2>
          <div className="grid-3">
            <ValueCard
              icon="👨‍💼"
              title="대표 세무사 전담"
              description="믿을 수 있는 전문가와 함께하세요. 직원에게 맡기는 대형 사무소와는 다릅니다. 더 꼼꼼하게 더 전문적으로 대표 세무사가 직접 관리합니다."
            />
            <ValueCard
              icon="🕐"
              title="스마트 온라인 예약"
              description="언제 어디서나 편리하게 예약하세요. 24시간 네이버 예약과 카카오톡 채널을 통해 간편하게 소통하실 수 있습니다."
            />
            <ValueCard
              icon="🏢"
              title="대형 법인 재무팀 경력"
              description="실무 노하우를 바탕으로 기업의 재무 상태를 면밀히 분석하여 과도한 세금 지출을 막고 기업 성장을 위한 최적의 세무 환경을 구축합니다."
            />
          </div>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>전문 세무 서비스</h2>
          <p className={styles.sectionSubtitle}>
            신고 대행을 넘어 사업의 성장을 이끄는 파트너가 되겠습니다
          </p>
          <div className="grid-2">
            <ServiceCard
              title="경리 아웃소싱"
              description="복잡한 장부 관리를 전문가에게 맡기세요. 회계 처리, 급여 계산, 부가세 신고 등 경리 업무를 체계적으로 지원합니다."
              link="/services"
            />
            <ServiceCard
              title="세무조사 대응"
              description="철저한 준비와 전문적인 대응으로 함께합니다. 자료 준비부터 조사 입회, 의견 진술까지 모든 과정을 지원합니다."
              link="/services"
            />
            <ServiceCard
              title="양도·상속·증여 자문"
              description="절세 전략과 정확한 신고로 안내합니다. 취득세, 양도세, 상속세, 증여세 등 각종 세목에 대한 전문 컨설팅을 제공합니다."
              link="/services"
            />
            <ServiceCard
              title="조세불복 대행"
              description="부당한 과세에 대한 권리 구제를 도와드립니다. 이의신청, 심사청구, 심판청구 등 불복 절차를 대행합니다."
              link="/services"
            />
          </div>
        </div>
      </section>

      {/* 예약 프로세스 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>간편한 온라인 예약 절차</h2>
          <p className={styles.sectionSubtitle}>
            단 3단계로 세무 상담 예약을 완료하세요
          </p>
          <div className={styles.processGrid}>
            <ProcessStep
              step={1}
              title="날짜 선택"
              description="원하시는 상담 날짜를 선택하세요"
            />
            <ProcessStep
              step={2}
              title="시간 선택"
              description="예약 가능한 시간대를 확인하고 선택하세요"
            />
            <ProcessStep
              step={3}
              title="정보 입력"
              description="고객 정보와 상담 내용을 입력하면 완료!"
              showArrow={false}
            />
          </div>
        </div>
      </section>

      {/* 연락처 정보 */}
      <section className={`${styles.section} ${styles.sectionContact}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>문의하기</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📞</div>
              <h3 className={styles.contactLabel}>전화</h3>
              <p className={styles.contactValue}>02-6954-7716</p>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>✉️</div>
              <h3 className={styles.contactLabel}>이메일</h3>
              <p className={styles.contactValue}>surestax@naver.com</p>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>🕐</div>
              <h3 className={styles.contactLabel}>영업시간</h3>
              <p className={styles.contactValue}>평일 09:00-18:00</p>
            </div>
            <a
              href="http://pf.kakao.com/_zqepn"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <div className={styles.contactIcon}>💬</div>
              <h3 className={styles.contactLabel}>카카오톡</h3>
              <p className={styles.contactValue}>상담하기</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
