'use client';

import dynamic from 'next/dynamic';

// The ElevenLabs SDK (and its livekit-client transitive dependency) touch
// browser-only globals at import time, so the widget is loaded client-side only.
const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false });

export function ChatWidgetMount() {
  return <ChatWidget />;
}
