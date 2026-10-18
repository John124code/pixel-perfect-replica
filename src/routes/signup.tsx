import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/auth-form';
import { authHead } from '@/lib/auth';
export const Route = createFileRoute('/signup')({ head: () => authHead('Create account', 'Join EMB Connect and create your embroidery profile.'), component: SignupPage });
function SignupPage() { return <AuthForm signup/>; }