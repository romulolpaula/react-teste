import styles from './ErrorMessage.module.css';

interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: Props) {
  // role="alert" faz leitores de tela anunciarem o erro imediatamente.
  return (
    <div className={styles.box} role="alert">
      <p>{message} Verifique sua conexão e tente novamente.</p>
      <button type="button" className={styles.retry} onClick={onRetry}>
        Tentar novamente
      </button>
    </div>
  );
}
