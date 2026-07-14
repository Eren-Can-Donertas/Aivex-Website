import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'accent' | 'success' | 'warning';
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'border-border text-muted-foreground bg-card',
  outline: 'border-border text-muted-foreground',
  accent: 'border-primary/40 text-primary bg-card',
  success: 'border-primary/40 text-primary bg-primary/5',
  warning: 'border-foreground/40 text-foreground bg-muted/50',
};

function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[0.64rem] font-medium uppercase tracking-[0.1em] transition-colors',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
