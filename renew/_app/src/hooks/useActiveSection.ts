import { useEffect, useState } from 'react';

/**
 * Watches the given section IDs and returns the ID of the section currently
 * most in view. Uses IntersectionObserver with a rootMargin that biases toward
 * the top third of the viewport so the "active" section matches what the user
 * is reading.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track the most visible section among intersecting ones.
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibility.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibility.delete(entry.target.id);
          }
        }

        if (visibility.size === 0) return;

        let topId = sectionIds[0];
        let topRatio = -1;
        for (const [id, ratio] of visibility) {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        }
        setActiveId(topId);
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
