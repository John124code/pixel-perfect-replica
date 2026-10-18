import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/auth-form';
import { authHead } from '@/lib/auth';
export const Route = createFileRoute('/auth')({ head: () => authHead('Sign in', 'Sign in to your EMB Connect embroidery account.'), component: AuthForm });