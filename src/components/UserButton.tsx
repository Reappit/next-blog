'use client';
import { signIn, useSession, signOut } from 'next-auth/react';
import { LogOut, ShieldPlus, User2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  // DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function UserButton() {
  const session = useSession();
  const isAuthenticated = session.data;
  console.log(session);
  if (session.status === 'loading') {
    return null;
  }
  return isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-3xl">
          <User2Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center">
            {session.data.user.role === 'admin' ? (
              <ShieldPlus className="mr-2" strokeWidth={1.5} size={17} />
            ) : null}
            Hello, {session.data.user.name}
          </div>
        </DropdownMenuLabel>
        {/*<DropdownMenuSeparator />*/}
        {/*<DropdownMenuGroup>*/}
        {/*  <DropdownMenuItem>*/}
        {/*    <User className="mr-2 h-4 w-4" />*/}
        {/*    <span>Profile</span>*/}
        {/*  </DropdownMenuItem>*/}
        {/*  <DropdownMenuItem>*/}
        {/*    <Settings className="mr-2 h-4 w-4" />*/}
        {/*    <span>Settings</span>*/}
        {/*  </DropdownMenuItem>*/}
        {/*</DropdownMenuGroup>*/}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button onClick={() => signIn()}>Signin with Google</Button>
  );
}
