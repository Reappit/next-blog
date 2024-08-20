'use client';

import { useSession } from 'next-auth/react';
import { type ReactNode } from 'react';

export default function IsAdmin({ children }: { children: ReactNode }) {
  const session = useSession();
  const { data } = session;
  return data?.user.role === 'admin' ? children : null;
}
