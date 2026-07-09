'use client';

import { ModuleCard } from '@/components/home/ModuleCard';
import { benchModules } from '@/data/modules';

/**
 * The bench: six live module cards. Desktop is a 3-column grid; on small
 * screens it becomes a horizontally scrollable, clearly tappable rail.
 */
export function Workbench() {
  return (
    <section aria-label="Workbench modules" className="min-w-0">
      {/* mobile: swipeable rail */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:hidden" role="list">
        {benchModules.map((module, i) => (
          <div key={module.id} role="listitem" className="w-[240px] flex-none snap-start">
            <ModuleCard module={module} index={i} />
          </div>
        ))}
      </div>
      {/* desktop: workbench grid */}
      <div className="hidden auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 sm:grid lg:grid-cols-3 lg:gap-[18px]">
        {benchModules.map((module, i) => (
          <ModuleCard key={module.id} module={module} index={i} />
        ))}
      </div>
    </section>
  );
}
