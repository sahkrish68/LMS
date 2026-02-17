import connectToDatabase from '@/lib/db';
import Course from '@/models/Course';
import { notFound } from 'next/navigation';
import AddVideoForm from '@/components/AddVideoForm'; // Need to create this component
import { Video, PlayCircle } from 'lucide-react';

async function getCourseWithVideos(id: string) {
    try {
        await connectToDatabase();
        const course = await Course.findById(id).populate('videos').lean();
        if (!course) return null;
        return JSON.parse(JSON.stringify(course));
    } catch (error) {
        return null;
    }
}

export default async function ManageCoursePage({ params }: { params: { id: string } }) {
    const course = await getCourseWithVideos(params.id);

    if (!course) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Manage Course: {course.title}</h1>
                <p className="text-gray-500">Add content and manage settings for this course.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
                            <Video className="h-5 w-5" />
                            Add New Video
                        </h2>
                        <AddVideoForm courseId={course._id} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-lg border bg-white shadow-sm">
                        <div className="border-b p-4 bg-gray-50">
                            <h3 className="font-semibold">Course Content</h3>
                        </div>
                        <div className="divide-y">
                            {course.videos && course.videos.length > 0 ? (
                                course.videos.map((video: any, index: number) => (
                                    <div key={video._id} className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <p className="font-medium text-sm">{video.title}</p>
                                                <p className="text-xs text-gray-500">{video.duration}s {video.isPreview && '• Preview'}</p>
                                            </div>
                                        </div>
                                        {/* Delete logic could go here */}
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-sm text-gray-500">No videos yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
