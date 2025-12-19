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

type JobChartProps = {
    isMounted: () => void;
}

export default function JobChart({ isMounted }: JobChartProps) {
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
                isMounted();
                setLoading(false);
            }
        }

        load();
    }, [isMounted]);

    if (loading) {
        return <div role="status" className="mx-auto mb-24">
            <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="lightgray" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>;
    }
    if (error) {
        return <div className="mb-20 text-red-500">Error: {error}</div>;
    }

    return (
        <section className="flex flex-col max-w-8xl md:mx-auto sm:mx-10">
            <div className="xl:max-w-7xl lg:max-w-5xl lg:px-10 md:max-w-3xl md:px-4 md:py-12 sm:max-w-xl w-screen bg-white py-6 rounded-xl shadow-lg mb-14">
                <ResponsiveContainer width="100%" aspect={1.7}>
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
                <div className="flex md:flex-row flex-col md:items-center md:mt-6 mt-3">
                    <label className="md:mx-auto mt-10 ml-12">
                        <input
                            type="checkbox"
                            checked={showCreationData}
                            onChange={() => setShowCreationData(!showCreationData)}
                        />
                        <span className="font-sans text-lg ml-2">Show job creations</span>
                    </label>

                    <label className="md:mx-auto mt-7 ml-12">
                        <input
                            type="checkbox"
                            checked={showCPIData}
                            onChange={() => setShowCPIData(!showCPIData)}
                        />
                        <span className="font-sans text-lg ml-2">Show Consumer Price Index</span>
                    </label>

                    <label className="md:mx-auto mt-7 ml-12">
                        <input
                            type="checkbox"
                            checked={showDollarData}
                            onChange={() => setShowDollarData(!showDollarData)}
                        />
                        <span className="font-sans text-lg ml-2">Show US dollar value</span>
                    </label>
                </div>
            </div>
        </section>
    );
}