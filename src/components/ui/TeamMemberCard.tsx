interface TeamMemberCardProps {
  name: string;
  title: string;
  initials: string;
  bio: string;
  linkedin?: string;
}

export function TeamMemberCard({ name, title, initials, bio, linkedin }: TeamMemberCardProps) {
  const inner = (
    <div className="group rounded-xl border border-border p-6 transition-colors hover:border-primary/30">
      {/* Photo placeholder */}
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-lg font-bold text-muted-foreground ring-2 ring-border group-hover:ring-primary/20">
        {initials}
      </div>
      <p className="text-base font-semibold">{name}</p>
      <p className="mb-3 text-sm font-medium text-primary">{title}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>
    </div>
  );

  if (linkedin) {
    return (
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {inner}
      </a>
    );
  }

  return <div>{inner}</div>;
}
