'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

import { site } from '@/data/site';
import { buildMailto, buildPlainText, isValidEmail, type ContactDraft } from '@/lib/contact';

const REASONS = ['Role opportunity', 'Collaboration', 'Product conversation', 'Research', 'Something else'] as const;

/** Pre-filled mailto for the direct channel link — subject + greeting. */
const QUICK_MAILTO = `mailto:${site.email}?subject=${encodeURIComponent('Hello from your portfolio — ')}&body=${encodeURIComponent('Hi Naren,\r\n\r\n')}`;

const CHANNELS: { label: string; value: string; href: string; copyable?: boolean }[] = [
  { label: 'Email', value: site.email, href: QUICK_MAILTO, copyable: true },
  { label: 'GitHub', value: 'github.com/osnaren', href: site.links.github },
  { label: 'LinkedIn', value: 'linkedin.com/in/osnaren', href: site.links.linkedin },
  { label: 'Kaggle', value: 'kaggle.com/obulisainaren', href: site.links.kaggle },
  { label: 'X', value: '@osnaren', href: site.links.x },
];

const REASONS_TO_REACH = [
  'Frontend opportunities',
  'Product-focused engineering',
  'Useful web tools',
  'Research & technical collaboration',
  'Thoughtful side-project ideas',
];

/** The four signal nodes, each mapped to a real piece of form state. */
function useSignal(draft: { name: string; email: string; message: string }) {
  const hasName = draft.name.trim().length > 0;
  const validEmail = isValidEmail(draft.email);
  const hasMessage = draft.message.trim().length > 0;
  const ready = hasName && validEmail && hasMessage;

  const nodes = [
    { n: '01', label: 'Source', active: hasName },
    { n: '02', label: 'Return', active: validEmail },
    { n: '03', label: 'Packet', active: hasMessage },
    { n: '04', label: 'Channel', active: ready },
  ];

  const status = ready
    ? 'READY TO TRANSMIT'
    : hasMessage
      ? 'MESSAGE ENCODED'
      : validEmail
        ? 'RETURN CHANNEL VERIFIED'
        : hasName
          ? 'IDENTITY RECEIVED'
          : 'CHANNEL IDLE';

  return { hasName, validEmail, hasMessage, ready, nodes, status };
}

