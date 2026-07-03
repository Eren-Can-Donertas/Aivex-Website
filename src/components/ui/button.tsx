import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default:
    'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
  outline:
    'border border-border bg-transparent hover:bg-muted hover:border-primary/40 text-foreground',
  ghost: 'hover:bg-muted text-foreground',
  link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
