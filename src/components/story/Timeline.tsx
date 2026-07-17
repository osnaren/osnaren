'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

import { ChapterMotif } from '@/components/story/ChapterMotif';
import { StoryPreview } from '@/components/story/StoryPreview';
import { fieldNotes, practices, storyTracks, trackLabel, type FieldNote, type StoryTrackKey } from '@/data/story';
import { chapterOf, noteMedia, storyChapters, type NoteMedia, type StoryChapterKey } from '@/data/story-chapters';

const trackTone: Record<FieldNote['track'], string> = {
  work: 'text-ok border-ok/30',
  product: 'text-accent border-accent/30',
  research: 'text-amber border-amber/40',
  life: 'text-faint border-line',
};

interface ActiveArtifact {
  id: string;
  date: string;
  title: string;
  artifact: string;
  preview: FieldNote['preview'];
  media?: NoteMedia;
  chapter: StoryChapterKey;
}

const toArtifact = (note: FieldNote): ActiveArtifact => ({
  id: note.id,
  date: note.date,
  title: note.title,
  artifact: note.artifact,
  preview: note.preview,
  media: noteMedia[note.id],
  chapter: chapterOf(note),
});

// oldest → newest so the chronicle reads as a progression
const orderedNotes = [...fieldNotes].reverse();

