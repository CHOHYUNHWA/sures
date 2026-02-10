import type { Metadata } from 'next';
import { Hero, FadeIn, BottomCTA } from '@/components/ui';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '수임료 안내 | 슈어스세무회계',
  description: '슈어스세무회계의 세무 서비스별 수임료 안내. 기장대행, 세무조사, 조세불복, 양도소득세, 상속세, 증여세 등 전문 세무 서비스를 합리적인 비용으로 제공합니다.',
};

export default function FeesPage() {
  return (
    <main>
      <Hero
        badge="수임료 안내"
        title={
          <>
            비용, 그 이상의 가치를
            <br />
            약속드립니다.
          </>
        }
        backgroundImage="/image/sures_background.png"
      />

      {/* 컨설팅 및 신고 대행 */}
      <section className={styles.section}>
        <FadeIn>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>컨설팅 및 신고 대행</h2>
            <div className={styles.divider}></div>
            <p className={styles.description}>
              특수한 상황이나 고도의 전문성이 필요한 이슈를 해결하는 서비스입니다.
            </p>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>서비스 항목</th>
                    <th>세부 업무 내용</th>
                    <th>수임료(기준)</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>세무조사 대응</td>
                    <td>상속/증여 자금출처, 통합조사 수임 및 현장 대응</td>
                    <td>*대표 세무사 직접 상담 후 결정</td>
                    <td>별도 협의(난이도별)</td>
                  </tr>
                  <tr>
                    <td>조세불복</td>
                    <td>이의신청, 심판청구 등 부당과세 구제</td>
                    <td>*대표 세무사 직접 상담 후 결정</td>
                    <td>별도 협의(착수금 및 성공보수)</td>
                  </tr>
                  <tr>
                    <td>양도/상속/증여</td>
                    <td>자산 이전 전략 수립 및 세무 신고</td>
                    <td></td>
                    <td>자산 가액별 요율 적용</td>
                  </tr>
                  <tr>
                    <td>종합소득세 신고</td>
                    <td>간편장부/복식부기/외부조정 대상자 일회성 신고 대행</td>
                    <td>최소 30만원 ~</td>
                    <td>수입 금액별 차등</td>
                  </tr>
                  <tr>
                    <td>신규창업 상담</td>
                    <td>사업자 등록 및 초기 세무 세팅 컨설팅</td>
                    <td></td>
                    <td>첫 상담 무료(수임 시)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 정기서비스 */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <FadeIn>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>정기서비스</h2>
            <div className={styles.divider}></div>
            <p className={styles.description}>
              사업자의 안정적인 경영과 리스크 관리를 위한 지속적인 관리 서비스입니다.
            </p>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>서비스 항목</th>
                    <th>대상</th>
                    <th>세부 업무 내용</th>
                    <th>수임료(기준)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={2}>기장 및 신고 대행</td>
                    <td>개인사업자</td>
                    <td>장부 작성 및 결산, 부가가치세 신고, 원천세/4대보험 관리 등</td>
                    <td>월 9만 원 ~</td>
                  </tr>
                  <tr>
                    <td>법인사업자</td>
                    <td>장부 작성 및 결산, 부가가치세 신고, 원천세/4대보험 관리 등</td>
                    <td>월 15만 원 ~</td>
                  </tr>
                  <tr>
                    <td>법인 세무 조정</td>
                    <td>법인사업자</td>
                    <td>법인세 신고 및 세무조정 계산서 작성</td>
                    <td>별도 청구(연 1회)</td>
                  </tr>
                  <tr>
                    <td>종합소득세 조정</td>
                    <td>개인사업자</td>
                    <td>복식부기 대상자 소득세 확정 신고 및 조정</td>
                    <td>별도 청구(연 1회)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 안내 */}
      <section className={styles.section}>
        <FadeIn>
          <div className={styles.sectionInner}>
            <div className={styles.notice}>
              <h3 className={styles.noticeTitle}>
                <span>ℹ️</span>
                <span>안내</span>
              </h3>
              <ul className={styles.noticeList}>
                <li>모든 수임료는 부가가치세(10%) 별도 금액입니다.</li>
                <li>위 금액은 기준가이며, 실제 수임료는 업종의 특수성, 매출 규모, 전표량 및 업무 난이도에 따라 조정될 수 있습니다.</li>
                <li>조세불복 및 세무조사의 경우, 사안의 복잡성에 따라 대표 세무사 상담 후 맞춤 견적을 제시해 드립니다.</li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </section>

      <BottomCTA />
    </main>
  );
}
