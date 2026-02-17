'use client';

import { useActionState } from 'react';
import { createCourse } from '@/lib/admin-actions';
import Link from 'next/link';

export default function CreateCoursePage() {
    const [state, dispatch, isPending] = useActionState(createCourse, null); // null as initial state

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Create New Course</h1>
                <p className="text-gray-500">Fill in the details below to add a new course.</p>
            </div>

            <form action={dispatch} className="space-y-6 p-6 border rounded-lg bg-white">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Course Title</label>
                    <input
                        id="title"
                        name="title"
                        required
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
                        placeholder="e.g. Advanced Next.js Patterns"
                    />
                    {state?.errors?.title && <p className="text-sm text-red-500">{state.errors.title}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        className="flex min-h-[120px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
                        placeholder="Course description..."
                    />
                    {state?.errors?.description && <p className="text-sm text-red-500">{state.errors.description}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium">Price ($)</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
                        placeholder="0.00"
                    />
                    {state?.errors?.price && <p className="text-sm text-red-500">{state.errors.price}</p>}
                </div>

                <div className="flex gap-4 pt-4">
                    <Link
                        href="/admin/courses"
                        className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
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
