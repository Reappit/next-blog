import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import { getCurrentUser } from '@/repository/user-repository';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export default async function UserButton() {
  const cookieStore = cookies();
  // const user = await getCurrentUser(cookieStore);

  return <span>hello</span>
  // return user === null ? (
  //   <Link href="/login">
  //     <Button variant="link">Логин</Button>
  //   </Link>
  // ) : (
  //   <span>{user?.id}</span>
  // );
}
