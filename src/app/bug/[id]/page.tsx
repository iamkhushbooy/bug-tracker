import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function BugDetails({ params }: { params: { id: string } }) {
    try {
        const res = await fetch(`http://localhost:3000/api/bugs/${params.id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            return notFound();
        }

        const data = await res.json();
        const bug = data.bug;

        if (!bug) return notFound();

        return (
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6"> Bug Details</h1>
                <div className="space-y-3 bg-white p-4 rounded-lg shadow">
                    <p><strong>Title:</strong> {bug.title}</p>
                    <p><strong>Description:</strong> {bug.description}</p>
                    <p><strong>Status:</strong> {bug.status}</p>
                    <p><strong>Priority:</strong> {bug.priority}</p>
                    <p><strong>Assigned To:</strong> {bug.assignedTo}</p>
                </div>

                <div className="mt-6">
                    <Link href="/">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                            ⬅ Back to Bugs
                        </button>
                    </Link>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Failed to fetch bug:', error);
        return notFound();
    }
}
