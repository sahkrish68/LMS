import Link from 'next/link';
import connectToDatabase from '@/lib/db';
import Course from '@/models/Course';
import { BookOpen } from 'lucide-react';

async function getCourses() {
    await connectToDatabase();
    // We need to jsonify the result because Mongoose documents contain non-serializable data
    const courses = await Course.find({ isPublished: true }).lean();
    return JSON.parse(JSON.stringify(courses));
}

export default async function CoursesPage() {
    const courses = await getCourses();

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Available Courses</h1>
                <p className="text-gray-500">Explore our library of premium courses designed to elevate your skills.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {courses.length > 0 ? (
                    courses.map((course: any) => (
                        <Link key={course._id} href={`/courses/${course._id}`} className="group block overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                            <div className="aspect-video w-full bg-gray-200 object-cover relative flex items-center justify-center text-gray-400">
                                {/* Placeholder for thumbnail */}
                                <BookOpen className="h-10 w-10 opacity-50" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold group-hover:underline decoration-2 underline-offset-4">{course.title}</h3>
                                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{course.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="font-bold text-green-600">${course.price}</span>
                                    <span className="text-xs text-gray-400">View Details</span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        <p className="text-lg">No courses available at the moment.</p>
                        <p className="text-sm">Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
