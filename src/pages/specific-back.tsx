import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePreventBack } from '@/components/hooks//userPreveBackRewrite';

const SpecificBack = () => {
    const router = useRouter();
    usePreventBack({ shouldPreventBack: true, backUrl: '/' });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100">
            <nav className="mb-8 flex gap-4">
                <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Home</Link>
                <Link href="/about" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">About</Link>
                <Link href="/dashboard" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Dashboard</Link>
                <Link href="/prevent-back" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Prevent Back</Link>
            </nav>
            <h1 className="text-4xl font-bold mb-4">Specific Back Page</h1>
            <p className="text-lg">If you press the browser back button, this page alway back to Home (/).</p>
            <button
                className="mt-6 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                onClick={() => router.push('/dashboard')}
            >
                Go to Dashboard
            </button>
        </div>
    );
};

export default SpecificBack;
