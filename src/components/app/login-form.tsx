'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const onSignIn = async () => {
    await signIn('google')
  }
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button type='button' variant="outline" className="w-full" onClick={onSignIn}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
              fill="#4285F4"
              d="M24 9.5c3.94 0 6.6 1.7 8.12 3.12l5.94-5.94C34.28 3.34 29.54 1.5 24 1.5 14.82 1.5 7.05 7.9 4.5 16.5l6.91 5.36C12.65 14.93 17.89 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.14 24.5c0-1.6-.14-3.14-.41-4.5H24v9h12.54c-.54 2.78-2.16 5.13-4.63 6.72l7.19 5.6c4.2-3.87 7.04-9.55 7.04-16.82z"
            />
            <path
              fill="#FBBC05"
              d="M11.41 28.14C10.77 26.36 10.5 24.47 10.5 22.5c0-1.97.27-3.86.91-5.64l-6.91-5.36C2.46 15.54 1.5 18.61 1.5 22.5c0 3.89.96 6.96 3 10l6.91-5.36z"
            />
            <path
              fill="#EA4335"
              d="M24 46.5c6.12 0 11.25-2.02 15-5.5l-7.19-5.6c-2.04 1.38-4.68 2.22-7.81 2.22-6.11 0-11.35-4.43-13.09-10.36l-6.91 5.36c3.63 7.18 11.27 13.38 20 13.38z"
            />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
