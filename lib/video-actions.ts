'use server';

import Course from '@/models/Course';
import Video from '@/models/Video';
import connectToDatabase from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const VideoSchema = z.object({
    title: z.string().min(3),
    url: z.string().url(),
    duration: z.coerce.number().min(0).optional(),
    isPreview: z.coerce.boolean().optional(),
});

export async function addVideoToCourse(courseId: string, prevState: any, formData: FormData) {
    const validatedFields = VideoSchema.safeParse({
        title: formData.get('title'),
        url: formData.get('url'),
        duration: formData.get('duration'),
        isPreview: formData.get('isPreview') === 'on',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid Video Data.',
        };
    }

    const { title, url, duration, isPreview } = validatedFields.data;

    try {
        await connectToDatabase();

        // Create Video
        const newVideo = await Video.create({
            title,
            url,
            duration: duration || 0,
            isPreview: isPreview || false,
            course: courseId,
        });

        // Add to Course
        await Course.findByIdAndUpdate(courseId, {
            $push: { videos: newVideo._id },
        });

    } catch (error) {
        return {
            message: 'Database Error: Failed to Add Video.',
        };
    }

    revalidatePath(`/admin/courses/${courseId}`);
    revalidatePath(`/courses/${courseId}`);
    return { message: 'Video added successfully!' };
}
