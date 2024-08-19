// import Search from '@/components/Search';
import { PenSquare } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import IsAdmin from '@/components/IsAdmin';
import { Button } from '@/components/ui/button';
import UserButton from '@/components/UserButton';

export default async function Header() {
  const t = await getTranslations('Header');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className={`mr-6 tracking-widest`}>
            <span className="text-5xl">D</span>
            <span className="text-xl">tt</span>
          </Link>
          {/*<div className="flex w-auto items-center sm:w-72">*/}
          {/*  <Search />*/}
          {/*</div>*/}
        </div>
        <div className="flex flex-1 items-center justify-end">
          <IsAdmin>
            <Button variant="link">
              <Link href="/editor" className="flex items-center">
                <PenSquare className="mr-1" strokeWidth={0.5} size={17} />
                {t('write')}
              </Link>
            </Button>
          </IsAdmin>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
