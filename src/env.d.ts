/// <reference path="../.astro/types.d.ts" />
export {};

declare global {
  interface Window {
    netlifyIdentity: {
      on(event: string, callback: (user?: unknown) => void): void;
      open(type?: string): void;
      init(): void;
    };
  }
}
