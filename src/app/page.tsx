'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function BugList() {
    const [bugs, setBugs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    useEffect(() => {
        const fetchBugs = async () => {
            try {
                const res = await axios.get('/api/bugs');
                setBugs(res.data.bugs);
            } catch (err) {
                console.error('Error fetching bugs:', err);
            }
        };

        fetchBugs();
    }, []);

    const filteredBugs = bugs.filter((bug: any) => {
        const matchesTitle = bug.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter ? bug.status === statusFilter : true;
        const matchesPriority = priorityFilter ? bug.priority === priorityFilter : true;
        return matchesTitle && matchesStatus && matchesPriority;
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bug Tracker</h1>

            <div className="mb-4 flex gap-2 flex-wrap">
                <input
                    className="border px-2 py-1 rounded"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="border px-2 py-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
                <select
                    className="border px-2 py-1"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <Link href="/add" className="ml-auto bg-blue-500 text-white px-4 py-2 rounded">
                    + Add Bug
                </Link>
            </div>

            <div className="grid grid-cols-6 font-semibold bg-gray-200 text-center p-2 rounded-t">
                <div>Title</div>
                <div>Priority</div>
                <div>Status</div>
                <div>Assigned To</div>
                <div>Actions</div>
                <div>Details</div>
            </div>

            {filteredBugs.length > 0 ? (
                filteredBugs.map((bug: any) => (
                    <div key={bug._id} className="grid grid-cols-6 border-b text-center p-2 items-center">
                        <div>{bug.title}</div>
                        <div>{bug.priority}</div>
                        <div>{bug.status}</div>
                        <div>{bug.assignedTo}</div>
                        <div className="flex justify-center gap-2">
                            <Link className="text-green-600" href={`/bug/${bug._id}/edit`}>Edit</Link>
                            {/* Add delete button functionality if needed */}
                        </div>
                        <div className="text-blue-600">
                            <Link href={`/bug/${bug._id}`}>View Details</Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-4 border">No bugs found.</div>
            )}
        </div>
    );
}
