import { NextResponse } from 'next/server';

export async function GET() {
    const services = [
        {
            id: 1,
            title: 'Video Courses',
            description: 'High-quality pre-recorded video lessons covering a wide range of topics.',
            icon: 'Video',
            color: 'blue',
        },
        {
            id: 2,
            title: 'LMS Platform',
            description: 'Track your progress, take quizzes, and earn certificates upon completion.',
            icon: 'BookOpen',
            color: 'green',
        },
        {
            id: 3,
            title: 'Expert Consultancy',
            description: 'One-on-one sessions with industry experts to guide your personal growth.',
            icon: 'Users',
            color: 'purple',
        },
    ];

    return NextResponse.json(services);
}