export function SignalComposer() {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState<string>(REASONS[0]);
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attempted, setAttempted] = useState(false);
  const [copied, setCopied] = useState<'email' | 'message' | null>(null);
  const [composedOnce, setComposedOnce] = useState(false);
  const [live, setLive] = useState('');
  const [transientStatus, setTransientStatus] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const copyTimer = useRef<number | null>(null);
  const statusTimer = useRef<number | null>(null);
  const readyRef = useRef(false);

  const nameId = useId();
  const emailId = useId();
  const reasonId = useId();
  const messageId = useId();

  const draft: ContactDraft = { name, email, reason, message };
  const signal = useSignal(draft);

  const showError = (field: string) => touched[field] || attempted;
  const nameError = showError('name') && !name.trim() ? 'Add your name so I know who I’m replying to.' : '';
  const emailError =
    showError('email') &&
    (!email.trim() ? 'Add an email so I can reply.' : !isValidEmail(email) ? 'That email doesn’t look right.' : '');
  const messageError =
    showError('message') && !message.trim() ? 'Add a short message — what are you building or need?' : '';

  // announce the ready state once (not on every keystroke)
  useEffect(() => {
    if (signal.ready && !readyRef.current) {
      readyRef.current = true;
      setLive('Channel ready — you can compose the email.');
    } else if (!signal.ready) {
      readyRef.current = false;
    }
  }, [signal.ready]);

  useEffect(
    () => () => {
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
      if (statusTimer.current !== null) window.clearTimeout(statusTimer.current);
    },
    []
  );

  const copy = async (text: string, kind: 'email' | 'message') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setLive(kind === 'email' ? 'Email address copied to clipboard.' : 'Prepared message copied to clipboard.');
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setLive('Copy failed — you can select the text manually.');
    }
  };

  const flashStatus = (text: string) => {
    setTransientStatus(text);
    if (statusTimer.current !== null) window.clearTimeout(statusTimer.current);
    statusTimer.current = window.setTimeout(() => setTransientStatus(null), 2200);
  };

  const handleCompose = (event: React.FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (!name.trim()) {
      setLive('Please add your name before composing.');
      nameRef.current?.focus();
      return;
    }
    if (!isValidEmail(email)) {
      setLive('Please add a valid email before composing.');
      emailRef.current?.focus();
      return;
    }
    if (!message.trim()) {
      setLive('Please add a message before composing.');
      messageRef.current?.focus();
      return;
    }
    flashStatus('OPENING MAIL CHANNEL');
    setComposedOnce(true);
    setLive('Opening your mail app with the message prepared.');
    // Use a temporary anchor element — window.location.href is blocked by some browsers for mailto:
    const mailtoUrl = buildMailto(draft);
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const displayStatus = transientStatus ?? signal.status;
  const statusTone =
    signal.ready || transientStatus ? 'text-ok' : signal.status === 'CHANNEL IDLE' ? 'text-faint' : 'text-accent';

  const container = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        animate: 'show',
        variants: { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } },
      };
  const item = reduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
        },
      };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
      {/* polite live region — discrete events only */}
      <p aria-live="polite" className="sr-only">
        {live}
      </p>

      {/* ── identity ── */}
      <div className="lg:col-start-1 lg:row-start-1">
        <div className="border-line-strong bg-surface/70 rounded-xl border p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-faint font-mono text-[9.5px] font-medium tracking-[0.12em] uppercase">
              Channel identity
            </p>
            <span className="text-ok inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.08em] uppercase">
              <span className="bg-ok size-1.5 rounded-full" aria-hidden="true" /> Open channel
            </span>
          </div>
          <p className="mt-3 text-lg font-semibold tracking-[-0.01em]">{site.name}</p>
          <p className="text-muted mt-0.5 text-[13px]">{site.role}</p>
          <p className="text-faint mt-0.5 font-mono text-[10px] tracking-[0.06em] uppercase">{site.location}</p>

          <div className="border-line mt-5 border-t pt-4">
            <p className="text-faint font-mono text-[9.5px] tracking-widest uppercase">Good reasons to reach out</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {REASONS_TO_REACH.map((reasonItem) => (
                <li
                  key={reasonItem}
                  className="border-line text-muted rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.02em]"
                >
                  {reasonItem}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── reasons live under identity on desktop (row 2) ── */}

      {/* ── channels ── */}
      <div className="lg:col-start-1 lg:row-start-2">
        <div className="border-line-strong bg-surface/70 rounded-xl border p-5 sm:p-6">
          <p className="text-faint font-mono text-[9.5px] tracking-widest uppercase">Direct channels</p>
          <ul className="mt-3 flex flex-col">
            {CHANNELS.map((channel) => {
              const external = !channel.href.startsWith('mailto:');
              return (
                <li
                  key={channel.label}
                  className="border-line flex items-center justify-between gap-3 border-b py-2.5 last:border-b-0"
                >
                  <a
                    href={channel.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group flex min-w-0 flex-1 items-center justify-between gap-3"
                  >
                    <span className="text-faint font-mono text-[10px] font-medium tracking-widest uppercase">
                      {channel.label}
                    </span>
                    <span className="group-hover:text-accent inline-flex items-center gap-1 truncate font-mono text-[12.5px] transition-colors">
                      {channel.value}
                      {external && <ArrowUpRight className="size-3 shrink-0" aria-hidden="true" />}
                    </span>
                  </a>
                  {channel.copyable && (
                    <button
                      type="button"
                      onClick={() => copy(site.email, 'email')}
                      className="border-line hover:border-ink hover:text-accent grid size-7 shrink-0 place-items-center rounded-md border transition-colors"
                      aria-label={copied === 'email' ? 'Email copied' : 'Copy email address'}
                    >
                      {copied === 'email' ? <Check className="size-3.5 text-ok" /> : <Copy className="size-3.5" />}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ── signal composer (right, spans rows) ── */}
      <motion.div {...container} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <div className="border-line-strong bg-surface/70 relative overflow-hidden rounded-xl border p-5 sm:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_92%_0%,color-mix(in_srgb,var(--accent)_7%,transparent),transparent_60%)]"
          />

          {/* status header */}
          <motion.div {...item} className="relative flex items-center justify-between gap-3">
            <p className="text-faint font-mono text-[9.5px] font-medium tracking-[0.12em] uppercase">Signal composer</p>
            <p
              className={`font-mono text-[10px] font-medium tracking-widest uppercase ${statusTone}`}
              aria-hidden="true"
            >
              <span
                className={`mr-1.5 inline-block size-1.5 rounded-full align-middle ${signal.ready || transientStatus ? 'bg-ok' : signal.status === 'CHANNEL IDLE' ? 'bg-line-strong' : 'bg-accent'} ${!reduceMotion && signal.ready ? 'animate-pulse' : ''}`}
              />
              {displayStatus}
            </p>
          </motion.div>

          {/* channel rail */}
          <motion.div {...item} className="relative mt-4">
            <div className="flex items-center justify-between gap-1">
              {signal.nodes.map((node, index) => (
                <div key={node.n} className="flex flex-1 items-center gap-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={`grid size-6 place-items-center rounded-full border font-mono text-[8px] font-medium transition-colors ${
                        node.active ? 'border-ok bg-ok/10 text-ok' : 'border-line-strong text-faint'
                      }`}
                    >
                      {node.n}
                    </span>
                    <span
                      className={`font-mono text-[8px] tracking-[0.06em] uppercase ${node.active ? 'text-ink' : 'text-faint'}`}
                    >
                      {node.label}
                    </span>
                  </div>
                  {index < signal.nodes.length - 1 && (
                    <span className="bg-line relative -mt-4 h-0.5 flex-1 overflow-hidden rounded-full">
                      <span
                        className={`absolute inset-y-0 left-0 rounded-full bg-ok transition-[width] duration-500 ${signal.nodes[index + 1].active ? 'w-full' : 'w-0'}`}
                      />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <form
            onSubmit={handleCompose}
            noValidate
            className="relative mt-6 flex flex-col gap-4"
            aria-label="Contact form"
          >
            {/* name */}
            <motion.div {...item}>
              <label
                htmlFor={nameId}
                className="text-faint mb-1.5 block font-mono text-[10px] tracking-[0.08em] uppercase"
              >
                Name <span className="text-accent">*</span>
              </label>
              <input
                id={nameId}
                ref={nameRef}
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                aria-invalid={!!nameError}
                aria-describedby={nameError ? `${nameId}-err` : undefined}
                className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[14px] outline-none transition-colors focus:border-accent ${nameError ? 'border-(--color-destructive)' : 'border-line-strong'}`}
                placeholder="Ada Lovelace"
              />
              {nameError && (
                <p id={`${nameId}-err`} className="mt-1.5 font-mono text-[10.5px] text-(--color-destructive)">
                  {nameError}
                </p>
              )}
            </motion.div>

            {/* email */}
            <motion.div {...item}>
              <label
                htmlFor={emailId}
                className="text-faint mb-1.5 block font-mono text-[10px] tracking-[0.08em] uppercase"
              >
                Email <span className="text-accent">*</span>
              </label>
              <input
                id={emailId}
                ref={emailRef}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? `${emailId}-err` : undefined}
                className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[14px] outline-none transition-colors focus:border-accent ${emailError ? 'border-(--color-destructive)' : 'border-line-strong'}`}
                placeholder="ada@example.com"
              />
              {emailError && (
                <p id={`${emailId}-err`} className="mt-1.5 font-mono text-[10.5px] text-(--color-destructive)">
                  {emailError}
                </p>
              )}
            </motion.div>

            {/* reason */}
            <motion.div {...item}>
              <label
                htmlFor={reasonId}
                className="text-faint mb-1.5 block font-mono text-[10px] tracking-[0.08em] uppercase"
              >
                Reason
              </label>
              <select
                id={reasonId}
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="border-line-strong bg-surface focus:border-accent w-full rounded-lg border px-3.5 py-2.5 text-[14px] outline-none transition-colors"
              >
                {REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* message */}
            <motion.div {...item}>
              <label
                htmlFor={messageId}
                className="text-faint mb-1.5 block font-mono text-[10px] tracking-[0.08em] uppercase"
              >
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id={messageId}
                ref={messageRef}
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                aria-invalid={!!messageError}
                aria-describedby={messageError ? `${messageId}-err` : undefined}
                className={`w-full resize-y rounded-lg border bg-surface px-3.5 py-2.5 text-[14px] leading-relaxed outline-none transition-colors focus:border-accent ${messageError ? 'border-(--color-destructive)' : 'border-line-strong'}`}
                placeholder="Tell me what you are building, fixing, or trying to understand…"
              />
              {messageError && (
                <p id={`${messageId}-err`} className="mt-1.5 font-mono text-[10.5px] text-(--color-destructive)">
                  {messageError}
                </p>
              )}
            </motion.div>

            {/* packet preview */}
            <motion.dl
              {...item}
              className="bg-surface-2 border-line grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border p-3.5 font-mono text-[11px]"
            >
              <div>
                <dt className="text-faint text-[9px] tracking-[0.08em] uppercase">To</dt>
                <dd className="text-ink">Naren</dd>
              </div>
              <div>
                <dt className="text-faint text-[9px] tracking-[0.08em] uppercase">From</dt>
                <dd className="text-ink truncate">{name.trim() || '—'}</dd>
              </div>
              <div>
                <dt className="text-faint text-[9px] tracking-[0.08em] uppercase">Channel</dt>
                <dd className="text-ink truncate">{reason}</dd>
              </div>
              <div>
                <dt className="text-faint text-[9px] tracking-[0.08em] uppercase">Packet</dt>
                <dd className="text-ink">{message.trim().length} chars</dd>
              </div>
            </motion.dl>

            {/* actions */}
            <motion.div {...item} className="flex flex-col gap-3">
              <button
                type="submit"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 font-mono text-[12px] font-medium tracking-[0.06em] uppercase transition-colors ${
                  signal.ready
                    ? 'bg-ok text-white shadow-[0_2px_0_color-mix(in_srgb,var(--ok)_70%,black)] hover:opacity-95'
                    : 'bg-accent text-white shadow-[0_2px_0_var(--accent-press)] hover:bg-accent-press'
                }`}
              >
                {signal.ready ? 'Compose email — ready →' : 'Compose email →'}
              </button>
              <p className="text-faint text-[11px] leading-relaxed">
                This opens a draft in your own mail app addressed to {site.email}. Nothing is sent from this page and
                nothing is stored — you review and send it yourself.
              </p>
              {composedOnce && (
                <div className="border-line bg-surface-2 rounded-lg border p-3">
                  <p className="text-muted text-[11.5px] leading-relaxed">
                    Mail app didn’t open? Copy the prepared message or the address and send it manually.
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => copy(buildPlainText(draft), 'message')}
                      className="border-ink hover:bg-ink hover:text-paper inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 font-mono text-[10px] font-medium tracking-[0.06em] uppercase transition-colors"
                    >
                      {copied === 'message' ? <Check className="size-3.5 text-ok" /> : <Copy className="size-3.5" />}
                      {copied === 'message' ? 'Copied' : 'Copy message'}
                    </button>
                    <button
                      type="button"
                      onClick={() => copy(site.email, 'email')}
                      className="border-line hover:border-ink inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 font-mono text-[10px] font-medium tracking-[0.06em] uppercase transition-colors"
                    >
                      {copied === 'email' ? <Check className="size-3.5 text-ok" /> : <Copy className="size-3.5" />}
                      Copy email
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
