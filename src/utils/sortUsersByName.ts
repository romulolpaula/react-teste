import type { User } from '../types/user';

// Ignora tratamentos ("Mrs.", "Dr.") para ordenar pelo nome de fato.
const sortKey = (name: string) =>
  name
    .split(' ')
    .filter((word) => !word.endsWith('.'))
    .join(' ');

export function sortUsersByName(users: User[]): User[] {
  // Ordena uma cópia: sort() muda o array original, e o estado do React não deve ser mutado.
  return [...users].sort((a, b) => sortKey(a.name).localeCompare(sortKey(b.name), 'pt-BR'));
}
