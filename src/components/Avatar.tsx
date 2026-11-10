import { getInitials } from '../utils/getInitials';
import styles from './Avatar.module.css';

interface Props {
  name: string;
  size?: 'md' | 'lg';
}

export function Avatar({ name, size = 'md' }: Props) {
  // Decorativo: o nome já está no texto ao lado.
  return (
    <span className={`${styles.avatar} ${styles[size]}`} aria-hidden="true">
      {getInitials(name)}
    </span>
  );
}
