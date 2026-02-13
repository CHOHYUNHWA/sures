import type { Metadata } from 'next'
import { Hero, Button, FadeIn, BottomCTA } from '@/components/ui'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '슈어스세무회계, 당신의 필요에 확신을 더하는 파트너',
  description: '경리 아웃소싱, 세무조사 대응, 양도·상속·증여 자문, 조세불복 대행 등 전문 세무 서비스를 제공합니다.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title={<>신고 대행을 넘어<br />사업의 성장을<br />이끄는 파트너가 되겠습니다</>}
        badge="업무안내"
        backgroundImage="/image/sures_background.png"
      />

      {/* 서비스 소개 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className="grid-2">
            <FadeIn delay={0}>
              <div className={styles.serviceDetail}>
                <h3 className={styles.serviceTitle}>법인세</h3>
                <div className={styles.divider}></div>
                <p className={styles.serviceSubtitle}>법인의 가치를 높이고 세금부담은 낮추고</p>
                <p className={styles.serviceDescription}>
                  슈어스는 복잡한 법인 결산부터 기업별 특성에 맞는 정교한 세무조정까지, 기업의 재무 상태를 면밀히 분석하여 과도한 세금 지출을 막고 기업 성장을 위한 최적의 세무환경을 구축합니다.
                </p>
                <div className={styles.subCardGrid}>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>법인결산/세무조정</h4>
                    <p className={styles.subCardDescription}>
                      기업회계와 세무회계의 차이조정, 리스크 없는 세무 이익 산출
                    </p>
                  </div>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>절세 혜택 극대화</h4>
                    <p className={styles.subCardDescription}>
                      고용, 투자, 연구개발 등 각종 세액공제 및 감면 발굴
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className={styles.serviceDetail}>
                <h3 className={styles.serviceTitle}>종합소득세</h3>
                <div className={styles.divider}></div>
                <p className={styles.serviceSubtitle}>사업자의 성공 파트너, 업종별 맞춤 세무관리</p>
                <p className={styles.serviceDescription}>
                  슈어스는 개인 사업자의 업종별 맞춤 기장부터 프리랜서 및 고소득자의 소득세 신고까지, 누락 없는 공제와 정교한 분석으로 고객님의 세금 부담을 덜어드리는 통합 세무 솔루션을 제공합니다.
                </p>
                <div className={styles.subCardGrid}>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>개인사업/성실신고</h4>
                    <p className={styles.subCardDescription}>
                      업종별 맞춤 경비 분석 및 최적의 절세 전략 수립
                    </p>
                  </div>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>비사업자</h4>
                    <p className={styles.subCardDescription}>
                      프리랜서, 1인사업자의 안정적인 세무신고, 리스크 관리
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className={styles.serviceDetail}>
                <h3 className={styles.serviceTitle}>경리 아웃소싱</h3>
                <div className={styles.divider}></div>
                <p className={styles.serviceSubtitle}>대표님은 사업에만 집중하세요.</p>
                <p className={styles.serviceDescription}>
                  슈어스는 매월 발생하는 원천세 신고와 급여관리, 4대보험 업무, 분기/반기 부가가치세 신고까지 비즈니스 주기에 맞춘 결산 업무를 지원합니다.
                </p>
                <div className={styles.subCardGrid}>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>정기 기장 관리</h4>
                    <p className={styles.subCardDescription}>
                      실시간 장부 작성, 인건비 신고 및 4대 보험 관리
                    </p>
                  </div>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>주요 세무 신고</h4>
                    <p className={styles.subCardDescription}>
                      부가가치세, 법인세, 종합소득세 신고 대행
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className={styles.serviceDetail}>
                <h3 className={styles.serviceTitle}>양도·상속·증여</h3>
                <div className={styles.divider}></div>
                <p className={styles.serviceSubtitle}>소중한 자산일수록 전문가의 설계로 지키세요.</p>
                <p className={styles.serviceDescription}>
                  슈어스는 증여·상속을 통한 지혜로운 자산 승계부터 복잡한 부동산, 주식 양도까지 안정적이고 정교한 자산 이전 솔루션을 제공합니다.
                </p>
                <div className={styles.subCardGrid}>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>상속·증여</h4>
                    <p className={styles.subCardDescription}>
                      최적의 사전 증여 플랜 및 상속세 리스크 점검 등
                    </p>
                  </div>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>양도소득세</h4>
                    <p className={styles.subCardDescription}>
                      아파트, 분양권, 주식 매도 전 절세 진단 등
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className={styles.serviceDetail}>
                <h3 className={styles.serviceTitle}>신규 창업·사업자 등록</h3>
                <div className={styles.divider}></div>
                <p className={styles.serviceSubtitle}>성공적인 사업의 시작, 세무 전문가와 함께</p>
                <p className={styles.serviceDescription}>
                  슈어스는 예비 창업자의 업종별 특성을 고려한 사업자 등록 방식부터 초기 세무 세팅까지, 대표님이 사업 본연의 가치에만 집중하실 수 있도록 든든한 기초 토대를 마련해 드립니다.
                </p>
                <div className={styles.subCardGrid}>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>업종별 맞춤 등록</h4>
                    <p className={styles.subCardDescription}>
                      인허가 업종 체크, 원활한 사업자 등록 지원
                    </p>
                  </div>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>초기 세무 세팅</h4>
                    <p className={styles.subCardDescription}>
                      세제혜택 발굴, 초기 세법 의무사항 가이드 설계
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className={styles.serviceDetail}>
                <h3 className={styles.serviceTitle}>세무조사·조세불복</h3>
                <div className={styles.divider}></div>
                <p className={styles.serviceSubtitle}>세무조사의 위기, 전문가의 치밀한 방어로</p>
                <p className={styles.serviceDescription}>
                  슈어스는 갑작스러운 세무조사에 대한 전략적 대응부터, 잘못 부과된 세금을 바로잡는 조세불복까지 풍부한 경험과 치밀한 법리 해석을 바탕으로 고객님의 정당한 권리를 되찾아 드립니다.
                </p>
                <div className={styles.subCardGrid}>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>세무조사 대응</h4>
                    <p className={styles.subCardDescription}>
                      자료수집부터 검토까지 직접 대응, 과세쟁점 리포팅과 사후관리
                    </p>
                  </div>
                  <div className={styles.subCard}>
                    <h4 className={styles.subCardTitle}>조세불복</h4>
                    <p className={styles.subCardDescription}>
                      이의신청, 심판청구 등 납세자 권리구제
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 산업별 특화 */}
      <section className={`${styles.section} ${styles.sectionSpecialty}`}>
        <div className={styles.sectionInner}>
          <FadeIn delay={0}>
            <h2 className={styles.specialtyTitle}>
              다양한 산업에 최적화된 세무 서비스
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className={styles.specialtyDivider}></div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className={styles.specialtyDescription}>
              1인 미디어 창작자, SNS마켓 사업자, 프리랜서 등<br />
              변화하는 산업 구조에 맞춘 전문 상담을 제공합니다
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
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
          </FadeIn>
        </div>
      </section>

      <BottomCTA />
    </>
  )
}
