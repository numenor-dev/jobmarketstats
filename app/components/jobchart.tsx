'use client';

import { useState, useEffect } from 'react';
import GetData from '../api/blsdata';

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

export interface LayoffYear {
    year: string;
    layoffs?: number;
}

export interface CreationYear {
    year: string;
    creations?: number;
}

export interface CPIYear {
    year: string;
    CPI: number;
}

export interface DollarByYear {
    year: string;
    dollarValue?: number;
}

export interface DataApiResponse {
    layoffTotal: LayoffYear[];
    creationTotal: CreationYear[];
    cpiTotal: CPIYear[];
    dollarStrength?: DollarByYear[];
}

export interface MergedItem {
    year: string;
    layoffs: number;
    creations: number | null;
    cpi: number | null;
    dollars: number | null;
}

export default function JobChart() {
    const [mergedData, setMergedData] = useState<MergedItem[] | null>(null);
    const [showCreationData, setShowCreationData] = useState<boolean>(false);
    const [showCPIData, setShowCPIData] = useState<boolean>(false);
    const [showDollarData, setShowDollarData] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const toNumberOrNull = (v: unknown): number | null => {
        if (v === null || v === undefined) return null;
        const n = Number(v);
        return Number.isFinite(n) ? n : null;
    };

    useEffect(() => {
        async function load() {
            try {
                const res: DataApiResponse = await GetData();

                const layoffs = res.layoffTotal ?? [];
                const creations = res.creationTotal ?? [];
                const cpi = res.cpiTotal ?? [];
                const dollars = res.dollarStrength ?? [];

                console.log("Creations?", creations)

                const merged: MergedItem[] = layoffs.map(l => {
                    const year = l.year;
                    const creation = creations.find(c => c.year === year);
                    const cpiItem = cpi.find(c => c.year === year);
                    const dollarItem = dollars.find(d => d.year === year);


                    return {
                        year,
                        layoffs: toNumberOrNull(l.layoffs) ?? 0,
                        creations: toNumberOrNull(creation?.creations) ?? null,
                        cpi: toNumberOrNull(cpiItem?.CPI) ?? null,
                        dollars: toNumberOrNull(dollarItem?.dollarValue) ?? null
                    };
                });

                setMergedData(merged);
            } catch (err) {
                setError(String(err));
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    if (loading) {
        return <p className="mx-auto mt-20 text-lg">Loading...</p>;
    }
    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <section className="flex flex-col max-w-8xl mx-auto">
            <div className="max-w-7xl w-screen bg-white rounded-xl px-10 py-16 shadow-lg mb-40">
                <ResponsiveContainer width="100%" aspect={2}>
                    <LineChart data={mergedData ?? []}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="year" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />

                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="layoffs"
                            name="Job layoffs"
                            stroke="#ED3009"
                            strokeWidth={2}
                        />

                        {showCreationData && (
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="creations"
                                name="Job creations"
                                stroke="#3BD452"
                                strokeWidth={2}
                            />
                        )}

                        {showCPIData && (
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="cpi"
                                name="Average annual CPI"
                                stroke="#AD5C5C"
                                strokeWidth={2}
                                dot={false}
                            />
                        )}

                        {showDollarData && (
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="dollars"
                                name="US dollar value"
                                stroke="#2557CC"
                                strokeWidth={2}
                                dot={false}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>

                {/* Toggles */}
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
                        checked={showCPIData}
                        onChange={() => setShowCPIData(!showCPIData)}
                    />
                    <span className="font-sans text-md ml-2">Show Consumer Price Index</span>
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