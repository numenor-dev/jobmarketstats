'use server';

export default async function GetData() {
    
    const jobDataUrl = "https://api.bls.gov/publicAPI/v2/timeseries/data/";

    const requestBody = {
        seriesid: ["LAUCN040010000000005", "LAUCN040010000000006"],
        startyear: "2024",
        endyear: "2025",
        registrationKey: process.env.JOLT_KEY
    };

    const res = await fetch(jobDataUrl, {
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
        throw new Error(`API error: ${res.status} ${text}`);
    }

    const data = await res.json();

    if (!data.Results || !data.Results.series) {
        console.error("BLS error:", data);
    }

    type SeriesDatum = {
        periodName: string;
        year: string;
        value: string;
    };

    const series = data.Results.series;

    const layoffSeries = series.find((s: { seriesID: string }) => s.seriesID === "LAUCN040010000000005");
    const creationSeries = series.find((s: { seriesID: string }) => s.seriesID === "LAUCN040010000000006");

    const layoffData = layoffSeries.data.map((d: SeriesDatum) => ({
        month: `${d.periodName} ${d.year}`,
        layoffs: Number(d.value),
    }));

    const creationData = creationSeries.data.map((d: SeriesDatum) => ({
        month: `${d.periodName} ${d.year}`,
        creations: Number(d.value),
    }));


    return {
        layoffData,
        creationData
    }
}