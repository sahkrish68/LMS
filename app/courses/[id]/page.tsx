import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import Course from '@/models/Course';
import Video from '@/models/Video';
import VideoPlayer from '@/components/VideoPlayer';
import { Lock, PlayCircle } from 'lucide-react';
import { auth } from '@/auth';

async function getCourse(id: string) {
    try {
        await connectToDatabase();
        const course = await Course.findById(id).populate('videos').lean();
        if (!course) return null;
        return JSON.parse(JSON.stringify(course));
    } catch (error) {
        return null;
    }
}

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
    const session = await auth();
    const course = await getCourse(params.id);

    if (!course) {
        notFound();
    }

    // Check if user is enrolled - simplistic check for now
    // In a real app, you'd check User.enrolledCourses or a separate Enrollment model
    // For demo: assume enrolled if price is 0 or if user is admin (simplified)
    // Or just show previews
    const isEnrolled = false; // Placeholder logic
    const activeVideo = course.videos[0]; // Default to first video

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{course.title}</h1>
                        <p className="text-gray-500">{course.description}</p>
                    </div>

                    {activeVideo && (isEnrolled || activeVideo.isPreview) ? (
                        <div className="space-y-2">
                            <VideoPlayer url={activeVideo.url} title={activeVideo.title} />
                            <h3 className="text-xl font-semibold">{activeVideo.title}</h3>
                        </div>
                    ) : (
                        <div className="aspect-video w-full flex items-center justify-center bg-gray-900 rounded-lg text-white flex-col gap-4">
                            <Lock className="h-12 w-12" />
                            <p className="font-semibold">Enroll to watch this content</p>
                        </div>
                    )}

                    <div className="rounded-lg border bg-gray-50 p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-green-600">${course.price}</span>
                            <button className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-lg border bg-white shadow-sm">
                        <div className="border-b p-4 bg-gray-50">
                            <h3 className="font-semibold">Course Content</h3>
                        </div>
                        <div className="divide-y max-h-[500px] overflow-y-auto">
                            {course.videos && course.videos.length > 0 ? (
                                course.videos.map((video: any, index: number) => (
                                    <button
                                        key={video._id}
                                        className="flex w-full items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                                    // In a client component, this would switch the active video
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                                            {video.isPreview || isEnrolled ? <PlayCircle className="h-4 w-4 text-blue-500" /> : <Lock className="h-4 w-4" />}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {index + 1}. {video.title}
                                            </p>
                                            <p className="text-xs text-gray-500">{Math.floor(video.duration / 60)} mins</p>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-sm text-gray-500">No videos uploaded yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
