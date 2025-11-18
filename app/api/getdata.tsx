'use server';

export default async function GetData() {

    const jobDataUrl = "https://api.bls.gov/publicAPI/v2/timeseries/data/";

    const exchangeRateUrl = `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_KEY}`;

    const jobRequestBody = {
        seriesid: ["LAUCN040010000000005", "LAUCN040010000000006"],
        startyear: "2010",
        endyear: "2025",
        registrationKey: process.env.JOLT_KEY
    };

    const jobRes = await fetch(jobDataUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Cache-Control": "no-store",
        },
        body: JSON.stringify(jobRequestBody),
    });

    const rateRes = await fetch(exchangeRateUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!jobRes.ok) {
        const text = await jobRes.text();
        throw new Error(`API error: ${jobRes.status} ${text}`);
    }

    if (!rateRes.ok) {
        const text = await rateRes.text();
        throw new Error(`API error: ${rateRes.status} ${text}`);
    }

    const jobData = await jobRes.json();

    const rateData = await rateRes.json();

    if (!jobData.Results?.series) {
        console.error("Unexpected BLS format:", jobData);
        return { layoffTotals: [], creationTotals: [] }
    }

    if (!rateData.Results) {
        console.error("Treasury error:", rateData)
    }

    type SeriesDatum = {
        year: string;
        value: string;
    };

    const series = jobData.Results.series;

    const layoffSeries = series.find((s: { seriesID: string }) => s.seriesID === "LAUCN040010000000005");
    const creationSeries = series.find((s: { seriesID: string }) => s.seriesID === "LAUCN040010000000006");

    if (!layoffSeries || !creationSeries) {
        throw new Error("One or both BLS series not found");
    }

    const totalByYear = (data: SeriesDatum[], field: string) => {
    const yearlyTotals: Record<string, number> = {};

    data.forEach(d => {
      const year = d.year;
      const value = Number(d.value);

      if (!Number.isFinite(value)) return;

      if (yearlyTotals[year] === undefined) yearlyTotals[year] = 0;
      yearlyTotals[year] += value;
    });

    return Object.entries(yearlyTotals)
      .map(([year, total]) => ({
        year,
        [field]: total,
      }))
      .sort((a, b) => Number(a.year) - Number(b.year));
  };

  const layoffTotal = totalByYear(layoffSeries.data, "layoffs");
  const creationTotal = totalByYear(creationSeries.data, "creations");

  return {
    layoffTotal,
    creationTotal,
    rateData
  };
}