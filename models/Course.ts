import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a course title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a course description'],
            maxlength: [500, 'Description cannot be more than 500 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            default: 0,
        },
        thumbnail: {
            type: String,
            default: 'no-photo.jpg',
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        videos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Video',
            },
        ],
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
