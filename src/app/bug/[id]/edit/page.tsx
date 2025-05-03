'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function EditBugPage() {
    const { id } = useParams();
    const router = useRouter();
    const [bug, setBug] = useState({
        title: '',
        priority: '',
        status: '',
        assignedTo:''
    });

    useEffect(() => {
        const fetchBug = async () => {
            try {
                const res = await axios.get(`/api/bugs/${id}`);
                setBug(res.data.bug);
            } catch (err) {
                console.error('Error fetching bug:', err);
            }
        };
        fetchBug();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBug({ ...bug, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/api/bugs/${id}`, bug);
            router.push('/');
        } catch (err) {
            console.error('Error updating bug:', err);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Bug</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    value={bug.title}
                    onChange={handleChange}
                    placeholder="Bug Title"
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <select
                    name="priority"
                    value={bug.priority}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select
                    name="status"
                    value={bug.status}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
                <input
                    name="assignedTo"
                    value={bug.assignedTo}
                    onChange={handleChange}
                    placeholder="Assigned To"
                    className="w-full border px-3 py-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Bug</button>
            </form>
        </div>
    );
}
