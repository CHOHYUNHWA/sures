import type { Metadata } from 'next'
import Image from 'next/image'
import { Hero } from '@/components/ui'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '세무사 소개 | 슈어스세무회계, 당신의 필요에 확신을 더하는 파트너',
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
              <p className={styles.profileSlogan}>기장은 기본, 대응은 전문입니다.</p>
              <p className={styles.profileDescription}>
                국세청 출석부터 조세불복까지, 실전 세무의 압도적 경험으로 고객의 정당한 권익을 되찾아 드립니다. 어려운 세무 현장에서 대표님을 지키는 가장 강력한 방패가 되겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 성과 및 사례 */}
      <section className={styles.caseSection}>
        <div className={styles.sectionInner}>
          <div className={styles.badge}>주요 성과 및 사례</div>

          <div className={styles.caseCard}>
            <h3 className={styles.caseTitle}>법인세 신고 및 세무조정</h3>
            <div className={styles.caseDivider}></div>
            <p className={styles.caseSubtitle}>대형 지주사 재무팀 출신, 기업 내부를 아는 진짜 법인 세무 전문가</p>
            <ul className={styles.caseList}>
              <li>
                <strong>지주사 통합 관리 노하우</strong> : 다수의 계열사를 아우르는 연간 예산 수립 및 결산, 법인세 신고를 전담하며 복잡한 지배구조 하의 세무 이슈를 완벽히 해결했습니다.
              </li>
              <li>
                <strong>비영리 법인 및 대규모 재산 관리</strong> : 일반 법인보다 까다로운 비영리 법인의 수익사업 세무조정과 지주사 소유 고액 부동산(기업 재산) 관리를 통해 법인 자산의 세무 리스크를 제로화했습니다.
              </li>
              <li>
                <strong>기업 내부 시스템 최적화</strong> : 재무팀 실무자의 시각에서 기업 내부 시스템의 약점을 파악하고, 세무조사 시 문제가 될 수 있는 지점들을 사전에 정교하게 조정합니다.
              </li>
            </ul>
          </div>

          <div className={styles.caseCard}>
            <h3 className={styles.caseTitle}>세무조사</h3>
            <div className={styles.caseDivider}></div>
            <p className={styles.caseSubtitle}>서울지방국세청 조사국 및 일선 세무서 통합조사 수임 및 대응</p>
            <ul className={styles.caseList}>
              <li>
                <strong>직접 출석</strong> : 대표 세무사가 직접 국세청에 출석하여 조사 범위 확대를 차단했습니다.
              </li>
              <li>
                <strong>결과 증명</strong> : 까다로운 세무 이슈별 치밀한 법적 근거 마련과 대응 시나리오를 통해 부당한 과세를 방어했습니다.
              </li>
              <li>
                <strong>솔루션 제공</strong> : 단순 대응을 넘어 철저한 사후관리 솔루션을 제시함으로써 미래의 세무 리스크까지 최소화하는 전략적 결과를 만들었습니다.
              </li>
            </ul>
          </div>

          <div className={styles.caseCard}>
            <h3 className={styles.caseTitle}>조세불복</h3>
            <div className={styles.caseDivider}></div>
            <p className={styles.caseSubtitle}>이의신청, 심판청구 등 불복절차 대행</p>
            <ul className={styles.caseList}>
              <li>
                <strong>직접 의견 진술</strong> : 조세심판원 및 지자체 위원회에 대표 세무사가 직접 출석하여 논리적인 구두 변론을 통해 납세자의 억울함을 대변했습니다.
              </li>
              <li>
                <strong>입체적 법리 검토</strong> : 실체법과 절차법을 아우르는 치밀한 법리 분석으로 수억 원 규모의 과세처분 취소를 이끌어냈습니다.
              </li>
              <li>
                <strong>압도적 결과</strong> : 잘못된 과세처분 취소, 납세자에게 유리한 결정 유도하여 사소한 절차상 하자까지 놓치지 않고 납세자의 정당한 권익을 보호했습니다.
              </li>
            </ul>
          </div>

          <div className={styles.caseCard}>
            <h3 className={styles.caseTitle}>양도·상속·증여 컨설팅</h3>
            <div className={styles.caseDivider}></div>
            <p className={styles.caseSubtitle}>대규모 재개발·재건축 시행사 및 조합원 세무 업무 대행</p>
            <ul className={styles.caseList}>
              <li>
                <strong>랜드마크 현장 경험</strong> : 용산4구역 시행사 운영과 분양, 상도제11주택재개발 정비사업, 다수의 양도/상속/증여 자문 및 신고 대행을 진행했습니다.
              </li>
              <li>
                <strong>조합원 맞춤 솔루션</strong> : 분양회계 등 조합 운영 세무 이슈 관리, 조합원 입주권·청산금 관련 세무 자문 및 안정적인 양도소득세 사후관리, 공익사업용 토지 보상 납세자 이익을 극대화했습니다.
              </li>
            </ul>
          </div>

          <div className={styles.caseCard}>
            <h3 className={styles.caseTitle}>가업승계·자산관리 컨설팅</h3>
            <div className={styles.caseDivider}></div>
            <p className={styles.caseSubtitle}>복잡한 세무 의사결정을 성공으로 이끈 풍부한 컨설팅 이력</p>
            <ul className={styles.caseList}>
              <li>
                <strong>지배구조 최적화</strong> : 가업승계, 법인전환 등 기업지배구조 개편 검토와 사전준비를 지원합니다.
              </li>
              <li>
                <strong>정밀 경정청구</strong> : 수천만 원대 세금환급 청구 인용, 양도, 상속, 증여 등 자산 이전 관련 개인별 맞춤 세제혜택을 발굴했습니다.
              </li>
              <li>
                <strong>자산 이전 맞춤 설계</strong> : 단순한 신고를 넘어 양도, 상속, 증여 중 가장 유리한 이전 시점과 방법을 시뮬레이션하여, 세부담을 최소화하는 개인별 맞춤 절세 로드맵을 제시합니다.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
