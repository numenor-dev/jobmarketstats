'use server';

export default async function GetData() {
    const url = "https://api.bls.gov/publicAPI/v2/timeseries/data/";

    const requestBody = {
        seriesid: ["LAUCN040010000000005", "LAUCN040010000000006", "CUUR0000SA0L1E"],
        startyear: "2010",
        endyear: "2025",
        registrationKey: process.env.JOLT_KEY
    };

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Cache-Control": "no-store",
        },
        body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`BLS API error: ${res.status} ${text}`);
    }

    const data = await res.json();

    if (!data.Results?.series) {
        console.error("Unexpected BLS response format:", data);
        return { layoffTotal: [], creationTotal: [], cpiTotal: [] };
    }

    type SeriesDatum = {
        year: string;
        value: string;
    };

    type BlsDatum = {
        year: string;
        value: string;
    }

    type CPIByYear = {
        year: string;
        CPI: number;
    }

    const series = data.Results.series;

    const layoffSeries = series.find(
        (s: { seriesID: string }) => s.seriesID === "LAUCN040010000000005");
    const creationSeries = series.find(
        (s: { seriesID: string }) => s.seriesID === "LAUCN040010000000006");
    const consumerSeries = series.find(
        (s: { seriesID: string }) => s.seriesID === "CUUR0000SA0L1E");

    if (!layoffSeries || !creationSeries || !consumerSeries) {
        throw new Error("One or more BLS series not found");
    }

    const totalByYear = (data: SeriesDatum[], field: string) => {
        const yearlyTotals: Record<string, number> = {};

        data.forEach(d => {
            const year = d.year;
            const value = Number(d.value);
            if (!Number.isFinite(value)) return;

            if (!yearlyTotals[year]) yearlyTotals[year] = 0;
            yearlyTotals[year] += value;
        });

        return Object.entries(yearlyTotals)
            .map(([year, total]) => ({ year, [field]: total }))
            .sort((a, b) => Number(a.year) - Number(b.year));
    };

    const cpiByYear = (data: BlsDatum[]): CPIByYear[] => {
        const yearly: Record<string, number[]> = {};

        data.forEach(d => {
            const year = d.year;
            const value = Number(d.value);
            if (!Number.isFinite(value)) return;

            if (!yearly[year]) yearly[year] = [];
            yearly[year].push(value);
        });

        return Object.entries(yearly)
            .map(([year, values]) => ({
                year,
                CPI: values.reduce((a, b) => a + b, 0) / values.length
            }))
            .sort((a, b) => Number(a.year) - Number(b.year));
    };

    const normalizeCPI = (cpiSeries: CPIByYear[]) => {
        const values = cpiSeries.map(c => c.CPI);
        const min = Math.min(...values);
        const max = Math.max(...values);

        return cpiSeries.map(c => ({
            year: c.year,
            CPI: (c.CPI - min) / (max - min)
        }));
    }

    const dollarValueOverTime = (cpiSeries: CPIByYear[], baseYear: string) => {
        const base = cpiSeries.find(d => d.year === baseYear);

        if (!base) {
            throw new Error(`Base CPI year ${baseYear} not found in data`);
        }

        const baseCpi = base.CPI;

        return cpiSeries.map(d => ({
            year: d.year,
            dollarValue: baseCpi / d.CPI
        }));
    };

    const layoffTotal = totalByYear(layoffSeries.data, "layoffs");
    const creationTotal = totalByYear(creationSeries.data, "creations");
    const trueCpi = cpiByYear(consumerSeries.data);
    const cpiTotal = normalizeCPI(trueCpi);
    const dollarStrength = dollarValueOverTime(trueCpi, "2010")

    return {
        layoffTotal,
        creationTotal,
        cpiTotal,
        dollarStrength
    };
}