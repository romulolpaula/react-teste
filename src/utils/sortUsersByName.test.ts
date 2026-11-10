import type { User } from '../types/user';
import { sortUsersByName } from './sortUsersByName';

const make = (name: string): User => ({
  id: 1,
  name,
  email: '',
  phone: '',
  address: { city: '' },
  company: { name: '' },
});

describe('sortUsersByName', () => {
  it('ordena de A a Z ignorando tratamentos como "Mrs."', () => {
    const sorted = sortUsersByName([make('Mrs. Dennis Schulist'), make('Leanne Graham'), make('Ervin Howell')]);
    expect(sorted.map((u) => u.name)).toEqual(['Mrs. Dennis Schulist', 'Ervin Howell', 'Leanne Graham']);
  });

  it('não altera o array original', () => {
    const original = [make('Zé'), make('Ana')];
    sortUsersByName(original);
    expect(original[0].name).toBe('Zé');
  });
});
