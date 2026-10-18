import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/auth-form';
import { authHead } from '@/lib/auth';
export const Route = createFileRoute('/login')({ head: () => authHead('Login', 'Access your EMB Connect account securely.'), component: AuthForm });