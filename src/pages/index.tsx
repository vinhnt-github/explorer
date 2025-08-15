import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
            <header className="w-full flex justify-center py-6 bg-white shadow">
                <nav className="flex gap-4">
                    <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Home</Link>
                    <Link href="/about" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">About</Link>
                    <Link href="/dashboard" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Dashboard</Link>
                    <Link href="/prevent-back" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Prevent Back</Link>
                </nav>
            </header>
            <h1 className="text-4xl font-bold mb-4">Home Page</h1>
        </div>
    );
}
