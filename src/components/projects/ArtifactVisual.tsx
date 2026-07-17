import {
  RouteVisual,
  FlamesVisual,
  FireVisual,
  RetinaVisual,
  CancerVisual,
  CommerceVisual,
  ToolchainVisual,
  ChatVisual,
  WeatherVisual,
  NumerologyVisual,
  TimerVisual,
  LabProjectVisual,
} from '@/illustrations/projects';

import type { ArtifactVisual as VisualKey } from '@/data/artifacts';
import type { ComponentType } from 'react';

const visualComponents: Record<VisualKey, ComponentType> = {
  route: RouteVisual,
  flames: FlamesVisual,
  fire: FireVisual,
  retina: RetinaVisual,
  cancer: CancerVisual,
  commerce: CommerceVisual,
  toolchain: ToolchainVisual,
  chat: ChatVisual,
  weather: WeatherVisual,
  numerology: NumerologyVisual,
  timer: TimerVisual,
  lab: LabProjectVisual,
};

/** Each artifact gets a schematic, not a screenshot — honest and weightless. */
export function ArtifactVisual({ visual }: { visual: VisualKey }) {
  const Visual = visualComponents[visual] ?? LabProjectVisual;
  return <Visual />;
}
