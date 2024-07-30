'use client';
import { signIn, useSession } from 'next-auth/react';

export function SignIn() {
  const session = useSession();
  console.log(session)
  return session ? (
    <span>Hello {session.data?.user.name}</span>
  ) : (
    <button onClick={() => signIn()}>Signin with Google</button>
  );
}
