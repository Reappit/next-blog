import Search from '@/components/Search';
import { Button } from '@/components/ui/button';
import { Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link
            href="/"
            className={cn(
              spaceGrotesk.className,
              'mr-6 flex items-center space-x-2 text-3xl font-thin tracking-widest',
            )}
          >
            DTT
          </Link>
          <div className="flex w-auto items-center sm:w-72">
            <Search />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button variant="link">
            <Link href="/write" className="flex items-center">
              <PenSquare className="mr-1" strokeWidth={1} size={17} /> Write
            </Link>
          </Button>
          <Button variant="link">Логин</Button>
        </div>
      </div>
    </header>
  );
}
