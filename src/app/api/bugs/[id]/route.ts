import { connectDB } from '@/db/connectDB';
import bugSchema from '@/db/model/bugSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest, {
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    try {
        await connectDB();
        const { id } =await params;
        const bug = await bugSchema.findById(id);

        if (!bug) {
            return NextResponse.json({ message: 'Bug not found' }, { status: 404 });
        }

        return NextResponse.json({ bug }, { status: 200 });
    } catch (error) {
        console.error('Error fetching bug:', error);
        return NextResponse.json({ message: 'Error fetching bug' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, {
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    try {
        await connectDB();
        const { id } = await params;
        const updatedData = await req.json();

        const updatedBug = await bugSchema.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBug) {
            return NextResponse.json({ message: 'Bug not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Bug updated successfully', bug: updatedBug }, { status: 200 });
    } catch (error) {
        console.error('Error updating bug:', error);
        return NextResponse.json({ message: 'Error updating bug' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, {
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    try {
        await connectDB();
        const { id } = await params;
        const dBug = await bugSchema.findByIdAndDelete(id);

        if (!dBug) {
            return NextResponse.json({ message: 'Bug not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Bug Deleted successfully', bug: dBug }, { status: 200 });
    } catch (error) {
        console.error('Error updating bug:', error);
        return NextResponse.json({ message: 'Error deleting bug' }, { status: 500 });
    }
}