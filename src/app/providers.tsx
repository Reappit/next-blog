'use client';

import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

const Providers = ({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
