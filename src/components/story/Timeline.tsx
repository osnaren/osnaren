'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

import { Reveal } from '@/components/motion/Reveal';
import { StoryPreview } from '@/components/story/StoryPreview';
import { fieldNotes, practices, storyTracks, trackLabel, type FieldNote, type StoryTrackKey } from '@/data/story';

const trackTone: Record<FieldNote['track'], string> = {
  work: 'text-ok border-ok/30',
  product: 'text-accent border-accent/30',
  research: 'text-amber border-amber/40',
  life: 'text-faint border-line',
};

function NoteCard({
  note,
  onActivate,
  isActive,
}: {
  note: FieldNote;
  onActivate: (note: FieldNote) => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  // whichever card sits nearest the top third of the viewport drives the preview panel
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActivate(note);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [note, onActivate]);

  return (
    <article
      ref={ref}
      aria-current={isActive ? 'true' : undefined}
      className={`module-card p-4 transition-shadow sm:p-5 ${isActive ? 'shadow-[0_6px_0_var(--line)]' : ''}`}
    >
      <div className="text-faint flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-[9.5px] font-medium tracking-widest uppercase">
        <span>
          {note.id} · {note.date}
        </span>
        <span className={`rounded-full border px-2 py-0.5 ${trackTone[note.track]}`}>{trackLabel[note.track]}</span>
      </div>

      <h3 className="mt-2.5 text-[17px] font-semibold tracking-[-0.01em]">{note.title}</h3>
      <p className="text-faint mt-1 font-mono text-[9.5px] tracking-widest uppercase">Artifact: {note.artifact}</p>
      <p className="text-muted mt-2 text-[13.5px] leading-relaxed">{note.caption}</p>

      {/* mobile: the preview lives inline, since there is no side panel */}
      <div className="bg-surface-2 border-line mt-3 h-32 overflow-hidden rounded-lg border lg:hidden">
        <StoryPreview preview={note.preview} />
      </div>

      <p className="mt-3 text-[12.5px]">
        <span className="text-accent font-mono text-[9.5px] font-medium tracking-widest uppercase">Lesson — </span>
        <span className="text-ink">{note.lesson}</span>
      </p>

      {note.link && (
        <div className="mt-3">
          {note.link.external ? (
            <a
              href={note.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase underline-offset-4 hover:underline"
            >
              {note.link.label} ↗
            </a>
          ) : (
            <Link
              href={note.link.href}
              className="text-accent font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase underline-offset-4 hover:underline"
            >
              {note.link.label} →
            </Link>
          )}
        </div>
      )}
    </article>
  );
}

export function Timeline() {
  const reduceMotion = useReducedMotion();
  const [track, setTrack] = useState<StoryTrackKey>('all');
  const [activeNote, setActiveNote] = useState<FieldNote>(fieldNotes[0]);

  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 60%', 'end 80%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  const visible = useMemo(
    () => (track === 'all' ? fieldNotes : fieldNotes.filter((note) => note.track === track)),
    [track]
  );

  const years = useMemo(() => [...new Set(visible.map((note) => note.year))], [visible]);

  // when a filter empties the current selection, snap the preview to the first visible note
  useEffect(() => {
    if (visible.length && !visible.some((note) => note.id === activeNote.id)) {
      setActiveNote(visible[0]);
    }
  }, [visible, activeNote.id]);

  return (
    <div>
      {/* filters */}
      <div className="border-line -mx-5 overflow-x-auto border-b px-5 pb-4 sm:mx-0 sm:overflow-visible sm:px-0">
        <div role="group" aria-label="Filter field notes" className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {storyTracks.map((t) => {
            const active = track === t.key;
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={active}
                onClick={() => setTrack(t.key)}
                className={`relative rounded-full border px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${
                  active ? 'border-ink text-paper' : 'border-line text-muted hover:border-line-strong hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={reduceMotion ? undefined : 'story-pill'}
                    className="bg-ink absolute inset-0 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 pt-8 lg:grid-cols-[64px_minmax(0,1fr)_320px] lg:gap-10">
        {/* sticky year rail */}
        <aside className="hidden lg:block" aria-hidden="true">
          <div className="sticky top-28 flex flex-col gap-3">
            {years.map((year) => (
              <span
                key={year}
                className={`font-mono text-[11px] tracking-[0.08em] transition-colors ${
                  activeNote.year === year ? 'text-accent font-medium' : 'text-faint'
                }`}
              >
                {year}
              </span>
            ))}
          </div>
        </aside>

        {/* the notes */}
        <div ref={railRef} className="relative pl-7 sm:pl-8">
          <span aria-hidden="true" className="bg-line absolute top-2 bottom-2 left-1.75 w-0.5" />
          <motion.span
            aria-hidden="true"
            className="bg-accent absolute top-2 bottom-2 left-1.75 w-0.5 origin-top"
            style={{ scaleY: reduceMotion ? 1 : fill }}
          />

          <LayoutGroup>
            <ol className="list-none" aria-label="Field notes, newest first">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((note, i) => (
                  <motion.li
                    key={note.id}
                    layout={!reduceMotion}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.12), ease: 'easeOut' }}
                    className="relative mb-5"
                  >
                    <span
                      aria-hidden="true"
                      className={`border-paper absolute top-6 -left-6.75 size-3.5 rounded-full border-[3px] sm:-left-7.75 ${
                        activeNote.id === note.id ? 'bg-accent' : note.accent ? 'bg-accent/40' : 'bg-line-strong'
                      }`}
                    />
                    <NoteCard note={note} onActivate={setActiveNote} isActive={activeNote.id === note.id} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          </LayoutGroup>

          {visible.length === 0 && (
            <p className="border-line-strong text-faint rounded-xl border-[1.5px] border-dashed px-6 py-14 text-center font-mono text-[11px] tracking-widest uppercase">
              No field notes on this track
            </p>
          )}
        </div>

        {/* sticky artifact preview */}
        <aside className="hidden lg:block" aria-label="Artifact preview">
          <div className="sticky top-28">
            <div className="module-card overflow-hidden">
              <div className="bg-surface-2 border-line h-48 border-b">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeNote.id}
                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="h-full w-full"
                  >
                    <StoryPreview preview={activeNote.preview} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="p-4">
                <p className="text-faint font-mono text-[9.5px] font-medium tracking-widest uppercase">
                  {activeNote.id} · {activeNote.date}
                </p>
                <p className="mt-1.5 text-[14px] font-semibold">{activeNote.title}</p>
                <p className="text-faint mt-1 font-mono text-[9.5px] tracking-widest uppercase">
                  Artifact: {activeNote.artifact}
                </p>
              </div>
            </div>

            {/* ongoing practices, deliberately outside the timeline */}
            <div className="mt-5">
              <p className="label-mono text-faint mb-3">Ongoing — no end date</p>
              <div className="flex flex-col gap-3">
                {practices.map((practice, i) => (
                  <Reveal key={practice.id} delay={i * 0.06}>
                    <div className="border-line-strong rounded-xl border-[1.5px] border-dashed p-4">
                      <p className="label-mono text-accent">{practice.id}</p>
                      <h2 className="mt-1.5 text-[14px] font-semibold">{practice.title}</h2>
                      <p className="text-muted mt-1.5 text-[12px] leading-relaxed">{practice.caption}</p>
                      {practice.link && (
                        <a
                          href={practice.link.href}
                          target={practice.link.external ? '_blank' : undefined}
                          rel={practice.link.external ? 'noopener noreferrer' : undefined}
                          className="text-accent mt-2 inline-block font-mono text-[10px] font-medium tracking-[0.08em] uppercase underline-offset-4 hover:underline"
                        >
                          {practice.link.label} {practice.link.external ? '↗' : '→'}
                        </a>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* practices on mobile/tablet, where the sticky column is hidden */}
      <div className="mt-8 lg:hidden">
        <p className="label-mono text-faint mb-3">Ongoing — no end date</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {practices.map((practice) => (
            <div key={practice.id} className="border-line-strong rounded-xl border-[1.5px] border-dashed p-4">
              <p className="label-mono text-accent">{practice.id}</p>
              <h2 className="mt-1.5 text-[15px] font-semibold">{practice.title}</h2>
              <p className="text-muted mt-1.5 text-[12.5px] leading-relaxed">{practice.caption}</p>
              <p className="mt-2 text-[12px]">
                <span className="text-accent font-mono text-[9.5px] tracking-widest uppercase">Lesson — </span>
                {practice.lesson}
              </p>
              {practice.link && (
                <a
                  href={practice.link.href}
                  target={practice.link.external ? '_blank' : undefined}
                  rel={practice.link.external ? 'noopener noreferrer' : undefined}
                  className="text-accent mt-2 inline-block font-mono text-[10px] font-medium tracking-[0.08em] uppercase underline-offset-4 hover:underline"
                >
                  {practice.link.label} {practice.link.external ? '↗' : '→'}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
