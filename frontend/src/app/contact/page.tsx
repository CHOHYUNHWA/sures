import type { Metadata } from 'next'
import Image from 'next/image'
import { Hero, Button, FadeIn, BottomCTA } from '@/components/ui'
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

          {/* 교통편 안내 */}
          <FadeIn delay={0.3}>
            <div className={styles.transportCard}>
              <h3 className={styles.subsectionTitle}>교통편 안내</h3>

              <h4 className={styles.transportTitle}>🚗 자동차 이용</h4>
              <ul className={styles.transportList}>
                <li>내비게이션 &quot;슈어스세무회계&quot; 또는 &quot;서울 강동구 천호대로 1024&quot; 검색</li>
                <li>빌딩 지하주차장 주차 가능 (무료주차 1시간 30분 지원)</li>
                <li>지하 주차장에서 B동 출입문 옆 비상용 엘리베이터나 상가 전용 엘리베이터 탑승하여 3층으로 이동</li>
              </ul>

              <h4 className={styles.transportTitle}>🚇 지하철 이용</h4>
              <ul className={styles.transportList}>
                <li>서울 지하철 5호선, 8호선 천호역 6번 출구 (도보 1분)</li>
                <li>힐스테이트천호역젠트리스 건물 GATE6으로 진입</li>
                <li>상가 전용 엘리베이터 탑승하여 3층으로 이동</li>
              </ul>

              <h4 className={styles.transportTitle}>🚌 버스 이용</h4>
              <ul className={styles.transportList}>
                <li>천호역 중앙버스정류장 하차</li>
                <li>힐스테이트천호역젠트리스 빌딩방향으로 횡단보도 건너 진입</li>
                <li>메가커피 옆 GATE2로 진입</li>
                <li>에스컬레이터 이용하여 3층으로 이동</li>
              </ul>
            </div>
          </FadeIn>

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

        </div>
      </section>

      <BottomCTA />
    </>
  )
}
