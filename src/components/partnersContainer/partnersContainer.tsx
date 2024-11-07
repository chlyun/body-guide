import styles from './PartnersContainer.module.css';

export default function PartnersContainer({ imageUrl }) {
  return (
    <div className={styles.partnersContainer}>
      <div className={styles.textArea}>
        <p>쿠팡 파트너스 활동의 일환으로 일정액의 수수료를 제공받습니다.</p>
      </div>
      <div className={styles.imageArea}>
        <img src={imageUrl} alt="파트너 이미지" />
      </div>
    </div>
  );
}
