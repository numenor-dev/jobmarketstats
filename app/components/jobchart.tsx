'use client';

import GetData from '../api/getdata';
import { useState, useEffect } from 'react';
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export default function JobChart() {

    type MergedItem = { month: string; layoffs: number; creations?: number | null };

    const [mergedData, setMergedData] = useState<MergedItem[] | null>(null);
    const [showCreationData, setShowCreationData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        GetData()
            .then(({ layoffData, creationData }) => {
                const layoffs = [...layoffData].reverse();
                const creations = [...creationData].reverse();

                const merged = layoffs.map((l, i) => ({
                    month: l.month,
                    layoffs: l.layoffs,
                    creations: creations[i]?.creations ?? null,
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
            <h1 className="text-2xl font-sans mx-auto font-light mt-20 mb-16">Layoffs and job creations since 2024 in the US</h1>

            {/* Chart */}
            <div className="max-w-6xl w-screen bg-white rounded-xl px-10 py-16 shadow-lg mb-40">
                <ResponsiveContainer width="100%" aspect={2}>
                    <AreaChart responsive data={mergedData ?? []}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Area
                            type="monotone"
                            dataKey="layoffs"
                            name="Job Layoffs"
                            fill="#B34332"
                        />

                        {showCreationData && (
                            <Area
                                type="monotone"
                                dataKey="creations"
                                name="Job Creations"
                                stroke="#00b300"
                                strokeWidth={2}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>

                {/* Toggle */}
                <label className="flex mt-10 ml-10">
                    <input
                        type="checkbox"
                        checked={showCreationData}
                        onChange={() => setShowCreationData(!showCreationData)}
                    />
                    <span className="font-sans text-md ml-2">Show job creation data</span>
                </label>
            </div>
        </section>
    );
}