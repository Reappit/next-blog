import { login } from '@/app/login/actions';

export default function Login({
  searchParams,
}: Readonly<{
  searchParams: { message: string };
}>) {
  return (
    <div className="m-auto flex w-full sm:max-w-md">
      <form className="flex w-full flex-col" action={login}>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground">
          Sign In
        </button>
        {/*<button*/}
        {/*  formAction={signUp}*/}
        {/*  className="mb-2 rounded-md border border-foreground/20 px-4 py-2 text-foreground"*/}
        {/*>*/}
        {/*  Sign Up*/}
        {/*</button>*/}
        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
