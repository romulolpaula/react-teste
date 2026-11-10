import type { User } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(API_URL, { signal });
  // fetch não rejeita em respostas 4xx/5xx, então tratamos manualmente.
  if (!response.ok) {
    throw new Error(`Falha ao buscar usuários (HTTP ${response.status}).`);
  }
  return response.json() as Promise<User[]>;
}
