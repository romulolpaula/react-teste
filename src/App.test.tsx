import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const users = [
  { id: 1, name: 'Leanne Graham', email: 'leanne@test.com', phone: '1-770', address: { city: 'Gwenborough' }, company: { name: 'Romaguera' } },
  { id: 2, name: 'Ervin Howell', email: 'ervin@test.com', phone: '010-692', address: { city: 'Wisokyburgh' }, company: { name: 'Deckow' } },
];

const originalFetch = global.fetch;

// Simula a resposta da API sem fazer requisição de rede.
const mockFetch = (ok: boolean) => {
  global.fetch = jest.fn().mockResolvedValue({ ok, status: ok ? 200 : 500, json: async () => users });
};

afterEach(() => {
  global.fetch = originalFetch;
});

describe('App', () => {
  it('lista nome e email dos usuários', async () => {
    mockFetch(true);
    render(<App />);
    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('ervin@test.com')).toBeInTheDocument();
  });

  it('filtra usuários pelo nome', async () => {
    mockFetch(true);
    render(<App />);
    await screen.findByText('Leanne Graham');
    await userEvent.type(screen.getByLabelText(/buscar usuário/i), 'ervin');
    expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument();
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
  });

  it('abre o modal com os detalhes do usuário', async () => {
    mockFetch(true);
    render(<App />);
    await userEvent.click(await screen.findByText('Leanne Graham'));
    // Escopo no modal: empresa e cidade também aparecem no card da lista.
    const dialog = within(screen.getByRole('dialog'));
    expect(dialog.getByText('Gwenborough')).toBeInTheDocument();
    expect(dialog.getByText('Romaguera')).toBeInTheDocument();
  });

  it('exibe estado de erro com opção de tentar novamente', async () => {
    mockFetch(false);
    render(<App />);
    expect(await screen.findByRole('alert')).toHaveTextContent(/falha ao buscar/i);
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument();
  });

  it('copia as informações do usuário para a área de transferência', async () => {
    mockFetch(true);
    const user = userEvent.setup(); // instala um clipboard simulado
    render(<App />);
    await user.click(await screen.findByText('Leanne Graham'));
    await user.click(screen.getByRole('button', { name: /copiar informações/i }));
    expect(await screen.findByText('Copiado!')).toBeInTheDocument();
    expect(await navigator.clipboard.readText()).toContain('Email: leanne@test.com');
  });

  it('ordena os usuários de A a Z ao clicar no botão', async () => {
    mockFetch(true);
    render(<App />);
    await screen.findByText('Leanne Graham');
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Leanne Graham');

    await userEvent.click(screen.getByRole('button', { name: /ordenar a–z/i }));
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Ervin Howell');
  });
});
