import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default:
    'bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-bold',
  outline:
    'border-[1.5px] border-foreground bg-transparent text-foreground hover:border-primary hover:text-primary font-bold',
  ghost: 'hover:bg-muted text-foreground',
  link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
  accent: 'bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-bold',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs tracking-[0.04em]',
  md: 'h-10 px-4 py-2 text-sm tracking-[0.04em]',
  lg: 'h-12 px-7 text-sm tracking-[0.06em]',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
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
