import Link from 'next/link';
import connectToDatabase from '@/lib/db';
import Course from '@/models/Course';
import { deleteCourse } from '@/lib/admin-actions';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';

export default async function AdminCoursesPage() {
    await connectToDatabase();
    const courses = await Course.find({}).sort({ createdAt: -1 }).lean();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Manage Courses</h1>
                <Link
                    href="/admin/courses/create"
                    className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    <PlusCircle className="h-4 w-4" />
                    Create Course
                </Link>
            </div>

            <div className="rounded-md border bg-white">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {courses.length > 0 ? (
                                courses.map((course: any) => (
                                    <tr key={course._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{course.title}</td>
                                        <td className="p-4 align-middle">${course.price}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${course.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {course.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                {/* Edit button placeholder */}
                                                <button className="p-2 text-gray-500 hover:text-black">
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <form action={async () => {
                                                    'use server';
                                                    await deleteCourse(course._id.toString());
                                                }}>
                                                    <button className="p-2 text-red-500 hover:text-red-700">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">
                                        No courses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
