import React from 'react';
import Link from 'next/link';

export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await res.json();
    return { props: { data } };
}

const About = ({ data }: { data: any }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <nav className="mb-8 flex gap-4">
            <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Home</Link>
            <Link href="/about" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">About</Link>
            <Link href="/dashboard" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Dashboard</Link>
            <Link href="/prevent-back" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Prevent Back</Link>
        </nav>
        <h1 className="text-4xl font-bold mb-4">About Page</h1>
        <p className="text-lg">User: {data.name}</p>
    </div>
);

export default About;
