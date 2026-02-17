import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

async function checkUsers() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({});
        console.log('Total users found:', users.length);
        users.forEach(user => {
            console.log(`- ${user.email} (Role: ${user.role})`);
        });

        if (users.length === 0) {
            console.log('No users found.');
        } else {
            const admin = users.find(u => u.role === 'admin');
            if (admin) {
                console.log('\nAdmin user exists:', admin.email);
            } else {
                console.log('\nNo admin user found.');
            }
        }
    } catch (error) {
        console.error('Error checking users:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkUsers();
