import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`mb-10 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${center ? 'justify-center' : ''}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-pretty text-muted-foreground">{subtitle}</p>}
      {children}
    </div>
  );
}
