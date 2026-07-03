import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-8xl font-black text-muted-foreground/30">404</div>
      <h1 className="mb-3 text-2xl font-bold">Page Not Found</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
        <Link href="/docs/tr/getting-started">
          <Button variant="outline">View Docs</Button>
        </Link>
      </div>
    </div>
  );
}
