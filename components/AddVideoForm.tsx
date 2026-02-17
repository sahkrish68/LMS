'use client';

import { useActionState } from 'react';
import { addVideoToCourse } from '@/lib/video-actions';
import { useRef } from 'react';

export default function AddVideoForm({ courseId }: { courseId: string }) {
    const addVideoWithId = addVideoToCourse.bind(null, courseId);
    const [state, dispatch, isPending] = useActionState(addVideoWithId, null);
    const formRef = useRef<HTMLFormElement>(null);

    if (state?.message === 'Video added successfully!') {
        formRef.current?.reset();
    }

    return (
        <form ref={formRef} action={dispatch} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Video Title</label>
                <input
                    id="title"
                    name="title"
                    required
                    className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                    placeholder="Video Title"
                />
                {state?.errors?.title && <p className="text-xs text-red-500">{state.errors.title}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium">Video URL (YouTube or Direct)</label>
                <input
                    id="url"
                    name="url"
                    required
                    className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                    placeholder="https://..."
                />
                {state?.errors?.url && <p className="text-xs text-red-500">{state.errors.url}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="duration" className="text-sm font-medium">Duration (sec)</label>
                    <input
                        id="duration"
                        name="duration"
                        type="number"
                        className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                        placeholder="0"
                    />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                    <input type="checkbox" id="isPreview" name="isPreview" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="isPreview" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Free Preview
                    </label>
                </div>
            </div>

            <button
                type="submit"
                className="inline-flex h-9 w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            >
                Add Video
            </button>
            {state?.message && (
                <p className={`text-xs ${state.message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{state.message}</p>
            )}
        </form>
    );
}
