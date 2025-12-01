
export default function MoreInfo() {

    return (
        <div>
            <h1 className="font-sans text-3xl mt-10">This chart visualizes four major economic indicators in the US from 2010 to 2025:</h1>

            <h2 className="font-sans text-2xl mt-10 text-red-600">1. Job layoffs:</h2>
            <p className="mt-3 font-sans text-lg">
                This line shows the total number of layoffs each year based on Bureau of Labor Statistics (BLS) data.
                Higher points represent years when more people lost jobs, often coinciding with major economic downturns (e.g., recessions, market corrections, global events).
            </p>
            <h2 className="font-sans text-2xl mt-10 text-green-600">2. Job creations:</h2>
            <p className="mt-3 font-sans text-lg">
                This line represents the total number of new jobs added each year.
                Tracking job creation alongside layoffs gives a clearer picture of whether the labor market is expanding or contracting.
            </p>
            <h2 className="font-sans text-2xl mt-10 text-amber-900">3. Consumer Price Index (CPI), normalized:</h2>
            <p className="mt-3 font-sans text-lg">
                The CPI line reflects inflation, showing how the cost of goods and services has changed over time.
                The values are normalized between 0 and 1 so they can appear on the same chart without being overshadowed by layoff/creation numbers.
                A rising CPI indicates increasing living costs (inflation).
            </p>
            <h2 className="font-sans text-2xl mt-10 text-blue-600">4. Dollar Value Over Time:</h2>
            <p className="mt-3 font-sans text-lg">
                This line tracks the relative strength of the U.S. dollar using CPI values, with 2010 set as the baseline.
                Values above 1 mean the dollar was stronger than in 2010; values below 1 mean it had less purchasing power.
            </p>

            <h2 className="font-sans text-2xl mt-10">Why These Indicators Matter Together:</h2>

            <p className="mt-3 font-sans text-lg">
                Layoffs vs. Creations:
                Comparing both shows whether the economy is gaining or losing overall employment.

                Inflation’s Role:
                CPI helps explain why job numbers alone don’t tell the full story—higher wages don’t help much if prices rise faster.

                Dollar Strength:
                Shows how much purchasing power the average consumer has lost or gained over the years.

                Full Economic Context:
                When viewed together, these indicators reveal how the labor market and inflation interact to shape real economic conditions for workers.
            </p>
        </div>
    )
}