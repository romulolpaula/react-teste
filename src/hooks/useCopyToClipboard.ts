import { useCallback, useEffect, useRef, useState } from 'react';

type CopyStatus = 'idle' | 'copied' | 'error';

export function useCopyToClipboard(resetMs = 2000) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timer = useRef<number>();

  // Evita atualizar estado depois que o modal for fechado.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setStatus('copied');
      } catch {
        // Clipboard exige contexto seguro (HTTPS/localhost) e pode ser negado.
        setStatus('error');
      }
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setStatus('idle'), resetMs);
    },
    [resetMs],
  );

  return { status, copy };
}
