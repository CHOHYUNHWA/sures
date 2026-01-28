import type { Metadata } from 'next'
import { Hero, Button } from '@/components/ui'
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
        title={<>신고 대행을 넘어<br />사업의 성장을<br />이끄는 파트너가 되겠습니다</>}
        badge="업무안내"
        backgroundImage="/image/sures_background.png"
      />

      {/* 서비스 소개 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className="grid-2">
            <div className={styles.serviceDetail}>
              <h3 className={styles.serviceTitle}>법인 조정</h3>
              <div className={styles.divider}></div>
              <p className={styles.serviceSubtitle}>법인의 가치를 높이고 세금부담은 낮추고</p>
              <p className={styles.serviceDescription}>
                슈어스는 복잡한 법인 결산부터 기업별 특성에 맞는 정교한 세무조정까지, 기업의 재무 상태를 면밀히 분석하여 과도한 세금 지출을 막고 기업 성장을 위한 최적의 세무 환경을 구축합니다.
              </p>
              <div className={styles.subCardGrid}>
                <div className={styles.subCard}>
                  <h4 className={styles.subCardTitle}>법인세 세무조정</h4>
                  <p className={styles.subCardDescription}>
                    세무상 이익 산출 및 기업회계와 세무회계의 차이 조정 등
                  </p>
                </div>
                <div className={styles.subCard}>
                  <h4 className={styles.subCardTitle}>절세 혜택 극대화</h4>
                  <p className={styles.subCardDescription}>
                    연구소 설립, 고용 증대 등 각종 세액공제 및 감면 적용 등
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.serviceDetail}>
              <h3 className={styles.serviceTitle}>종합소득세</h3>
              <div className={styles.divider}></div>
              <p className={styles.serviceSubtitle}>성공 사업자의 파트너, 업종별 맞춤 소득세 관리</p>
              <p className={styles.serviceDescription}>
                슈어스는 개인 사업자의 업종별 맞춤 기장부터 프리랜서 및 고소득자의 소득세 신고까지, 누락 없는 공제와 정교한 분석으로 고객님의 세금 부담을 덜어드리는 통합 세무 솔루션을 제공합니다.
              </p>
              <div className={styles.subCardGrid}>
                <div className={styles.subCard}>
                  <h4 className={styles.subCardTitle}>사업자</h4>
                  <p className={styles.subCardDescription}>
                    업종별 맞춤 경비 분석 및 최적의 절세 전략 수립 등
                  </p>
                </div>
                <div className={styles.subCard}>
                  <h4 className={styles.subCardTitle}>프리랜서/고소득자</h4>
                  <p className={styles.subCardDescription}>
                    3.3% 사업소득자 환급 진단 및 고액 자산가 소득 관리 등
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.serviceDetail}>
              <h3 className={styles.serviceTitle}>신규 창업·사업자 등록</h3>
              <div className={styles.divider}></div>
              <p className={styles.serviceSubtitle}>공적인 사업의 첫 단추, 시작부터 전문가와 함께</p>
              <p className={styles.serviceDescription}>
                슈어스는 예비 창업자의 업종별 특성을 고려한 사업자 등록 방식부터 초기 세무 세팅까지, 대표님이 사업 본연의 가치에만 집중하실 수 있도록 든든한 기초 토대를 마련해 드립니다.
              </p>
              <div className={styles.subCardGrid}>
                <div className={styles.subCard}>
                  <h4 className={styles.subCardTitle}>업종별 맞춤 등록</h4>
                  <p className={styles.subCardDescription}>
                    간이/일반 과세자 선택 및 인허가 업종 체크 등
                  </p>
                </div>
                <div className={styles.subCard}>
                  <h4 className={styles.subCardTitle}>초기 세무 세팅</h4>
                  <p className={styles.subCardDescription}>
                    창업 세액감면 요건 확인 및 홈택스/카드 등록 가이드 등
                  </p>
                </div>
              </div>
            </div>

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
                    조사 사전 대비 및 현장 대응, 의견 진술 대행 등
                  </p>
                </div>
                <div className={styles.subCard}>
                  <h4 className={styles.subCardTitle}>조세불복·환급</h4>
                  <p className={styles.subCardDescription}>
                    경정청구, 이의신청, 조세심판청구 등 권리 구제
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.ctaTitle}>상담이 필요하신가요?</h2>
          <p className={styles.ctaDescription}>
            편리한 방법으로 문의해 주세요
          </p>
          <div className={styles.ctaButtons}>
            <a
              href="https://naver.me/G4GVUglM"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <span className={styles.ctaIcon}>📅</span>
              <span className={styles.ctaButtonText}>
                <strong>네이버 예약</strong>
                <small>온라인으로 간편하게</small>
              </span>
            </a>
            <a
              href="http://pf.kakao.com/_zqepn"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaButton} ${styles.ctaButtonKakao}`}
            >
              <span className={styles.ctaIcon}>💬</span>
              <span className={styles.ctaButtonText}>
                <strong>카카오톡 상담</strong>
                <small>실시간 문의 가능</small>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 법인조정 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.specialtyTitle}>법인조정</h2>
          <p className={styles.specialtySubtitle}>법인의 가치를 높이고 세금 부담은 낮추고</p>
          <p className={styles.descriptionText}>
            슈어스는 복잡한 법인 결산부터 기업별 특성에 맞는 정교한 세무조정까지, 기업의 재무 상태를 면밀히 분석하여 과도한 세금 지출을 막고 기업 성장을 위한 최적의 세무 환경을 구축합니다.
          </p>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h4 className={styles.featureTitle}>법인세 세무조정</h4>
              <p className={styles.featureDescription}>
                세무상 이익 산출 및 기업회계와 세무회계의 차이 조정 등
              </p>
            </div>
            <div className={styles.featureCard}>
              <h4 className={styles.featureTitle}>절세 혜택 극대화</h4>
              <p className={styles.featureDescription}>
                연구소 설립, 고용 증대 등 각종 세액공제 및 감면 적용 등
              </p>
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
