import type { Plugin } from 'vite';

/**
 * Vite plugin to mock Next.js local fonts during Vitest Browser / Playwright tests.
 */
export function mockNextFontPlugin(): Plugin {
  return {
    name: 'mock-next-font-local',
    enforce: 'pre',
    resolveId(id: string) {
      if (id === 'next/font/local') {
        return '\0next-font-local-mock';
      }
    },
    load(id: string) {
      if (id === '\0next-font-local-mock') {
        return `
          export default function localFont(options) {
            return {
              className: 'mocked-purno-font',
              variable: (options && options.variable) || '--font-purno',
              style: { fontFamily: 'Purno, sans-serif' },
            };
          }
        `;
      }
    },
  };
}