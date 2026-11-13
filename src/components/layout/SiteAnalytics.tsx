'use client';

import { Analytics, type BeforeSendEvent } from '@vercel/analytics/next';

function redactPageUrl(event: BeforeSendEvent): BeforeSendEvent {
  return { ...event, url: event.url.split(/[?#]/, 1)[0] };
}

export function SiteAnalytics() {
  return <Analytics beforeSend={redactPageUrl} />;
}
