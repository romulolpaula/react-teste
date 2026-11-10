import { getInitials } from './getInitials';

describe('getInitials', () => {
  it('usa primeira e última palavra do nome', () => {
    expect(getInitials('Leanne Graham')).toBe('LG');
  });

  it('ignora tratamentos terminados em ponto', () => {
    expect(getInitials('Mrs. Dennis Schulist')).toBe('DS');
  });

  it('funciona com nome de uma palavra só', () => {
    expect(getInitials('Chelsey')).toBe('C');
  });
});
