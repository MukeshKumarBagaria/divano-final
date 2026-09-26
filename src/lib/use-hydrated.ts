import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False during SSR and hydration, true afterwards. Use it to gate markup that
 * depends on client-only facts (like prefers-reduced-motion) so the first
 * client render matches the server HTML.
 */
export const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
