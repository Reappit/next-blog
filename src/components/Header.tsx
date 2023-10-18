import Search from '@/components/Search';
import { Button } from '@/components/ui/button';

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <a href="/" className="mr-6 flex items-center space-x-2">
            DTT
          </a>
          <div className="flex w-auto items-center sm:w-72">
            <Search />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button variant="link">Login</Button>
        </div>
      </div>
    </header>
  );
}
