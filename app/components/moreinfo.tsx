import { motion } from "framer-motion";

type MoreInfoProps = {
    visible: boolean;
};

export default function MoreInfo({ visible }: MoreInfoProps) {

    const style = {
        text: "mt-3 font-sans text-lg"
    };

    return (
        <div className="flex flex-col md:mx-auto mx-5">
            {visible && (
                <motion.h1
                    key="moreinfo"
                    className="relative font-sans p-2 rounded-md text-3xl mt-10 overflow-hidden"
                >
                    <motion.span
                        initial={{
                            scaleX: 0,
                            y: 2,
                            rotate: -0.8
                        }}
                        animate={{
                            scaleX: 1,
                            y: [2, -1, 1, 0],
                            rotate: [-0.5, 0.3, -0.2, 0]
                        }}
                        transition={{
                            scaleX: { duration: 1.6, ease: "easeOut" },
                            y: { duration: 1.6, ease: "easeInOut" },
                            rotate: { duration: 1.6, ease: "easeInOut" }
                        }}
                        className="
                            absolute inset-0
                            bg-yellow-400/45
                            rounded-[6px_10px_8px_12px]
                            skew-y-1
                            z-0
                        "
                        style={{ transformOrigin: "left" }}
                    />
                    <span className="relative z-10">
                        This chart visualizes four major economic indicators in the US from 2010 to 2025:
                    </span>
                </motion.h1>
            )}

            <h2 className="font-sans text-2xl mt-10 text-red-600">1. Job layoffs:</h2>
            <p className={style.text}>
                This line shows the total number of layoffs each year based on Bureau of Labor Statistics (BLS) data.
                Higher points represent years when more people lost jobs, often coinciding with major economic downturns (e.g., recessions, market corrections, global events).
            </p>

            <h2 className="font-sans text-2xl mt-10 text-green-600">2. Job creations:</h2>
            <p className={style.text}>
                This line represents the total number of new jobs added each year.
                Tracking job creation alongside layoffs gives a clearer picture of whether the labor market is expanding or contracting.
            </p>

            <h2 className="font-sans text-2xl mt-10 text-amber-900">3. Consumer Price Index (CPI), normalized:</h2>
            <p className={style.text}>
                The CPI line reflects inflation, showing how the cost of goods and services has changed over time.
                The values are normalized between 0 and 1 so they can appear on the same chart without being overshadowed by layoff/creation numbers.
                A rising CPI indicates increasing living costs (inflation).
            </p>

            <h2 className="font-sans text-2xl mt-10 text-blue-600">4. Dollar Value:</h2>
            <p className={style.text}>
                This line tracks the relative strength of the U.S. dollar using CPI values, with 2010 set as the baseline.
                Values above 1 mean the dollar was stronger than in 2010; values below 1 mean it lost value or became weaker.
            </p>

            <h2 className="font-sans text-2xl mt-16 underline">Why These Indicators Matter Together:</h2>

            <span>
                <h2 className="font-sans text-xl mt-10">Layoffs vs. Creations:</h2>
                <p>Comparing both shows whether the economy is gaining or losing overall employment. If job creation is equal to or less than job
                    layoffs, it indicates a shrinking job market and underlying economic issues.
                </p>

                <h2 className="font-sans text-xl mt-10">Inflation’s Role:</h2>
                <p>CPI helps illustrate the true mathematical level of <a href="https://www.bls.gov/data/inflation_calculator.htm" className="underline text-blue-500"> inflation</a>.
                    If a person receives an annual raise of 4% but inflation is at 6%, their real income effectively decreases by 2%.
                </p>

                <h2 className="font-sans text-xl mt-10">Dollar Value:</h2>
                <p>
                    Measuring the dollar value over a period of time shows how much value and purchasing power an individual has lost over the years.
                    Since 2010, the U.S. dollar has lost roughly 30–35% of its purchasing power. That means $100 in 2010 is now worth about $65 today.
                </p>
                <h2 className="font-sans text-xl mt-14">Why does inflation even occur?</h2>
                <ul className="list-disc list-inside mt-2 space-y-3">
                    <li>
                        <strong>Excessive money printing by central banks:</strong> When the total amount of money grows faster
                        than the production of goods and services, more dollars compete for the same amount of goods.
                        Over time, this reduces the purchasing power of each dollar and contributes to higher prices.
                    </li>
                    <li>
                        <strong>Increased government spending:</strong> High amounts of government spending can force the government
                        to borrow when it exceeds the revenue earned that year. This can contribute to inflation and
                        higher overall debt. 
                    </li>
                    <li>
                        <strong>Tariffs and trade restrictions:</strong> Tariffs raise the cost of imported goods and raw
                        materials. Businesses pass these higher costs on to consumers, increasing prices across
                        multiple industries and further increasing inflation.
                    </li>
                    <li>
                        <strong>Wars:</strong> Wars disrupt global supply chains, reduce
                        production, increase energy and food costs, and require significant government spending. These
                        combined pressures often lead to higher inflation both domestically and globally.
                    </li>
                </ul>
            </span>
        </div>
    );
}