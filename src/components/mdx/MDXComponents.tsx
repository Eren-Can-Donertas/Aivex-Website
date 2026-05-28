import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const mdxComponents: MDXComponents = {
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

  Callout: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'danger'; children: ReactNode }) => {
    const styles = {
      info: 'border-primary/30 bg-primary/5 text-foreground',
      warning: 'border-yellow-500/30 bg-yellow-500/5 text-foreground',
      danger: 'border-red-500/30 bg-red-500/5 text-foreground',
    };
    return (
      <div className={`my-4 rounded-lg border p-4 text-sm ${styles[type]}`}>
        {children}
      </div>
    );
  },

  pre: ({ children, ...props }) => (
    <pre
      className="my-5 overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),

  code: ({ children, className, ...props }) => {
    // Inline code (no className) vs code inside a <pre> (has language className)
    const isBlock = !!className;
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]"
        {...props}
      >
        {children}
      </code>
    );
  },

  table: ({ children, ...props }) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="bg-muted/60" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),

  tr: ({ children, ...props }) => (
    <tr className="border-b border-border last:border-0 transition-colors hover:bg-muted/30" {...props}>
      {children}
    </tr>
  ),

  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td className="px-4 py-3 align-top" {...props}>
      {children}
    </td>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-4 rounded-r-lg border-l-4 border-primary/50 bg-primary/5 py-2 pl-4 pr-3 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),

  hr: (props) => (
    <hr className="my-8 border-border" {...props} />
  ),
};
