import type { Metadata } from 'next'
import Image from 'next/image'
import { Hero, FadeIn, BottomCTA } from '@/components/ui'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '슈어스세무회계, 당신의 필요에 확신을 더하는 파트너',
  description: '대표 세무사 김성국. 국세청 출석부터 조세불복까지, 실전 세무의 압도적 경험으로 고객의 정당한 권익을 되찾아 드립니다.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title={<>납세의 부담은 덜고<br />납세자의 권리는<br />지켜드리겠습니다</>}
        badge="세무사 소개"
        backgroundImage="/image/sures_background.png"
      />

      {/* 대표 세무사 소개 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <div className={styles.profileSection}>
              <div className={styles.profileImage}>
                <Image
                  src="/image/profile.png"
                  alt="대표 세무사 김성국"
                  width={240}
                  height={240}
                  className={styles.profileImg}
                />
              </div>
              <div className={styles.profileContent}>
                <h2 className={styles.profileName}><span className={styles.profileLabel}>대표 세무사</span> 김성국</h2>
                <div className={styles.profileDivider}></div>
                <p className={styles.profileSlogan}>전 영역을 아우르는 올라운더(All-rounder) 세무사</p>
                <p className={styles.profileDescription}>
                  &lsquo;이 분야는 어떻게 아세요?&rsquo; 고객님께 가장 많이 들어본 말입니다.
                </p>
                <p className={styles.profileDescription}>
                  사업 경영부터 신기술까지, 다양한 업종을 이해하고 세법으로 해결해 왔습니다.
                </p>
                <p className={styles.profileDescription}>
                  고객님의 상황과 업종, 트렌드까지 세무와 연결하여 생각하는 <strong>스마트 세무</strong>를 경험하세요.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 주요 성과 및 사례 */}
      <section className={styles.caseSection}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <div className={styles.badge}>주요 성과 및 사례</div>
          </FadeIn>

          <FadeIn delay={0}>
            <div className={styles.caseCard}>
              <h3 className={styles.caseTitle}>법인결산 및 세무조정</h3>
              <div className={styles.caseDivider}></div>
              <p className={styles.caseSubtitle}>법인 재무팀 출신, 기업 내부를 아는 진짜 법인 세무 전문가</p>
              <ul className={styles.caseList}>
                <li>
                  <strong>기업 내부 시스템 최적화</strong> : 연간 예산 수립 및 결산, 법인외부조정 사항 검토 등을 전담하여 실무자의 환경을 누구보다 잘 이해하고 있습니다. 사업내용과 업종을 고려한 최적의 법인 세무를 설계합니다.
                </li>
                <li>
                  <strong>현장중심형 법인 세무 전문가</strong> : 단순 장부관리와 세무 업무를 넘어 기업의 목표를 함께 고민하고 의사결정 과정을 지원했습니다. 슈어스는 기업 내부 사정과 비즈니스 흐름까지 읽는 실무형 파트너입니다.
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className={styles.caseCard}>
              <h3 className={styles.caseTitle}>세무조사</h3>
              <div className={styles.caseDivider}></div>
              <p className={styles.caseSubtitle}>서울지방국세청 조사국 및 일선 세무서 세무조사 대응</p>
              <ul className={styles.caseList}>
                <li>
                  <strong>직접 대응</strong> : 과세자료 방어를 회사에만 맡기지 않습니다. 사실관계 수집과 판단 등 전 과정을 직접 설계하고 대응하므로 세무조사로 인한 회사 실무자의 피로감이 없고 일상 업무에 집중할 수 있습니다.
                </li>
                <li>
                  <strong>결과 증명</strong> : 까다로운 세무 이슈별 치밀한 법적 근거 마련과 대응 시나리오를 통해 부당한 과세를 방어했습니다.
                </li>
                <li>
                  <strong>솔루션 제공</strong> : 단순 대응을 넘어 철저한 사후관리 솔루션을 제시함으로써 미래의 세무 리스크까지 최소화하는 전략적 결과를 만들었습니다.
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className={styles.caseCard}>
              <h3 className={styles.caseTitle}>조세불복</h3>
              <div className={styles.caseDivider}></div>
              <p className={styles.caseSubtitle}>이의신청, 심판청구 등 불복절차 대행</p>
              <ul className={styles.caseList}>
                <li>
                  <strong>의견 진술</strong> : 조세심판원, 일선세무서 등 심의위원회에 직접 출석하여 논리적 구두 변론을 통해 납세자의 억울함을 대변했습니다.
                </li>
                <li>
                  <strong>입체적 법리 검토</strong> : 실체법와 절차법을 아우르는 치밀한 법리 분석으로 생각지도 못한 법적 흠결을 찾아 유리한 결정을 이끌어 냈습니다.
                </li>
                <li>
                  <strong>압도적 결과</strong> : 잘못된 과세처분 취소, 납세자에게 유리한 결정을 유도하여 사소한 절차상 하자까지 놓치지 않고 납세자의 정당한 권익을 보호했습니다.
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className={styles.caseCard}>
              <h3 className={styles.caseTitle}>양도·상속·증여 컨설팅</h3>
              <div className={styles.caseDivider}></div>
              <p className={styles.caseSubtitle}>복잡하게 얽힌 자산 구조도 명쾌하게</p>
              <ul className={styles.caseList}>
                <li>
                  <strong>풍부한 자산 이전 세무신고 경험</strong> : 주택, 상가, 토지보상, 재건축아파트 등 복잡하고 어려운 부동산 이전 신고 경험을 보유하고 있습니다. 복잡할수록 강해지는 슈어스의 전문가는 자산가치를 지키기 위해 정교하게 설계합니다.
                </li>
                <li>
                  <strong>자산 이전 맞춤 설계</strong> : 단순한 신고를 넘어 가장 유리한 이전 시점과 방법을 시뮬레이션하여, 세부담을 최소화하는 개인별 맞춤 절세 로드맵을 제시합니다.
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className={styles.caseCard}>
              <h3 className={styles.caseTitle}>복합 절세 전략 컨설팅</h3>
              <div className={styles.caseDivider}></div>
              <p className={styles.caseSubtitle}>복잡한 세무 의사결정을 성공으로 이끈 풍부한 컨설팅 이력</p>
              <ul className={styles.caseList}>
                <li>
                  <strong>지배구조 개편 지원</strong> : 가업승계, 합병, 분할, 법인전환 등 기업 지배구조 개편 컨설팅을 다수 수행하였으며 안정적인 사전 준비를 지원합니다.
                </li>
                <li>
                  <strong>세금환급</strong> : 놓친 세액 공제·감면을 발굴하여 수백만 원부터 수천만 원에 이르는 경정청구 인용 결정을 이끌어 냈습니다.
                </li>
                <li>
                  <strong>전 직종 중장기 맞춤 세무 컨설팅</strong> : 건설·제조·도소매·임대·서비스·병의원·비영리 등 대부분의 업종과 업종별 특수 회계까지 모두 다뤘습니다. 사업환경과 세무리스크를 고려한 맞춤별 세무관리를 제공합니다.
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <BottomCTA />
    </>
  )
}
