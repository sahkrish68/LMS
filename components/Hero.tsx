'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Video } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[100px]" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
                            >
                                <span>New Courses Available</span>
                                <ArrowRight className="ml-1 h-3 w-3" />
                            </motion.div>
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                Unlock Your Potential with Expert <span className="text-primary">Consultancy</span>.
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                                Access premium video courses and get personalized guidance from industry leaders. Elevate your skills today with our comprehensive learning platform.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-[400px]:flex-row">
                            <Link
                                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50"
                                href="/courses"
                            >
                                Browse Courses
                            </Link>
                            <Link
                                className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
                                href="/about"
                            >
                                Learn More
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex items-center justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card/50 backdrop-blur-sm group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="flex items-center justify-center h-full">
                                <div className="w-20 h-20 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                                    <Video className="h-8 w-8 text-primary ml-1" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
