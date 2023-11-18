import Search from '@/components/Search';
import { Button } from '@/components/ui/button';
import { GeistSans } from 'geist/font/sans';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import { Suspense } from 'react';
import UserButton from '@/components/UserButton';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link
            href="/"
            className={`mr-6 flex items-center space-x-2 text-3xl font-thin tracking-widest ${
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              GeistSans.variable
            }`}
          >
            DTT
          </Link>
          <div className="flex w-auto items-center sm:w-72">
            <Search />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button variant="link">
            <Link href="/editor" className="flex items-center">
              <PenSquare className="mr-1" strokeWidth={0.5} size={17} /> Write
            </Link>
          </Button>
          <Suspense>
            <UserButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
