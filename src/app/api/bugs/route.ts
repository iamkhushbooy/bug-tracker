import { connectDB } from '@/db/connectDB';
import bugSchema from '@/db/model/bugSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { title, description, status, priority, assignedTo } = await req.json();

        await connectDB();

        const newBug = await bugSchema.create({
            title,
            description,
            status,
            priority,
            assignedTo,
        });

        return NextResponse.json({ message: 'Bug added', bug: newBug }, { status: 201 });
    } catch (error) {
        console.error('Error adding bug:', error);
        return NextResponse.json({ message: 'Error adding bug' }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connectDB();

        const bugs = await bugSchema.find();

        return NextResponse.json({ bugs }, { status: 200 });
    } catch (error) {
        console.error('Error fetching bugs:', error);
        return NextResponse.json({ message: 'Error fetching bugs' }, { status: 500 });
    }
}

