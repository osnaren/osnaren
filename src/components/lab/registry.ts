import { Magnetic, Route, Scheduler, Squish, SunPath, ThemeStudy, type BenchMode } from '@/components/lab/benches';

export type { BenchMode };

/** Maps an experiment key to its implementation (preview + bench variants). */
export const benchRegistry: Record<
  string,
  (props: { mode: BenchMode; onEvent?: (message: string) => void }) => React.ReactElement
> = {
  sunpath: SunPath,
  squish: Squish,
  magnetic: Magnetic,
  route: Route,
  theme: ThemeStudy,
  scheduler: Scheduler,
};
