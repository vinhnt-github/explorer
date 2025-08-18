import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
    return { props: {} };
}

const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
            <nav className="mb-8 flex gap-4">
                <Link href="/home" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Home</Link>
                <Link href="/about" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">About</Link>
                <Link href="/dashboard" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Dashboard</Link>
                <Link href="/specific-back" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Specific Back</Link>
            </nav>
            <h1 className="text-4xl font-bold mb-4">Dashboard Page</h1>
        </div>
    );
}

export default Dashboard;
