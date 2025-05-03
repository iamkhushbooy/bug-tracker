'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function AddBug() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Open');
    const [priority, setPriority] = useState('Low');
    const [assignedTo, setAssignedTo] = useState('');
    const router=useRouter();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/bugs', {
                title,
                description,
                status,
                priority,
                assignedTo,
            });

            if (response.status === 201) {
                alert('Bug added successfully!');
                setTitle('');
                setDescription('');
                setStatus('Open');
                setPriority('Low');
                setAssignedTo('');
                router.push('/')
            } else {
                alert('Failed to add bug');
            }
        } catch (error) {
            console.error('Error adding bug:', error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Bug</h2>
                <div className="space-y-4">
                    <input
                        name="title"
                        placeholder="Bug Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Bug Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        required
                    />
                    <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Closed</option>
                    </select>
                    <select
                        name="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                    <input
                        name="assignedTo"
                        placeholder="Assigned To"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        required
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Add Bug
                    </button>
                </div>
            </div>
        </div>
    );
}
