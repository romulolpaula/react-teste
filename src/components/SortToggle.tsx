import styles from './SortToggle.module.css';

interface Props {
  active: boolean;
  onToggle: () => void;
}

export function SortToggle({ active, onToggle }: Props) {
  // aria-pressed informa o estado (ligado/desligado) a leitores de tela.
  return (
    <button type="button" className={styles.button} aria-pressed={active} onClick={onToggle}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 6h8M4 12h5M4 18h2M17 5v14m0 0-3-3m3 3 3-3" />
      </svg>
      Ordenar A–Z
    </button>
  );
}
