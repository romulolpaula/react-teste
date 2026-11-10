import { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../services/userService';
import type { User } from '../types/user';

type Status = 'loading' | 'success' | 'error';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    fetchUsers(controller.signal)
      .then((data) => {
        setUsers(data);
        setStatus('success');
      })
      .catch((err: unknown) => {
        // Abortar (desmontagem/StrictMode) não é um erro de verdade.
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Erro inesperado.');
        setStatus('error');
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { users, status, error, retry };
}
