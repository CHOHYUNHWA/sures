export function CustomerHomePage() {
  return (
    <div className="container">
      <section className="hero">
        <h1>세무 상담 예약</h1>
        <p>간편하게 세무 상담을 예약하세요</p>
      </section>

      <section className="actions">
        <a href="/customer/reservations/apply" className="btn btn-primary">
          예약 신청
        </a>
        <a href="/customer/reservations/verify" className="btn btn-accent">
          예약 조회
        </a>
      </section>
    </div>
  )
}
