import type { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  linkedin?: string;
  photo?: string;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');
}

export const metadata: Metadata = {
  title: 'About',
  description: 'About AIVEX — our mission, team, and approach to AI-driven signal research.',
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <Badge className="mb-4">About Us</Badge>
          <h1 className="mb-4 text-4xl font-bold">Our Mission</h1>
          <p className="text-lg text-muted-foreground">
            Making institutional-grade AI research infrastructure accessible to serious researchers.
          </p>
        </div>

        <div className="prose">
          <h2>Why We Built AIVEX</h2>
          <p>
            Systematic research requires systematic tooling. Most AI-powered market research tools
            are opaque, unauditable, and built for retail audiences. Institutional researchers need
            something different: a platform where every computation is traceable, every signal is
            scored, and every governance decision is logged.
          </p>
          <p>
            AIVEX is that platform. We built it because we needed it ourselves — and because we
            believe the future of quantitative research is modular, auditable, and AI-native.
          </p>

          <h2>What Makes Us Different</h2>
          <p>
            We are not building a black-box &quot;AI alpha&quot; product. We are building infrastructure:
          </p>
          <ul>
            <li>Modular pipelines you can inspect, extend, and replace</li>
            <li>Structured logging and crash records for every exception</li>
            <li>A governance layer that you control — not us</li>
            <li>Outputs that carry confidence scores, not just predictions</li>
          </ul>

          <h2>Research Ethics</h2>
          <p>
            We believe AI-driven market research carries responsibility. AIVEX is designed to make
            that responsibility explicit: every output includes a research disclaimer, every signal
            is auditable, and the Governor module exists specifically to prevent outputs from being
            used as financial advice.
          </p>

          <h2>Team</h2>
        </div>

        <div className="my-8 grid gap-6 sm:grid-cols-2">
          {(
            [
              {
                name: 'Eren Can Dönertaş',
                title: 'Founder & CEO',
                bio: 'Third-year Computer Science student at TOBB University, focused on AI, finance, and business.',
                linkedin: 'https://www.linkedin.com/in/eren-can-donertas/',
                photo: '/team/eren.jpg',
              },
              {
                name: 'Enes Kerem Göksu',
                title: 'CTO',
                bio: 'Third-year Computer Science student at TOBB University, focused on AI and system architecture.',
                linkedin: 'https://www.linkedin.com/in/enes-kerem-göksu-198428407/',
                photo: '/team/enes.jpg',
              },
            ] satisfies TeamMember[]
          ).map((person) => {
            const Wrapper = person.linkedin ? 'a' : 'div';
            const wrapperProps = person.linkedin
              ? {
                  href: person.linkedin,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : {};
            return (
              <Wrapper
                key={person.name}
                {...wrapperProps}
                className="flex items-start gap-4 rounded-lg border border-border p-6 transition-shadow hover:shadow-md"
              >
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={`${person.name} headshot`}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-base font-semibold text-muted-foreground"
                  >
                    {initials(person.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold">{person.name}</p>
                  <p className="mb-2 text-sm text-muted-foreground">{person.title}</p>
                  <p className="text-sm">{person.bio}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>

        <div className="prose">
          <h2>Get In Touch</h2>
          <p>
            We work with researchers, quant teams, and academic institutions. If you are building
            systematic research workflows and want to evaluate AIVEX, we would like to hear from you.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
          <Link href="/docs/getting-started">
            <Button variant="outline">Read the Docs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
