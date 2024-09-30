import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

dotenv.config();

// Database connection function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

// Seed function
const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ designation: 'admin' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

            const admin = new User({
                firstName: process.env.ADMIN_FIRST_NAME || 'Admin',
                lastName: process.env.ADMIN_LAST_NAME || '',
                email: process.env.ADMIN_EMAIL,
                phoneNumber: process.env.ADMIN_PHONE_NUMBER,
                password: hashedPassword,
                designation: 'admin',
            });

            await admin.save();
            console.log("Admin user created successfully");
        } else {
            console.log("Admin user already exists");
        }
    } catch (error) {
        console.error("Error seeding admin user:", error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seeding process
const runSeeder = async () => {
    await connectDB();
    await seedAdmin();
};

runSeeder();


