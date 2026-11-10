import { useEffect, useRef } from 'react';
import type { User } from '../types/user';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { Avatar } from './Avatar';
import { CheckIcon, CopyIcon } from './Icons';
import styles from './UserModal.module.css';

interface Props {
  user: User;
  onClose: () => void;
}

export function UserModal({ user, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { status, copy } = useCopyToClipboard();

  // showModal() do <dialog> já entrega focus trap, Esc para fechar e retorno do foco.
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const details = [
    ['Nome completo', user.name],
    ['Email', user.email],
    ['Telefone', user.phone],
    ['Empresa', user.company.name],
    ['Cidade', user.address.city],
  ];

  const copyAll = () => copy(details.map(([label, value]) => `${label}: ${value}`).join('\n'));

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="modal-title"
      onClose={onClose}
      // Clique no backdrop: o alvo é o próprio <dialog>, não o conteúdo.
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <div className={styles.head}>
        <Avatar name={user.name} size="lg" />
        <h2 id="modal-title">{user.name}</h2>
      </div>

      <dl className={styles.details}>
        {details.map(([label, value]) => (
          <div key={label} className={styles.row}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={copyAll}>
          {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
          {status === 'copied' ? 'Copiado!' : 'Copiar informações'}
        </button>
        <a className={styles.secondary} href={`mailto:${user.email}`}>
          Enviar email
        </a>
      </div>

      {/* Anuncia o resultado da cópia para leitores de tela. */}
      <p role="status" className="sr-only">
        {status === 'copied' && 'Informações copiadas.'}
        {status === 'error' && 'Não foi possível copiar.'}
      </p>
    </dialog>
  );
}
