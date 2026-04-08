import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const mdxComponents: MDXComponents = {
  // Override anchor to use Next.js Link for internal URLs
  a: ({ href, children, ...props }) => {
    if (href?.startsWith('/') || href?.startsWith('#')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },

  // Callout box
  Callout: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'danger'; children: ReactNode }) => {
    const styles = {
      info: 'border-primary/30 bg-primary/5 text-foreground',
      warning: 'border-yellow-500/30 bg-yellow-500/5 text-foreground',
      danger: 'border-red-500/30 bg-red-500/5 text-foreground',
    };
    return (
      <div className={`my-4 rounded-lg border p-4 ${styles[type]}`}>
        {children}
      </div>
    );
  },

  // Code block with copy hint
  pre: ({ children, ...props }) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  // Table with horizontal scroll
  table: ({ children, ...props }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }) => (
    <th className="border-b border-border bg-muted px-4 py-3 text-left font-semibold" {...props}>
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td className="border-b border-border px-4 py-3" {...props}>
      {children}
    </td>
  ),
};
