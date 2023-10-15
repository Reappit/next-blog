import { Input } from '@/components/ui/input';

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <a href="/" className="mr-6 flex items-center space-x-2">
            DTT
          </a>
          <div className="flex w-72 items-center">
            <Input className="rounded-3xl" placeholder="Seach..." />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end">
          LOGIN BUTTONS
        </div>
      </div>
    </header>
  );
}
