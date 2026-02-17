import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a video title'],
            trim: true,
        },
        url: {
            type: String,
            required: [true, 'Please provide a video URL'],
        },
        duration: {
            type: Number, // in seconds
            default: 0,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        isPreview: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
