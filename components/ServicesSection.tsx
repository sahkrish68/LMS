'use client';

import { motion } from 'framer-motion';
import { Video, BookOpen, Users, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon map for dynamic rendering
const iconMap = {
    Video,
    BookOpen,
    Users,
};

interface Service {
    id: number;
    title: string;
    description: string;
    icon: keyof typeof iconMap;
    color: string;
}

interface ServicesSectionProps {
    services: Service[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function ServicesSection({ services }: ServicesSectionProps) {
    return (
        <section className="w-full py-20 md:py-32 bg-secondary/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
                    >
                        Our Services
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-3xl font-bold tracking-tighter sm:text-5xl"
                    >
                        Comprehensive Learning Solutions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                    >
                        Designed to help you succeed in your career and business with expert guidance and premium content.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-3"
                >
                    {services.map((service) => {
                        const Icon = iconMap[service.icon] || Users;

                        // Map color strings to Tailwind classes safely
                        // In a real app, you might use a more robust color mapping system
                        const colorClasses = {
                            blue: "bg-blue-500/10 text-blue-600 border-blue-500/20",
                            green: "bg-green-500/10 text-green-600 border-green-500/20",
                            purple: "bg-purple-500/10 text-purple-600 border-purple-500/20",
                        };

                        // Fallback
                        const colorClass = colorClasses[service.color as keyof typeof colorClasses] || "bg-primary/10 text-primary border-primary/20";

                        return (
                            <motion.div
                                key={service.id}
                                variants={item}
                                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-background p-8 shadow-sm transition-all hover:shadow-md border border-border hover:border-primary/50"
                            >
                                <div className="mb-4">
                                    <div className={cn("inline-flex items-center justify-center rounded-xl p-3 border w-14 h-14", colorClass)}>
                                        <Icon className="h-7 w-7" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-border flex items-center text-sm font-medium text-primary opacity-0 transform translate-x-[-10px] transition-all group-hover:opacity-100 group-hover:translate-x-0">
                                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
