import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RequestAccessSection() {
  return (
    <section className="bg-primary/5 py-20">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-3 text-3xl font-bold">Evaluate AIVEX for Your Workflow</h2>
        <p className="mb-8 text-muted-foreground">
          AIVEX is designed for researchers, systematic quant teams, and institutional workflows
          that require traceable, governed, and auditable signal research infrastructure.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              Request Research Access <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/product">
            <Button variant="outline" size="lg">
              Read Architecture
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Research and analysis platform only. Outputs are not financial, investment, or trading advice.
        </p>
      </div>
    </section>
  );
}
