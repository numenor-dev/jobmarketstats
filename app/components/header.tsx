'use client';

export default function Header() {
    return (
        <header className="flex flex-col xl:max-w-8xl lg:max-w-6xl md:max-w-4xl sm:max-w-2xl mx-auto" >
            <h1 className="text-7xl mt-28 mx-8 text-center font-bold">
                US Jobs and Inflation Report
            </h1>

            <p className="mx-12 font-sans text-3xl my-20">
                Layoff and job creations in the US since 2010 measured against
                the Consumer Price Index (CPI) and the value of the US dollar.
            </p>
        </header>
    );
}