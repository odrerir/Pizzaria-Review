import styles from "../styles/RatingBar.module.css";

export function RatingBar({ label, value }) {
  const percentage = (value / 5) * 100;

  return (
    <div className={styles['rating-bar']}>
      <span className={styles.label}>{label}</span>
      <div className={styles['bar-container']}>
        <div className={styles['bar-fill']} style={{ width: `${percentage}%` }} />
      </div>
      <span className={styles.value}>{value.toFixed(1)}</span>
    </div>
  );
}
