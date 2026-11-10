import type { User, ViewMode } from '../types/user';
import { Avatar } from './Avatar';
import { BuildingIcon, ChevronIcon, PinIcon } from './Icons';
import styles from './UserCard.module.css';

interface Props {
  user: User;
  view: ViewMode;
  onSelect: (user: User) => void;
}

export function UserCard({ user, view, onSelect }: Props) {
  // Um <button> nativo garante foco, Enter e Espaço sem código extra.
  // Os ícones explicam visualmente cada dado; o texto sr-only faz o mesmo para leitores de tela.
  return (
    <button type="button" className={`${styles.card} ${styles[view]}`} onClick={() => onSelect(user)}>
      <Avatar name={user.name} />
      <span className={styles.info}>
        <span className={styles.name}>{user.name}</span>
        <span className={styles.muted}>{user.email}</span>
      </span>
      <span className={`${styles.meta} ${styles.company}`}>
        <BuildingIcon />
        <span className={styles.text}>
          <span className="sr-only">Empresa: </span>
          {user.company.name}
        </span>
      </span>
      <span className={`${styles.meta} ${styles.muted}`}>
        <PinIcon />
        <span className={styles.text}>
          <span className="sr-only">Cidade: </span>
          {user.address.city}
        </span>
      </span>
      {view === 'list' && (
        <span className={styles.chevron}>
          <ChevronIcon />
        </span>
      )}
    </button>
  );
}
