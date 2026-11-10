// Apenas os campos que a aplicação realmente usa da resposta da API.
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
}

export type ViewMode = 'grid' | 'list';
export type Theme = 'light' | 'dark';
