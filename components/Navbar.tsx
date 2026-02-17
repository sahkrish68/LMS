'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

interface NavbarProps {
    session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const isAdmin = session?.user && (session.user as any).role === 'admin';
    const isAdminRoute = pathname.startsWith('/admin');

    const items = useMemo(() => {
        return isAdmin ? [...navItems, { name: 'Admin', href: '/admin' }] : navItems;
    }, [isAdmin]);

    // Prevent background scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (isAdminRoute) return null;

    return (
        <>
            {/* fixed header */}
            <header
                className={cn(
                    'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                    scrolled ? 'glass py-2' : 'bg-transparent py-4'
                )}
            >
                <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
                    {/* brand */}
                    <Link className="flex items-center justify-center" href="/">
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            Consultancy<span className="text-primary">LMS</span>
                        </span>
                    </Link>

                    {/* desktop nav */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {items.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'relative text-sm font-medium transition-colors hover:text-primary',
                                        active ? 'text-primary' : 'text-muted-foreground'
                                    )}
                                >
                                    {item.name}
                                    {active && (
                                        <motion.span
                                            layoutId="nav-underline"
                                            className="absolute left-0 top-full mt-1 block h-[2px] w-full bg-primary"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* desktop auth */}
                    <div className="hidden items-center gap-4 md:flex">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <span className="max-w-[220px] truncate text-sm font-medium text-muted-foreground">
                                    {session.user?.name || session.user?.email}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => signOut()}
                                    className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* mobile toggle */}
                    <button
                        type="button"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        className="p-2 text-muted-foreground md:hidden"
                        onClick={() => setIsOpen((v) => !v)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* mobile nav panel */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="glass overflow-hidden border-t border-border/50 md:hidden"
                        >
                            <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
                                {items.map((item) => {
                                    const active = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                'rounded-md p-2 text-base font-medium transition-colors hover:bg-muted hover:text-primary',
                                                active ? 'bg-muted/50 text-primary' : 'text-foreground'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}

                                <div className="mt-4 border-t border-border pt-4">
                                    {session ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-sm text-foreground">
                                                {session.user?.email}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => signOut()}
                                                className="w-full rounded-md border border-border py-2 text-center text-sm font-medium transition-colors hover:bg-muted"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <Link
                                                href="/login"
                                                className="w-full rounded-md border border-border py-2 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href="/signup"
                                                className="w-full rounded-md bg-primary py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                            >
                                                Get Started
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* spacer so content doesn't go under fixed navbar */}
            <div className={cn(scrolled ? 'h-[72px]' : 'h-[86px]')} />
        </>
    );
}
