import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
    return (
        <main className="flex min-h-screen items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[100px]" />

            <div className="relative w-full max-w-md">
                <SignupForm />
            </div>
        </main>
    );
}
