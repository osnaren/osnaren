import {
  HomeRouteVisual,
  HomeFlamesVisual,
  HomeCommerceVisual,
  HomeLabVisual,
  HomeStoryVisual,
  HomeResumeVisual,
} from '@/illustrations/home';

import type { ModuleVisual } from '@/data/modules';
import type { ComponentType } from 'react';

const visuals: Record<ModuleVisual, ComponentType> = {
  route: HomeRouteVisual,
  flames: HomeFlamesVisual,
  commerce: HomeCommerceVisual,
  lab: HomeLabVisual,
  story: HomeStoryVisual,
  resume: HomeResumeVisual,
};

export function ModuleVisualFor({ visual }: { visual: ModuleVisual }) {
  const Visual = visuals[visual];
  return <Visual />;
}