function NoteCard({
  note,
  onActivate,
  isActive,
}: {
  note: FieldNote;
  onActivate: (artifact: ActiveArtifact) => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && onActivate(toArtifact(note)), {
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0,
    });
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

function ChapterHeading({
  chapter,
  registerRef,
}: {
  chapter: (typeof storyChapters)[number];
  registerRef: (key: StoryChapterKey, el: HTMLElement | null) => void;
}) {
  return (
    <header
      ref={(el) => registerRef(chapter.key, el)}
      className="relative scroll-mt-28 pt-10 pb-2 first:pt-2"
      data-chapter={chapter.key}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-accent font-mono text-[10px] font-medium tracking-widest uppercase">
            Chapter {chapter.index} · {chapter.years}
          </p>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">{chapter.label}</h2>
          <p className="text-muted mt-2 max-w-md text-[13px] leading-relaxed">{chapter.blurb}</p>
        </div>
        <ChapterMotif motif={chapter.motif} index={chapter.index} />
      </div>
    </header>
  );
}

function OngoingInterludes({ onActivate }: { onActivate: (artifact: ActiveArtifact) => void }) {
  return (
    <div className="mt-4 flex flex-col gap-5">
      {practices.map((practice) => (
        <Interlude key={practice.id} practice={practice} onActivate={onActivate} />
      ))}

      {/* open endpoint — the log stays deliberately unfinished */}
      <div className="relative mt-2 pb-2">
        <span
          aria-hidden="true"
          className="border-accent absolute top-1 -left-6.75 size-3.5 rounded-full border-[3px] sm:-left-7.75"
        />
        <span
          aria-hidden="true"
          className="bg-accent/50 absolute top-1 -left-6.75 size-3.5 animate-ping rounded-full motion-reduce:animate-none sm:-left-7.75"
        />
        <p className="text-ink text-[14px] font-semibold">The log stays open.</p>
        <p className="text-muted mt-1.5 max-w-md text-[13px] leading-relaxed">
          New entries land when there is something real to add — usually a shipped thing, occasionally a lesson worth
          keeping.
        </p>
      </div>
    </div>
  );
}

function Interlude({
  practice,
  onActivate,
}: {
  practice: (typeof practices)[number];
  onActivate: (artifact: ActiveArtifact) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const artifact: ActiveArtifact = useMemo(
    () => ({
      id: practice.id,
      date: 'Ongoing',
      title: practice.title,
      artifact: 'No end date',
      preview: practice.preview,
      chapter: 'ongoing',
    }),
    [practice]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && onActivate(artifact), {
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [artifact, onActivate]);

  return (
    <div ref={ref} className="module-card overflow-hidden sm:grid sm:grid-cols-[150px_minmax(0,1fr)]">
      <div className="bg-surface-2 border-line h-32 border-b sm:h-full sm:border-r sm:border-b-0">
        <StoryPreview preview={practice.preview} />
      </div>
      <div className="p-4 sm:p-5">
        <p className="label-mono text-accent">{practice.id}</p>
        <h3 className="mt-1.5 text-[16px] font-semibold">{practice.title}</h3>
        <p className="text-muted mt-2 text-[13px] leading-relaxed">{practice.caption}</p>
        <p className="mt-3 text-[12.5px]">
          <span className="text-accent font-mono text-[9.5px] font-medium tracking-widest uppercase">Lesson — </span>
          <span className="text-ink">{practice.lesson}</span>
        </p>
        {practice.link && (
          <a
            href={practice.link.href}
            target={practice.link.external ? '_blank' : undefined}
            rel={practice.link.external ? 'noopener noreferrer' : undefined}
            className="text-accent mt-3 inline-block font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase underline-offset-4 hover:underline"
          >
            {practice.link.label} {practice.link.external ? '↗' : '→'}
          </a>
        )}
      </div>
    </div>
  );
}

export function Timeline() {
  const reduceMotion = useReducedMotion();
  const [track, setTrack] = useState<StoryTrackKey>('all');
  const [active, setActive] = useState<ActiveArtifact>(() => toArtifact(orderedNotes[0]));

  const railRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Record<string, HTMLElement | null>>({});
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 55%', 'end 85%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  const registerRef = useCallback((key: StoryChapterKey, el: HTMLElement | null) => {
    chapterRefs.current[key] = el;
  }, []);

  const visibleNotes = useMemo(
    () => (track === 'all' ? orderedNotes : orderedNotes.filter((note) => note.track === track)),
    [track]
  );

  const showOngoing = track === 'all' || track === 'life';

  // chapters that actually have content under the current filter
  const groups = useMemo(
    () =>
      storyChapters
        .map((chapter) => ({
          chapter,
          notes: visibleNotes.filter((note) => chapterOf(note) === chapter.key),
        }))
        .filter((group) => group.notes.length > 0 || (group.chapter.key === 'ongoing' && showOngoing)),
    [visibleNotes, showOngoing]
  );

  const perTrackCount = useMemo(() => {
    const counts: Record<string, number> = { all: orderedNotes.length };
    for (const t of storyTracks) {
      if (t.key === 'all') continue;
      counts[t.key] = orderedNotes.filter((note) => note.track === t.key).length;
    }
    return counts;
  }, []);

  // if a filter removes the active artifact, fall back to the first visible note
  useEffect(() => {
    const stillVisible =
      visibleNotes.some((note) => note.id === active.id) || (active.chapter === 'ongoing' && showOngoing);
    if (!stillVisible) {
      if (visibleNotes.length) setActive(toArtifact(visibleNotes[0]));
      else if (showOngoing) setActive(toArtifact(orderedNotes[0]));
    }
  }, [visibleNotes, active.id, active.chapter, showOngoing]);

  const scrollToChapter = (key: StoryChapterKey) => {
    chapterRefs.current[key]?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const activeChapter = storyChapters.find((c) => c.key === active.chapter) ?? storyChapters[0];
  const visibleChapters = groups.map((group) => group.chapter);

  return (
    <div>
      {/* filters */}
      <div className="border-line -mx-5 overflow-x-auto border-b px-5 pb-4 sm:mx-0 sm:overflow-visible sm:px-0">
        <div role="group" aria-label="Filter field notes" className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {storyTracks.map((t) => {
            const activeTrack = track === t.key;
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={activeTrack}
                onClick={() => setTrack(t.key)}
                className={`relative min-h-11 rounded-full border px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${
                  activeTrack
                    ? 'border-ink text-paper'
                    : 'border-line text-muted hover:border-line-strong hover:text-ink'
                }`}
              >
                {activeTrack && (
                  <motion.span
                    layoutId={reduceMotion ? undefined : 'story-pill'}
                    className="bg-ink absolute inset-0 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {t.label}
                  <span className={activeTrack ? 'text-paper/60' : 'text-faint'}> · {perTrackCount[t.key]}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* mobile: sticky chapter progress + single scroll-driven preview */}
      <div className="bg-paper/92 border-line sticky top-16 z-30 -mx-5 backdrop-blur-sm sm:-mx-8 lg:hidden">
        <div className="border-b px-5 py-2.5 sm:px-8">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10.5px] font-medium tracking-widest uppercase">
              <span className="text-accent">CH {activeChapter.index}</span> · {activeChapter.label}
            </p>
            <p className="text-faint font-mono text-[10px] tracking-widest uppercase">{active.date}</p>
          </div>
          <div className="bg-line mt-2 h-0.5 overflow-hidden rounded-full">
            <motion.div
              className="bg-accent h-full origin-left rounded-full"
              style={{ scaleX: reduceMotion ? 1 : fill }}
            />
          </div>
        </div>
        <div className="bg-surface-2 border-line border-t">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="h-44"
            >
              <StoryPreview preview={active.preview} media={active.media} />
            </motion.div>
          </AnimatePresence>
          <div className="border-t px-5 py-2 sm:px-8">
            <p className="text-faint font-mono text-[9.5px] font-medium tracking-widest uppercase">
              {active.id} · {active.date}
            </p>
            <p className="mt-0.5 text-[13px] font-semibold">{active.title}</p>
            <p className="text-faint font-mono text-[9px] tracking-widest uppercase">Artifact: {active.artifact}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 pt-8 lg:grid-cols-[176px_minmax(0,1fr)_320px] lg:gap-10">
        {/* left: chapter + progress rail */}
        <aside className="hidden lg:block" aria-label="Chapters">
          <nav className="sticky top-28">
            <p className="label-mono text-faint mb-3">Now reading</p>
            <div className="flex gap-3">
              <div className="bg-line relative w-0.5 shrink-0 overflow-hidden rounded-full">
                <motion.div
                  aria-hidden="true"
                  className="bg-accent absolute inset-x-0 top-0 h-full origin-top rounded-full"
                  style={{ scaleY: reduceMotion ? 1 : fill }}
                />
              </div>
              <ol className="flex min-w-0 flex-col gap-1">
                {visibleChapters.map((chapter) => {
                  const isActive = active.chapter === chapter.key;
                  return (
                    <li key={chapter.key}>
                      <button
                        type="button"
                        onClick={() => scrollToChapter(chapter.key)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`group block w-full rounded-md px-2 py-1.5 text-left transition-colors ${
                          isActive ? 'bg-surface-2' : 'hover:bg-surface-2/60'
                        }`}
                      >
                        <span
                          className={`flex items-baseline gap-1.5 font-mono text-[12px] tracking-[0.02em] ${
                            isActive ? 'text-ink font-medium' : 'text-muted group-hover:text-ink'
                          }`}
                        >
                          <span className={isActive ? 'text-accent' : 'text-faint'}>{chapter.index}</span>
                          {chapter.label}
                        </span>
                        <span className="text-faint mt-0.5 block font-mono text-[9.5px] tracking-widest uppercase">
                          {chapter.years}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>
        </aside>

        {/* centre: the chronicle */}
        <div ref={railRef} className="relative pl-7 sm:pl-8">
          <span aria-hidden="true" className="bg-line absolute top-2 bottom-2 left-1.75 w-0.5" />
          <motion.span
            aria-hidden="true"
            className="bg-accent absolute top-2 bottom-2 left-1.75 w-0.5 origin-top"
            style={{ scaleY: reduceMotion ? 1 : fill }}
          />

          <AnimatePresence mode="popLayout" initial={false}>
            {groups.map((group) => (
              <motion.section
                key={group.chapter.key}
                layout={!reduceMotion}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                aria-label={`Chapter ${group.chapter.index}: ${group.chapter.label}`}
              >
                <ChapterHeading chapter={group.chapter} registerRef={registerRef} />

                {group.chapter.key === 'ongoing' ? (
                  <OngoingInterludes onActivate={setActive} />
                ) : (
                  <ol className="mt-4 list-none">
                    {group.notes.map((note) => (
                      <li key={note.id} className="relative mb-5">
                        <span
                          aria-hidden="true"
                          className={`border-paper absolute top-6 -left-6.75 size-3.5 rounded-full border-[3px] sm:-left-7.75 ${
                            active.id === note.id ? 'bg-accent' : note.accent ? 'bg-accent/40' : 'bg-line-strong'
                          }`}
                        />
                        <NoteCard note={note} onActivate={setActive} isActive={active.id === note.id} />
                      </li>
                    ))}
                  </ol>
                )}
              </motion.section>
            ))}
          </AnimatePresence>

          {groups.length === 0 && (
            <p className="border-line-strong text-faint rounded-xl border-[1.5px] border-dashed px-6 py-14 text-center font-mono text-[11px] tracking-widest uppercase">
              No field notes on this track
            </p>
          )}
        </div>

        {/* right: living artifact preview stage */}
        <aside className="hidden lg:block" aria-label="Artifact preview">
          <div className="sticky top-28">
            <div className="module-card overflow-hidden">
              <div className="bg-surface-2 border-line relative h-48 border-b">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="h-full w-full"
                  >
                    <StoryPreview preview={active.preview} media={active.media} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="p-4">
                <p className="text-faint font-mono text-[9.5px] font-medium tracking-widest uppercase">
                  {active.id} · {active.date}
                </p>
                <p className="mt-1.5 text-[14px] font-semibold">{active.title}</p>
                <p className="text-faint mt-1 font-mono text-[9.5px] tracking-widest uppercase">
                  Artifact: {active.artifact}
                </p>
              </div>
            </div>

            <p className="text-faint mt-4 px-1 font-mono text-[9px] leading-4 tracking-[0.08em] uppercase">
              Previews are designed schematics.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
