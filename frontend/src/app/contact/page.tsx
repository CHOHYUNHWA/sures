import type { Metadata } from 'next'
import Image from 'next/image'
import { Hero, Button, FadeIn } from '@/components/ui'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '슈어스세무회계, 당신의 필요에 확신을 더하는 파트너',
  description: '서울특별시 강동구 천호대로 1024 (힐스테이트천호역젠트리스) 303호. 지하철 5호선, 8호선 천호역 6번 출구 도보 1분.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title={<>귀한 발걸음이 헛되지 않도록<br />전문성과 진심을 다해 준비하겠습니다.</>}
        backgroundImage="/image/sures_background.png"
        badge="오시는 길"
      />

      {/* 방문 안내 */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <h2 className={styles.sectionTitle}>방문 안내</h2>
          </FadeIn>

          {/* 주소 */}
          <FadeIn delay={0.1}>
            <div className={styles.addressBox}>
              <h3 className={styles.addressTitle}>슈어스세무회계</h3>
              <p className={styles.addressText}>
                서울특별시 강동구 천호대로 1024
                <br />
                (힐스테이트천호역젠트리스) 303호
              </p>
              <p className={styles.addressSubtext}>대표자: 김성국</p>
            </div>
          </FadeIn>

          {/* 약도 */}
          <FadeIn delay={0.2}>
            <div className={styles.locationMapBox}>
              <h3 className={styles.subsectionTitle}>약도</h3>
              <Image
                src="/images/location-map.png"
                alt="슈어스세무회계 약도"
                width={400}
                height={300}
                className={styles.locationMapImage}
              />
            </div>
          </FadeIn>

          {/* 교통 안내 */}
          <div className={styles.transportSection}>
            <h3 className={styles.subsectionTitle}>교통 안내</h3>

            {/* 차량 이용 */}
            <FadeIn delay={0.3}>
              <div className={styles.transportCard}>
                <h4 className={styles.transportTitle}>🚗 차량 이용</h4>
                <div className={styles.transportContent}>
                  <p className={styles.transportHighlight}>
                    <strong>주차 안내:</strong> 건물 내 주차 가능합니다. (무료주차 1시간 30분 지원)
                  </p>
                  <ul className={styles.transportList}>
                    <li>지하 주차장에서 B동 출입문 옆 비상용 엘리베이터로 올라와 주세요.</li>
                    <li>상가용 엘리베이터나 비상용 엘리베이터 탑승하셔서 3층으로 오시면 됩니다.</li>
                    <li>오피스용 엘리베이터 이용 시 1층까지만 운행하여 갈아타야 합니다.</li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* 대중교통 이용 */}
            <FadeIn delay={0.4}>
              <div className={styles.transportCard}>
                <h4 className={styles.transportTitle}>🚇 대중교통 이용</h4>
                <div className={styles.transportContent}>
                  <div className={styles.transitItem}>
                    <p className={styles.transitLabel}>
                      <strong>지하철:</strong> <span className={styles.badge}>5호선</span> <span className={styles.badge}>8호선</span> <strong>천호역</strong> 6번 출구에서 도보 1분 거리입니다.
                    </p>
                    <p className={styles.transitDetail}>
                      <span className={styles.badgeAccent}>GATE 6</span>으로 진입 시 편리합니다.
                    </p>
                  </div>
                  <div className={styles.transitItem}>
                    <p className={styles.transitLabel}>
                      <strong>버스:</strong> <span className={styles.badge}>천호역</span> 중앙버스정류장 하차 후 <span className={styles.badge}>힐스테이트천호역젠트리스</span> 빌딩 방향으로 오시면 됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 네이버 지도 */}
          <FadeIn delay={0.5}>
            <div className={styles.mapContainer}>
              <iframe
                src="https://map.naver.com/p/entry/place/2083776809?c=15.00,0,0,0,dh"
                className={styles.map}
                title="슈어스세무회계 위치"
                allowFullScreen
              ></iframe>
              <div className={styles.mapButtonContainer}>
                <a
                  href="https://map.naver.com/p/entry/place/2083776809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapButton}
                >
                  <span className={styles.mapButtonIcon}>🗺️</span>
                  <span>네이버 지도 앱에서 열기</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 방문 전 안내 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <h2 className={styles.sectionTitle}>방문 전 안내</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className={styles.noticeBox}>
              <div className={styles.noticeItem}>
                <h4 className={styles.noticeTitle}>⏰ 상담 시간</h4>
                <p className={styles.noticeText}>
                  평일 09:00 ~ 18:00<br />
                  (점심시간 12:00 ~ 13:00)
                </p>
              </div>

              <div className={styles.noticeItem}>
                <h4 className={styles.noticeTitle}>📋 준비물</h4>
                <p className={styles.noticeText}>
                  사업자등록증, 관련 서류 등<br />
                  (상담 내용에 따라 다를 수 있습니다)
                </p>
              </div>

              <div className={styles.noticeItem}>
                <h4 className={styles.noticeTitle}>💡 예약 권장</h4>
                <p className={styles.noticeText}>
                  대기 시간을 최소화하기 위해<br />
                  사전 예약을 권장드립니다
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className={styles.ctaButtons}>
              <a
                href="https://naver.me/G4GVUglM"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButtonNaver}
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
                className={styles.ctaButtonKakao}
              >
                <span className={styles.ctaIcon}>💬</span>
                <span className={styles.ctaButtonText}>
                  <strong>카카오톡 상담</strong>
                  <small>실시간 문의 가능</small>
                </span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
