'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Conversation } from '@elevenlabs/react';
import type { TextConversation } from '@elevenlabs/react';
import { MessageCircle, X, Send, Loader2, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID_AIVEX;

type Status = 'disconnected' | 'connecting' | 'connected';
type ChatMessage = { role: 'user' | 'agent'; text: string };

async function saveContactInfo(parameters: Record<string, unknown>): Promise<string> {
  const name = typeof parameters.customer_name === 'string' ? parameters.customer_name : '';
  const email = typeof parameters.customer_mail === 'string' ? parameters.customer_mail : '';
  const message = typeof parameters.customer_brief === 'string' ? parameters.customer_brief : '';

  try {
    const res = await fetch('/api/chat-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    const data = (await res.json().catch(() => null)) as { message?: string } | null;
    if (!res.ok) {
      return data?.message ?? 'Could not save the contact details. Please try again.';
    }
    return `Contact info saved for ${name || 'the user'} (${email}).`;
  } catch {
    return 'Network error while saving the contact details. Please try again.';
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('disconnected');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [awaitingReply, setAwaitingReply] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Holds the active TextConversation instance; replaced on each new session.
  const sessionRef = useRef<TextConversation | null>(null);
  const hasConnectedRef = useRef(false);
  const mountedRef = useRef(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { mountedRef.current = false; }, []);

  // Creates a brand-new session on every call — safe to call after disconnect.
  const startConversation = useCallback(async () => {
    if (!AGENT_ID || !mountedRef.current) return;
    setStatus('connecting');
    setErrorText('');
    try {
      const session = await Conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'websocket',
        textOnly: true,
        clientTools: { save_contact_info: saveContactInfo },
        onDisconnect: (details) => {
          sessionRef.current = null;
          if (!mountedRef.current) return;
          setStatus('disconnected');
          setAwaitingReply(false);
          // Auto-reconnect when the agent closes the session (typical after a turn).
          // Skip if the user deliberately ended the session (reason: 'user').
          if (details.reason !== 'user') {
            setTimeout(() => startConversation(), 800);
          }
        },
        onError: (message) => {
          if (!mountedRef.current) return;
          setErrorText(message || 'Connection error. Please try again.');
          setStatus('disconnected');
          setAwaitingReply(false);
        },
        onMessage: ({ message, source }) => {
          if (!mountedRef.current || source !== 'ai') return;
          setMessages((prev) => [...prev, { role: 'agent', text: message }]);
          setAwaitingReply(false);
        },
      });

      if (!mountedRef.current) {
        void session.endSession();
        return;
      }
      sessionRef.current = session;
      setStatus('connected');
    } catch (err) {
      if (!mountedRef.current) return;
      setErrorText(err instanceof Error ? err.message : 'Failed to connect.');
      setStatus('disconnected');
    }
  }, []);

  // Connect lazily on first open; session then auto-reconnects across toggles.
  useEffect(() => {
    if (!open || hasConnectedRef.current) return;
    hasConnectedRef.current = true;
    void startConversation();
  }, [open, startConversation]);

  // Clean up on unmount.
  useEffect(() => {
    return () => {
      void sessionRef.current?.endSession();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, awaitingReply, open]);

  useEffect(() => {
    if (open && status === 'connected') inputRef.current?.focus();
  }, [open, status]);

  const handleSend = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || status !== 'connected' || !sessionRef.current) return;
      sessionRef.current.sendUserMessage(text);
      setMessages((prev) => [...prev, { role: 'user', text }]);
      setInput('');
      setAwaitingReply(true);
    },
    [input, status]
  );

  // Ends the current session and starts a fresh one, clearing history.
  const handleNewConversation = useCallback(() => {
    void sessionRef.current?.endSession(); // fires onDisconnect with reason:'user' → no auto-reconnect
    sessionRef.current = null;
    setMessages([]);
    setInput('');
    setAwaitingReply(false);
    setErrorText('');
    // Small delay lets the old session's onDisconnect settle before starting fresh.
    setTimeout(() => void startConversation(), 300);
  }, [startConversation]);

  const statusDot =
    status === 'connected'
      ? 'bg-green-500'
      : status === 'connecting'
        ? 'bg-amber-500'
        : 'bg-muted-foreground';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="AIVEX assistant"
          className="flex h-[min(520px,70vh)] w-[min(360px,calc(100vw-3rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl animate-slide-up"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <span className={cn('h-2 w-2 rounded-full', statusDot)} aria-hidden />
              <span className="text-sm font-semibold">AIVEX Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleNewConversation}
                title="New conversation"
                aria-label="Start new conversation"
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {!AGENT_ID && (
              <p className="text-sm text-muted-foreground">
                The assistant isn't configured yet.
              </p>
            )}
            {AGENT_ID && messages.length === 0 && status !== 'connecting' && (
              <p className="text-sm text-muted-foreground">
                Hi! Ask me anything about AIVEX.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm',
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {awaitingReply && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-muted px-3 py-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            {errorText && <p className="text-xs text-red-500">{errorText}</p>}
          </div>

          {/* Composer */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                !AGENT_ID
                  ? 'Unavailable'
                  : status === 'connected'
                    ? 'Type a message…'
                    : status === 'connecting'
                      ? 'Connecting…'
                      : 'Reconnecting…'
              }
              disabled={status !== 'connected'}
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
              aria-label="Message"
            />
            <button
              type="submit"
              disabled={status !== 'connected' || !input.trim()}
              aria-label="Send message"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {status !== 'connected' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>
      )}

      {/* Floating toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
