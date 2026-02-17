'use client';

import { useActionState } from 'react';
import { createCourse } from '@/lib/admin-actions';
import Link from 'next/link';

export default function CreateCoursePage() {
    const [state, dispatch, isPending] = useActionState(createCourse, null); // null as initial state

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
                <p className="text-muted-foreground">Fill in the details below to add a new course.</p>
            </div>

            <form action={dispatch} className="space-y-6 p-8 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Course Title</label>
                    <input
                        id="title"
                        name="title"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="e.g. Advanced Next.js Patterns"
                    />
                    {state?.errors?.title && <p className="text-sm text-red-500">{state.errors.title}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Course description..."
                    />
                    {state?.errors?.description && <p className="text-sm text-red-500">{state.errors.description}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Price ($)</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="0.00"
                    />
                    {state?.errors?.price && <p className="text-sm text-red-500">{state.errors.price}</p>}
                </div>

                <div className="flex gap-4 pt-4">
                    <Link
                        href="/admin/courses"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Create Course
                    </button>
                </div>
                {state?.message && (
                    <p className="text-sm text-red-500">{state.message}</p>
                )}
            </form>
        </div>
    );
}
