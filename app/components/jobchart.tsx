'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useWindowSize } from '../hooks/useWindowSize';
import { toNumberOrNull, numberFormatter } from '../utils/formatters';
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis,
    Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { DataApiResponse, JobChartProps, MergedItem } from '../lib/types';
import LoadingRipple from './ui/ripple';

export const chartColors = {
    layoffs: '#FF0000',
    creations: '#3BD452',
    cpi: '#E8A70E',
    dollars: '#2557CC',
} as const;

function DataToggle({
    label,
    checked,
    color,
    onChange,
}: {
    label: string;
    checked: boolean;
    color: string;
    onChange: () => void;
}) {
    return (
        <button
            onClick={onChange}
            aria-pressed={checked}
            className="flex items-center gap-3 group cursor-pointer"
        >
            <div
                style={{
                    width: 40,
                    height: 22,
                    borderRadius: 22,
                    padding: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: checked ? 'flex-end' : 'flex-start',
                    border: `1.5px solid ${checked ? color : '#9ca3af'}`,
                    backgroundColor: checked ? `${color}22` : 'transparent',
                    transition: 'border-color 0.2s, background-color 0.2s',
                    flexShrink: 0,
                }}
            >
                <motion.div
                    layout
                    transition={{ type: 'spring', visualDuration: 0.2, bounce: 0.2 }}
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: checked ? color : '#9ca3af',
                        transition: 'background-color 0.2s',
                    }}
                />
            </div>

            {/* Label with colored dot */}
            <div className="flex items-center gap-2">
                <span
                    className="w-2 h-2 rounded-full shrink-0 transition-opacity duration-200"
                    style={{ backgroundColor: color, opacity: checked ? 1 : 0.35 }}
                />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                    {label}
                </span>
            </div>
        </button>
    );
}

export default function JobChart({ isMounted }: JobChartProps) {
    const [mergedData, setMergedData] = useState<MergedItem[] | null>(null);
    const [showCreationData, setShowCreationData] = useState(false);
    const [showCPIData, setShowCPIData] = useState(false);
    const [showDollarData, setShowDollarData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { isMobile, isTablet } = useWindowSize();
    const { resolvedTheme } = useTheme();
    const prefersDark = resolvedTheme === 'dark';

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/api/blsdata');
                const data: DataApiResponse = await res.json();

                const layoffs = data.layoffTotal ?? [];
                const creations = data.creationTotal ?? [];
                const cpi = data.cpiTotal ?? [];
                const dollars = data.dollarStrength ?? [];

                const merged: MergedItem[] = layoffs.map(l => ({
                    year: l.year,
                    layoffs: toNumberOrNull(l.layoffs) ?? 0,
                    creations: toNumberOrNull(creations.find(c => c.year === l.year)?.creations) ?? null,
                    cpi: toNumberOrNull(cpi.find(c => c.year === l.year)?.CPI) ?? null,
                    dollars: toNumberOrNull(dollars.find(d => d.year === l.year)?.dollarValue) ?? null,
                }));

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
        return (
            <div role="status" className="min-h-screen">
                <LoadingRipple />
            </div>
        );
    }

    if (error) {
        return <div className="mb-20 text-red-500">Error: {error}</div>;
    }

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="w-full bg-white dark:bg-sky-950/90 rounded-xl shadow-lg px-3 py-5 sm:px-6 sm:py-8 md:px-10 md:py-10 mb-14">
                <ResponsiveContainer width="100%" height={isMobile ? 260 : 520}>
                    <LineChart
                        data={mergedData ?? []}
                        margin={{
                            top: 5,
                            left: isMobile ? -10 : 20,
                            bottom: 5,
                            right: isMobile ? 0 : 10,
                        }}
                    >
                        <CartesianGrid
                            stroke={prefersDark ? '#75909C' : '#0C171A'}
                            strokeWidth={0.2}
                        />
                        <XAxis
                            dataKey="year"
                            angle={-45}
                            textAnchor="end"
                            height={55}
                            tick={{ fontSize: isMobile ? 10 : 13, fill: prefersDark ? '#cbd5e1' : '#666' }}
                            interval={isMobile ? 4 : isTablet ? 2 : 1}
                        />
                        <YAxis
                            yAxisId="left"
                            width={isMobile ? 38 : 50}
                            tick={{ fontSize: isMobile ? 10 : 13, fill: prefersDark ? '#cbd5e1' : '#666' }}
                            tickFormatter={(value) =>
                                isMobile
                                    ? `${(value / 1000).toFixed(0)}k`
                                    : numberFormatter.format(value)
                            }
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            width={isMobile ? 22 : 35}
                            tick={{ fontSize: isMobile ? 10 : 13, fill: prefersDark ? '#cbd5e1' : '#666' }}
                        />
                        <Tooltip
                            formatter={(value) =>
                                typeof value === 'number' ? numberFormatter.format(value) : value
                            }
                            wrapperStyle={{ fontSize: isMobile ? '11px' : '13px' }}
                            contentStyle={{
                                backgroundColor: prefersDark ? '#1e293b' : '#fff',
                                borderColor: prefersDark ? '#475569' : '#e2e8f0',
                                color: prefersDark ? '#f1f5f9' : '#111',
                                borderRadius: '8px',
                            }}
                        />
                        <Legend
                            wrapperStyle={{
                                fontSize: isMobile ? '11px' : '13px',
                                color: prefersDark ? '#cbd5e1' : '#666',
                                paddingTop: isMobile ? '8px' : '12px',
                            }}
                        />
                        <Line yAxisId="left" type="monotone" dataKey="layoffs" name="Job layoffs" stroke={chartColors.layoffs} strokeWidth={2} dot={false} />
                        {showCreationData && (
                            <Line yAxisId="left" type="monotone" dataKey="creations" name="Job creations" stroke={chartColors.creations} strokeWidth={2} dot={false} />
                        )}
                        {showCPIData && (
                            <Line yAxisId="right" type="monotone" dataKey="cpi" name="Average annual CPI" stroke={chartColors.cpi} strokeWidth={2} dot={false} />
                        )}
                        {showDollarData && (
                            <Line yAxisId="right" type="monotone" dataKey="dollars" name="US dollar value" stroke={chartColors.dollars} strokeWidth={2} dot={false} />
                        )}
                    </LineChart>
                </ResponsiveContainer>

                {/* Toggles */}
                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-700/50">
                    <p className="text-xs font-mono tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500 mb-4">
                        Add to chart
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <DataToggle label="Job creations" checked={showCreationData} color={chartColors.creations} onChange={() => setShowCreationData(v => !v)} />
                        <DataToggle label="Consumer Price Index" checked={showCPIData} color={chartColors.cpi} onChange={() => setShowCPIData(v => !v)} />
                        <DataToggle label="US dollar value" checked={showDollarData} color={chartColors.dollars} onChange={() => setShowDollarData(v => !v)} />
                    </div>
                </div>
            </div>
        </section>
    );
}