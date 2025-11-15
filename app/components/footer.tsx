'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mx-auto bg-zinc-200 w-full h-24 text-center pt-10 text-sm text-gray-500">
            Data provided by the US Bureau of Labor Statistics
            <Link className="inline ml-1 text-blue-500" href="https://www.bls.gov/">bls.gov</Link>
        </footer>
    );
}