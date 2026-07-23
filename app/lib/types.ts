import { ReactNode } from "react";

export type LayoffYear = {
    year: string;
    layoffs?: number;
}

export type CreationYear = {
    year: string;
    creations?: number;
}

export type CPIYear = {
    year: string;
    CPI: number;
}

export type DollarByYear = {
    year: string;
    dollarValue?: number;
}

export type DataApiResponse = {
    layoffTotal: LayoffYear[];
    creationTotal: CreationYear[];
    cpiTotal: CPIYear[];
    dollarStrength?: DollarByYear[];
}

export type MergedItem = {
    year: string;
    layoffs: number;
    creations: number | null;
    cpi: number | null;
    dollars: number | null;
}

export type JobChartProps = {
    isMounted: () => void;
}

export type WhyMatters = {
    title: string
    body: ReactNode
}[]

export type WhyInflation = {
    title: string
    body: ReactNode
    source: {
        label: string
        href: string
    }
}[]