'use client';

import { useState } from 'react';
import { Hero, FadeIn } from '@/components/ui';
import styles from './page.module.css';

export default function ConsultationPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: '첫 상담은 정말 비용이 발생하지 않나요?',
      answer: '네, 그렇습니다. 네이버나 카카오톡 예약 후 이뤄지는 기초 상담 및 업무 절차 안내는 무료로 진행됩니다. 고객님의 현재 상황을 파악하고, 어떤 서류가 필요한지 가이드를 드리는 단계이므로 부담 없이 문의해 주세요.'
    },
    {
      question: '유료 상담과 무료 상담의 차이는 무엇인가요?',
      answer: '유료 상담(2단계 전문 진단)은 필요 시에만 진행됩니다. 고객님이 제출하신 서류를 바탕으로 관련법 및 판례를 검토하여, 구체적인 승소 가능성이나 실질적인 절세액을 시뮬레이션해 드리는 깊이 있는 과정입니다. 단순 안내를 넘어선 실무적인 해결책을 드리는 단계입니다.'
    },
    {
      question: '상담비가 나중에 환불된다는 게 무슨 뜻인가요?',
      answer: '전문 진단 상담 후, 정식으로 기장 계약이나 사건 수임(불복/조사 등)을 진행하시게 되면 기납부하신 상담료 전액을 첫 수임료에서 차감해 드립니다. 슈어스의 파트너가 되시는 고객님께는 상담 비용을 받지 않는다는 원칙입니다.'
    },
    {
      question: '세무조사 대응이나 불복은 꼭 방문 상담을 해야 하나요?',
      answer: '사안의 시급성과 중요도에 따라 비대면 상담도 가능하지만, 세무조사와 같은 중대한 사안은 직접 서류를 대조하며 대면 상담을 하시는 것을 권장합니다. 정교한 대응 시나리오를 짜기 위해서는 직접 소통이 가장 효과적이기 때문입니다.'
    },
    {
      question: '성공보수는 어떤 경우에 발생하나요?',
      answer: '조세불복이나 경정청구처럼 납세자의 실질적 이익(세금 취소 또는 환급)이 발생했을 때에만 사전 계약 내용에 의거하여 발생합니다. 결과가 나오지 않았을 경우에는 성공보수를 청구하지 않으므로, 안심하고 맡기셔도 됩니다.'
    }
  ];

  return (
    <>
      <Hero
        title={<>준비된 프로세스가<br />이기는 결과를 만듭니다.</>}
        badge="상담안내"
        backgroundImage="/image/sures_background.png"
      >
        <a href="#" className={styles.ctaLink}>
          1:1 맞춤 신청하기 →
        </a>
      </Hero>

      {/* 수임프로세스 섹션 */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <h2 className={styles.sectionTitle}>수임프로세스</h2>
            <div className={styles.divider}></div>
          </FadeIn>

          <div className={styles.processFlow}>
            <FadeIn delay={0.1}>
              <div className={styles.processCard}>
                <div className={styles.stepNumber}>01</div>
                <h3 className={styles.stepTitle}>
                  무료 리스크 진단<br />및 기초 상담
                </h3>
                <p className={styles.stepDescription}>
                  네이버 예약 또는 카카오톡 예약 후 진행됩니다. 전문적인 분석에 앞서 필요한 서류와 절차를 안내드립니다.
                </p>
                <div className={styles.stepTags}>
                  <span className={styles.tag}>#무료</span>
                </div>
              </div>
            </FadeIn>

            <div className={styles.arrow}>&gt;</div>

            <FadeIn delay={0.2}>
              <div className={styles.processCard}>
                <div className={styles.stepNumber}>02</div>
                <h3 className={styles.stepTitle}>
                  전문 분석<br />및 심층 컨설팅
                </h3>
                <p className={styles.stepDescription}>
                  관련 서류를 검토하고 해결 방법 및 예상 절세액을 분석하는 심층 상담입니다.<br />
                  사안의 복잡성에 따라 상담료가 발생할 수 있으나, 정식 수임 시 상담료 전액을 수임료에서 차감해 드립니다.
                </p>
                <div className={styles.stepTags}>
                  <span className={styles.tag}>#조건부무료</span>
                  <span className={styles.tag}>#환급</span>
                </div>
              </div>
            </FadeIn>

            <div className={styles.arrow}>&gt;</div>

            <FadeIn delay={0.3}>
              <div className={styles.processCard}>
                <div className={styles.stepNumber}>03</div>
                <h3 className={styles.stepTitle}>
                  수임 계약<br />및 업무 수행
                </h3>
                <p className={styles.stepDescription}>
                  업무 범위와 수임료를 확정하고 정식 계약을 체결합니다.<br />
                  - 기장/신고: 서비스 이용료 결제 후 즉시 관리 시작<br />
                  - 불복/조사: 계약 시 약정된 착수금 결제 후 대응 시나리오 작성
                </p>
                <div className={styles.stepTags}>
                  <span className={styles.tag}>#밀착관리</span>
                  <span className={styles.tag}>#전문대응</span>
                </div>
              </div>
            </FadeIn>

            <div className={styles.arrow}>&gt;</div>

            <FadeIn delay={0.4}>
              <div className={styles.processCard}>
                <div className={styles.stepNumber}>04</div>
                <h3 className={styles.stepTitle}>
                  업무 종결<br />및 사후 관리
                </h3>
                <p className={styles.stepDescription}>
                  최종 결과 보고 및 향후 대응 솔루션을 제공합니다.<br />
                  - 불복/환급: 결과에 따른 성공보수 발생<br />
                  (성공 시에만 발생)<br />
                  - 기장/신고: 지속적인 사후 관리 서비스 제공
                </p>
                <div className={styles.stepTags}>
                  <span className={styles.tag}>#성공</span>
                  <span className={styles.tag}>#사후관리</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 자주 묻는 질문 섹션 */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>
            <div className={styles.divider}></div>
          </FadeIn>

          <div className={styles.faqList}>
            {faqItems.map((faq, index) => (
              <FadeIn key={index} delay={0.1 * (index + 1)}>
                <div className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaqIndex === index}
                  >
                    <span>Q{index + 1}. {faq.question}</span>
                    <span className={`${styles.faqIcon} ${openFaqIndex === index ? styles.faqIconOpen : ''}`}>
                      ▼
                    </span>
                  </button>
                  {openFaqIndex === index && (
                    <div className={styles.faqAnswer}>
                      A. {faq.answer}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionInner}>
          <FadeIn>
            <h2 className={styles.ctaTitle}>
              막막한 세무 고민,<br />
              4단계 정밀 프로세스로<br />
              명쾌한 해답을 드립니다.
            </h2>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
