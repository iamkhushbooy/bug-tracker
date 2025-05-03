'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function BugList() {
    const [bugs, setBugs] = useState<{ _id: string; title: string; priority: string; status: string; assignedTo: string }[]>([]);
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
    const del = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this bug?");
        if (!confirmDelete) return;
    
        try {
            await axios.delete(`/api/bugs/${id}`);
            setBugs(prev => prev.filter(bug => bug._id !== id)); 
        } catch (err) {
            console.error('Failed to delete bug:', err);
            alert("Failed to delete the bug. Please try again.");
        }
    };
    
    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold mb-4">Bug Tracker</h1>

            <div className="mb-4 flex flex-col sm:flex-row gap-2 flex-wrap">
                <input
                    className="border px-2 py-1 rounded w-full sm:w-auto"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="border px-2 py-1 rounded w-full sm:w-auto"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
                <select
                    className="border px-2 py-1 rounded w-full sm:w-auto"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <Link
                    href="/addBug"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
                >
                    + Add Bug
                </Link>
            </div>

            <div className="hidden sm:grid grid-cols-6 font-semibold bg-gray-200 text-center p-2 rounded-t">
                <div>Title</div>
                <div>Priority</div>
                <div>Status</div>
                <div>Assigned To</div>
                <div>Actions</div>
                <div>Details</div>
            </div>

          
            {filteredBugs.length > 0 ? (
                filteredBugs.map((bug: any) => (
                    <div
                        key={bug._id}
                        className="border-b sm:border-0 sm:grid sm:grid-cols-6 text-center sm:text-left p-2 items-center sm:items-start sm:gap-2"
                    >
                      
                        <div className="block sm:hidden w-full border rounded-lg p-3 mb-3 shadow-sm">
                            <div><strong>Title:</strong> {bug.title}</div>
                            <div><strong>Priority:</strong> {bug.priority}</div>
                            <div><strong>Status:</strong> {bug.status}</div>
                            <div><strong>Assigned To:</strong> {bug.assignedTo}</div>
                            <div className="flex justify-between mt-2 text-sm">
                                <Link className="text-green-600" href={`/bug/${bug._id}/edit`}>✏️ Edit</Link>
                                <Link className="text-blue-600" href={`/bug/${bug._id}`}>🔍 View</Link>
                            </div>
                        </div>

                    
                        <div className="hidden sm:block text-center">{bug.title}</div>
                        <div className="hidden sm:block text-center">{bug.priority}</div>
                        <div className="hidden sm:block text-center">{bug.status}</div>
                        <div className="hidden sm:block text-center">{bug.assignedTo}</div>
                        <div className="hidden sm:flex justify-center gap-2">
                            <Link className="text-green-600" href={`/bug/${bug._id}/edit`}>Edit</Link>
                            <button className="text-green-600" onClick={()=>del(bug._id)}>Delete</button>
                        </div>
                        <div className="hidden sm:block text-blue-600 text-center">
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
