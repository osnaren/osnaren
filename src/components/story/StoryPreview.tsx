import Image from 'next/image';

import {
  RoutePreview,
  FlamesPreview,
  CommercePreview,
  ToolchainPreview,
  PaperPreview,
  DatasetPreview,
  CameraPreview,
  GardenPreview,
  LanguagePreview,
  SaplingPreview,
  MentorshipPreview,
  CoordinationPreview,
  NetworkPreview,
  ServicePreview,
  SchoolPreview,
  LabPreview,
  BadgePreview,
  FirePreview,
  OCTPreview,
  CorpusPreview,
  CampusPreview,
} from '@/illustrations/story';

import type { FieldNote } from '@/data/story';
import type { NoteMedia } from '@/data/story-chapters';
import type { ComponentType } from 'react';

type PreviewKey = FieldNote['preview'];

const previewComponents: Record<PreviewKey, ComponentType> = {
  route: RoutePreview,
  flames: FlamesPreview,
  commerce: CommercePreview,
  toolchain: ToolchainPreview,
  paper: PaperPreview,
  dataset: DatasetPreview,
  camera: CameraPreview,
  garden: GardenPreview,
  language: LanguagePreview,
  sapling: SaplingPreview,
  mentorship: MentorshipPreview,
  coordination: CoordinationPreview,
  network: NetworkPreview,
  service: ServicePreview,
  school: SchoolPreview,
  lab: LabPreview,
  badge: BadgePreview,
  fire: FirePreview,
  oct: OCTPreview,
  corpus: CorpusPreview,
  campus: CampusPreview,
};

/**
 * Artifact previews. Real, public-safe media is used where it exists (only the
 * ShadySide premise illustration in this repo); everything else is a designed
 * schematic — never a fabricated photograph, certificate, or workplace screen.
 */
export function StoryPreview({ preview, media }: { preview: PreviewKey; media?: NoteMedia }) {
  if (media) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 320px"
          className="object-cover"
        />
      </div>
    );
  }

  const Preview = previewComponents[preview] ?? LabPreview;
  return <Preview />;
}
