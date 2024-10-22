export default function Rating({ rating }: { rating: number }) {
  // 별 리스트 초기화
  const stars = [];

  // rating을 기준으로 꽉 찬 별, 반절 별, 빈 별을 채움
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // 꽉 찬 별
      stars.push(
        <img
          key={i}
          src="/svgs/star_full.svg"
          alt="Full Star"
          width="12"
          height="12"
        />,
      );
    } else if (rating >= i - 0.5) {
      // 반절 별
      stars.push(
        <img
          key={i}
          src="/svgs/star_half.svg"
          alt="Half Star"
          width="12"
          height="12"
        />,
      );
    } else {
      // 빈 별
      stars.push(
        <img
          key={i}
          src="/svgs/star_empty.svg"
          alt="Empty Star"
          width="12"
          height="12"
        />,
      );
    }
  }

  return <div style={{ display: 'flex' }}>{stars}</div>;
}
