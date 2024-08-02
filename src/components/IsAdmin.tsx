'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';

export default function IsAdmin({ children }: { children: ReactNode }) {
  const session = useSession();
  const { data } = session;
  return data?.user.role === 'admin' ? children : null;
}
