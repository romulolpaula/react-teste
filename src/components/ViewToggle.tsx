import type { ViewMode } from '../types/user';
import styles from './ViewToggle.module.css';

interface Props {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

// O ícone mostra o modo para o qual o clique vai trocar (mesmo padrão do botão de tema).
const NEXT: Record<ViewMode, { view: ViewMode; label: string; path: string }> = {
  grid: { view: 'list', label: 'Mudar para lista', path: 'M4 6h16M4 12h16M4 18h16' },
  list: { view: 'grid', label: 'Mudar para grade', path: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z' },
};

export function ViewToggle({ view, onChange }: Props) {
  const next = NEXT[view];
  return (
    // Só ícone: aria-label para leitores de tela e title para o tooltip ao passar o mouse.
    <button type="button" className={styles.button} aria-label={next.label} title={next.label} onClick={() => onChange(next.view)}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={next.path} />
      </svg>
    </button>
  );
}
