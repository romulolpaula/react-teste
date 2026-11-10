import styles from './Loading.module.css';

export function Loading() {
  // Esqueletos reservam o espaço dos cards e evitam salto de layout ao carregar.
  return (
    <div role="status">
      <span className="sr-only">Carregando usuários…</span>
      <div className={styles.grid} aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    </div>
  );
}
