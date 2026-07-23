'use client';

import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";
import { WhyInflation, WhyMatters } from "../lib/types";
import { chartColors } from "./jobchart";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const indicators = [
    {
        num: "01",
        title: "Job layoffs",
        body: "This line shows the total number of layoffs each year based on Bureau of Labor Statistics (BLS) data. Higher points represent years when more people lost jobs, often coinciding with major economic downturns (e.g., recessions, market corrections, global events)."
    },
    {
        num: "02",
        title: "Job creations",
        body: "This line represents the total number of new jobs added each year. Tracking job creation alongside layoffs gives a clearer picture of whether the labor market is expanding or contracting."
    },
    {
        num: "03",
        title: "Consumer Price Index (CPI), normalized",
        body: "The CPI line reflects inflation, showing how the cost of goods and services has changed over time. The values are normalized between 0 and 1 so it can be displayed here alongside the job data. A rising CPI indicates increasing inflation."
    },
    {
        num: "04",
        title: "Dollar Value",
        body: "This line tracks the relative strength of the U.S. dollar using CPI values, with 2011 set as the baseline. Values above 1 mean the dollar was stronger than in 2011; values below 1 mean it lost value."
    }
];

const whyMatters: WhyMatters = [
    {
        title: "Layoffs vs. creations",
        body: "Comparing both shows whether the economy is gaining or losing overall employment. If job creation is equal to or less than job layoffs, it indicates a shrinking job market and underlying economic issues."
    },
    {
        title: "Inflation's role",
        body: (
            <>

                CPI helps illustrate the true mathematical level of{" "}

                <a href="https://www.bls.gov/data/inflation_calculator.htm"
                    className="underline text-red-700 dark:text-red-500/90 text-sm">

                    inflation
                </a>
                , which affects purchasing power.Even if jobs are created, high inflation will
                counteract real income and savings.If a person received an annual raise of 4 % but
                inflation is at 6 %, their real income effectively decreased by 2 %.
            </>
        )
    },
    {
        title: "Dollar value",
        body: "Measuring the dollar value over time shows how much purchasing power an individual has lost. Since 2011, the U.S. dollar has lost roughly 30-35% of its purchasing power - $100 in 2011 is worth about $65 today."
    }
];

const whyInflation: WhyInflation = [
    {
        title: "Excessive money creation by central banks",
        body: "When the total amount of money grows faster than the production of goods and services, more dollars compete for the same amount of goods. Since 2011, over $10 trillion has been created physically and digitally - it took over 200 years to create the first $12 trillion.",
        source: { label: "Federal Reserve Economic Data (FRED)", href: "https://fred.stlouisfed.org/series/M2SL" }
    },
    {
        title: "Increased government spending",
        body: "High amounts of government spending can force the government to borrow when it exceeds revenue earned that year. This contributes to inflation and higher overall debt.",
        source: { label: "MIT Sloan School of Management", href: "https://mitsloan.mit.edu/ideas-made-to-matter/federal-spending-was-responsible-2022-spike-inflation-research-shows" }
    },
    {
        title: "Tariffs and trade restrictions",
        body: "Tariffs raise the cost of imported goods and raw materials. Businesses pass these higher costs on to consumers, increasing prices across multiple industries.",
        source: { label: "Federal Reserve Bank of San Francisco", href: "https://www.frbsf.org/research-and-insights/publications/economic-letter/2025/05/effects-of-tariffs-on-inflation-and-production-costs/" }
    },
    {
        title: "Wars",
        body: "Wars disrupt global supply chains, reduce production, increase energy and food costs, and require significant government spending - these combined pressures often lead to higher inflation both domestically and globally.",
        source: { label: "University of Gothenburg", href: "https://www.gu.se/en/news/war-and-conflict-often-lead-to-high-inflation" }
    }
];

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <div className="mt-16 mb-8">
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
            />
            <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-700 dark:text-zinc-400">
                {children}
            </h2>
        </div>
    );
}

const indicatorColors = [
    chartColors.layoffs,
    chartColors.creations,
    chartColors.cpi,
    chartColors.dollars
]

export default function MoreInfo() {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useInView(ref, { once: true, amount: 0.2 });

    return (
        <div ref={ref} className="flex flex-col">

            {/* Indicator cards */}
            <div className="mt-10 flex flex-col gap-3">
                {indicators.map((item, i) => {
                    const color = indicatorColors[i];
                    return (
                        <motion.div
                            key={item.num}
                            initial={{ opacity: 0, y: 16 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + i * 0.2, duration: 0.45, ease: "easeOut" }}
                            className="relative rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-md"
                        >
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={isVisible ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.45, ease: "easeOut" }}
                                style={{ backgroundColor: color, transformOrigin: "left" }}
                                className="h-0.5 w-full"
                            />
                            <div className="flex gap-4 p-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span
                                            className="w-2 h-2 rounded-full shrink-0"
                                            style={{ backgroundColor: color }}
                                        />
                                        <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-200">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {item.body}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <SectionLabel>Why do these indicators matter together?</SectionLabel>
            <div className="flex flex-col gap-3">
                {whyMatters.map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: i * 0.09, duration: 0.6, ease: "easeOut" }}
                        className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-5 py-4"
                    >
                        <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-200 mb-1">
                            {item.title}
                        </h3>
                        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {item.body}
                        </p>
                    </motion.div>
                ))}
            </div>

            <SectionLabel>Why does inflation occur?</SectionLabel>
            <div className="flex flex-col gap-6">
                {whyInflation.map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="relative pl-5"
                    >
                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                            style={{ transformOrigin: "top" }}
                            className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-emerald-400 dark:bg-emerald-500"
                        />
                        <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-300 mb-1">
                            {item.title}
                        </h3>
                        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {item.body}
                        </p>
                        {item.source && (

                            <a href={item.source.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-2 text-xs text-sky-700 dark:text-sky-400 hover:underline"
                            >
                                <ArrowUpRightIcon className="size-3" />
                                <span>{item.source.label}</span>
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </div >
    );
}