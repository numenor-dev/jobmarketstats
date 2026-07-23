"use client";

export default function Header() {
    return (
        <header className="mx-auto flex flex-col max-w-7xl px-10 mb-10 md:px-20 md:mb-12">
            <h1 className="text-center tracking-tight text-2xl md:text-3xl lg:text-4xl font-bold dark:text-zinc-300 px-5">
                US Jobs and Inflation Report
                </h1>
            <p className="mt-5 mx-auto text-center text-sm md:text-base lg:text-lg dark:text-zinc-300">
                Layoff and job creations in the US since 2011 measured against the Consumer Price Index (CPI) and the value of the US dollar.
            </p>
        </header>
    );
}