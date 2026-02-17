export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-24">
            <div className="mx-auto max-w-3xl space-y-8">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Us</h1>
                <p className="text-lg text-gray-500">
                    We are a premier consultancy firm dedicated to empowering individuals and businesses through expert guidance and high-quality educational content.
                </p>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                    <p className="text-gray-500">
                        To provide accessible, top-tier consultancy and learning resources that foster growth, innovation, and success.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Our Team</h2>
                    <p className="text-gray-500">
                        Our team consists of industry veterans with decades of combined experience in various fields, ready to share their knowledge with you.
                    </p>
                </div>
            </div>
        </div>
    );
}
