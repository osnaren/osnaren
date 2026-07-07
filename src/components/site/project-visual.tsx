import type { ProjectSlug } from '@/lib/portfolio-data';
import Image from 'next/image';

type ProjectVisualProps = {
  slug: ProjectSlug;
  priority?: boolean;
};

export function ProjectVisual({ slug, priority = false }: ProjectVisualProps) {
  if (slug === 'shadyside') {
    return (
      <div className="project-visual project-visual-image">
        <Image
          src="/work/shadyside-methodology.webp"
          alt="ShadySide route and sun-position visual"
          fill
          sizes="(min-width: 1024px) 38vw, 100vw"
          priority={priority}
        />
      </div>
    );
  }

  if (slug === 'treegenius') {
    return (
      <div className="project-visual tree-visual">
        <Image
          src="/work/treegenius-tree.png"
          alt="TreeGenius tree mark"
          width={300}
          height={300}
          priority={priority}
        />
        <div className="tree-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual inbox-visual">
      <div className="mail-console-header">
        <span>InboxCtrl audit</span>
        <span>read-only</span>
      </div>
      <div className="mail-console-grid">
        <div>
          <span>from: newsletters</span>
          <strong>412</strong>
        </div>
        <div>
          <span>safe action</span>
          <strong>label + archive</strong>
        </div>
        <div>
          <span>rollback</span>
          <strong>enabled</strong>
        </div>
      </div>
      <div className="mail-rule">
        <span>draft rule</span>
        <p>When sender matches recurring promo pattern, apply label, skip inbox, never delete.</p>
      </div>
    </div>
  );
}
