import { useMemo, useState } from 'react';
import styles from './App.module.css';
import { ErrorMessage } from './components/ErrorMessage';
import { Loading } from './components/Loading';
import { SearchBar } from './components/SearchBar';
import { SortToggle } from './components/SortToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { UserCard } from './components/UserCard';
import { UserModal } from './components/UserModal';
import { ViewToggle } from './components/ViewToggle';
import { useTheme } from './hooks/useTheme';
import { useUsers } from './hooks/useUsers';
import type { User, ViewMode } from './types/user';
import { sortUsersByName } from './utils/sortUsersByName';

// Remove acentos e caixa para que "jose" encontre "José".
const normalize = (text: string) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function App() {
  const { users, status, error, retry } = useUsers();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [view, setView] = useState<ViewMode>('grid');
  const [sortAZ, setSortAZ] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    const matches = users.filter((user) => normalize(user.name).includes(term));
    // Desligado, mantém a ordem original da API.
    return sortAZ ? sortUsersByName(matches) : matches;
  }, [users, query, sortAZ]);

  return (
    <>
      <div className={`${styles.container} ${styles.content}`}>
        <header className={styles.header}>
          <div>
            <h1>Usuários</h1>
            {/* Orientação curta: diz o que fazer na tela. */}
            <p className={styles.hint}>Busque por nome e selecione uma pessoa para ver os detalhes.</p>
          </div>
          {/* Canto superior direito, fora do fluxo, para o título ficar centralizado de verdade. */}
          <div className={styles.themeSlot}>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        <div className={styles.toolbar}>
          <SearchBar value={query} onChange={setQuery} />
          <SortToggle active={sortAZ} onToggle={() => setSortAZ((v) => !v)} />
          <ViewToggle view={view} onChange={setView} />
        </div>

        <main>
          {status === 'loading' && <Loading />}
          {status === 'error' && <ErrorMessage message={error} onRetry={retry} />}

          {status === 'success' && (
            <>
              {/* Região viva: leitores de tela anunciam o resultado da busca. */}
              <p className={styles.count} aria-live="polite">
                {filtered.length} {filtered.length === 1 ? 'usuário encontrado' : 'usuários encontrados'}
              </p>

              {filtered.length === 0 ? (
                <p className={styles.empty}>Nenhum usuário com esse nome. Tente outro termo.</p>
              ) : (
                <>
                  {view === 'list' && (
                    <div className={styles.columns} aria-hidden="true">
                      <span />
                      <span>Nome</span>
                      <span>Empresa</span>
                      <span>Cidade</span>
                      <span />
                    </div>
                  )}
                  <ul className={`${styles.list} ${view === 'grid' ? styles.grid : styles.rows}`}>
                  {filtered.map((user) => (
                    <li key={user.id}>
                      <UserCard user={user} view={view} onSelect={setSelected} />
                    </li>
                  ))}
                  </ul>
                </>
              )}
            </>
          )}
        </main>
      </div>

      {selected && <UserModal user={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
