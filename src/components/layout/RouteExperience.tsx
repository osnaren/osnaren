'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

/**
 * Next's default scroll heuristic can mistake the persistent sticky footer for
 * the destination surface. Make forward route changes deterministic while
 * leaving browser Back/Forward restoration intact.
 */
export function RouteExperience() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const historyNavigation = useRef(false);

  useEffect(() => {
    const markHistoryNavigation = () => {
      historyNavigation.current = true;
    };

    window.addEventListener('popstate', markHistoryNavigation);
    return () => window.removeEventListener('popstate', markHistoryNavigation);
  }, []);

  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    if (historyNavigation.current) {
      historyNavigation.current = false;
      return;
    }

    const main = document.getElementById('content');
    main?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
