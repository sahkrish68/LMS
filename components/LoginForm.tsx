'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginForm() {
    const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form action={dispatch} className="glass p-8 rounded-2xl shadow-xl border border-white/20">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Please enter your details to sign in.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                required
                            />
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                    <div>
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <LoginButton />
                </div>

                <div
                    className="flex h-8 items-end space-x-1 mt-2"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <div className="flex items-center text-sm text-red-500">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link href="/signup" className="font-medium text-primary hover:underline underline-offset-4">
                        Sign up
                    </Link>
                </div>
            </form>
        </motion.div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            aria-disabled={pending}
            disabled={pending}
        >
            {pending ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
            ) : (
                <>
                    Log in <ArrowRight className="ml-2 h-4 w-4" />
                </>
            )}
        </button>
    );
}
