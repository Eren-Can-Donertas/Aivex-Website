'use client';

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false });

export function ChatWidgetMount() {
  if (
    process.env.NEXT_PUBLIC_ENABLE_AIVEX_CHAT !== '1' ||
    !process.env.NEXT_PUBLIC_AGENT_ID_AIVEX
  ) {
    return null;
  }
  return <ChatWidget />;
}
