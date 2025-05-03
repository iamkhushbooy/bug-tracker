'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BugDetails() {
    const params = useParams();
    const id = params.id as string;
    const [bug, setBug] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBug = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/bugs/${id}`);
                if (!res.ok) {
                    setError(`Error: ${res.status}`);
                    return;
                }

                const data = await res.json();
                if (!data.bug) {
                    setError('Bug not found');
                    return;
                }

                setBug(data.bug);
            } catch (err) {
                console.error('Failed to fetch bug:', err);
                setError('Network error');
            }
        };

        fetchBug();
    }, [id]);

    if (error) {
        return (
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Error</h1>
                <p className="text-red-600">{error}</p>
                <Link href="/">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4">
                        ⬅ Back to Bugs
                    </button>
                </Link>
            </div>
        );
    }

    if (!bug) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Bug Details</h1>
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
}
