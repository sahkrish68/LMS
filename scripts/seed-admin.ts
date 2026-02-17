import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@example.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        const hashedPassword = await bcrypt.hash('adminpassword', 10);

        const newAdmin = new User({
            name: 'Admin User',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
        });

        await newAdmin.save();
        console.log('Admin user created via seeding script:');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: adminpassword`);

    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedAdmin();
