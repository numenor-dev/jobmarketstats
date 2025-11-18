'use client';

import GetData from '../api/getdata';
import { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export default function JobChart() {

    type MergedItem = { year: string; layoffs: number; creations?: number | null };

    const [mergedData, setMergedData] = useState<MergedItem[] | null>(null);
    const [showCreationData, setShowCreationData] = useState(false);
    const [showDollarData, setShowDollarData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        GetData()
            .then(({ layoffTotal, creationTotal, rateData }) => {
                const layoffs = Array.isArray(layoffTotal) ? layoffTotal : [];
                const creations = Array.isArray(creationTotal) ? creationTotal : [];

                const toNumberOrNull = (v: string | number | null | undefined) => {
                    if (v == null) return null;
                    const n = Number(v);
                    return Number.isFinite(n) ? n : null;
                };

                const usdRate = rateData?.rates?.USD ?? null;

                const merged = layoffs.map((l, i) => ({
                    year: String(l.year),
                    layoffs: (() => {
                        const n = Number(l.layoffs);
                        return Number.isFinite(n) ? n : 0;
                    })(),
                    creations: toNumberOrNull(creations[i]?.creations ?? null),
                    usdValue: usdRate
                }));

                setMergedData(merged);
                setLoading(false);
            })
            .catch(err => {
                setError(String(err));
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="mx-auto mt-20 text-lg">Loading...</p>;

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <section className="flex flex-col max-w-8xl mx-auto">
            <h1 className="text-2xl font-sans mx-auto font-light mt-20 mb-16">Layoffs and job creations since 2010 in the US</h1>

            {/* Chart */}
            <div className="max-w-6xl w-screen bg-white rounded-xl px-10 py-16 shadow-lg mb-40">
                <ResponsiveContainer width="100%" aspect={2}>
                    <LineChart responsive data={mergedData ?? []}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="layoffs"
                            name="Job Layoffs"
                            stroke="red"
                            strokeWidth={2}
                        />

                        {showCreationData && (
                            <Line
                                type="monotone"
                                dataKey="creations"
                                name="Job Creations"
                                stroke="#00b300"
                                strokeWidth={2}
                            />
                        )}
                        {showDollarData && (
                            <Line
                                type="monotone"
                                dataKey="usdValue"
                                name="USD Value"
                                stroke="#0077ff"
                                strokeWidth={2}
                                dot={false}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>

                {/* Toggle */}
                <label className="flex w-56 mt-10 ml-10">
                    <input
                        type="checkbox"
                        checked={showCreationData}
                        onChange={() => setShowCreationData(!showCreationData)}
                    />
                    <span className="font-sans text-md ml-2">Show job creations</span>
                </label>
                <label className="flex w-56 mt-7 ml-10">
                    <input
                        type="checkbox"
                        checked={showDollarData}
                        onChange={() => setShowDollarData(!showDollarData)}
                    />
                    <span className="font-sans text-md ml-2">Show US dollar value</span>
                </label>
            </div>
        </section>
    );
}