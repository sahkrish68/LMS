'use client';

interface VideoPlayerProps {
    url: string;
    title?: string;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
    // Simple check to see if it's a YouTube URL or direct file
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');

    if (isYouTube) {
        // Extract video ID (very basic regex for demo)
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        return (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg">
                <iframe
                    src={embedUrl}
                    title={title || 'Video player'}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg">
            <video
                src={url}
                controls
                className="h-full w-full"
                title={title}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
