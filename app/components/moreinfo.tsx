import { motion } from "framer-motion";

type MoreInfoProps = {
    visible: boolean;
};

export default function MoreInfo({ visible }: MoreInfoProps) {

    const style = {
        chartText: "font-sans text-lg",
        headerText: "font-sans font-semibold text-3xl mt-16",
        subheaderText: "font-sans font-semibold text-2xl mt-6",
        inflationText: "font-sans text-lg",
        linkText: "underline text-blue-500 text-sm"
    };

    return (
        <div className="flex flex-col md:mx-auto mb-4">
            {visible && (
                <motion.h1
                    key="moreinfo"
                    className="relative font-sans font-extrabold p-2 rounded-md text-3xl mt-10 overflow-hidden"
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
                            bg-yellow-200
                        "
                        style={{ transformOrigin: "left" }}
                    />
                    <span className="relative z-10">
                        This chart visualizes four major economic indicators in the US from 2010 to 2025:
                    </span>
                </motion.h1>
            )
            }

            {/* Section 1 */}
            <h2 className="font-sans font-semibold text-2xl mt-10 text-red-600">1. Job layoffs:</h2>
            <p className={style.chartText}>
                This line shows the total number of layoffs each year based on Bureau of Labor Statistics (BLS) data.
                Higher points represent years when more people lost jobs, often coinciding with major economic downturns (e.g., recessions, market corrections, global events).
            </p>

            <h2 className="font-sans font-semibold text-2xl mt-10 text-green-600">2. Job creations:</h2>
            <p className={style.chartText}>
                This line represents the total number of new jobs added each year.
                Tracking job creation alongside layoffs gives a clearer picture of whether the labor market is expanding or contracting.
            </p>

            <h2 className="font-sans font-semibold text-2xl mt-10 text-amber-900">3. Consumer Price Index (CPI), normalized:</h2>
            <p className={style.chartText}>
                The CPI line reflects inflation, showing how the cost of goods and services has changed over time.
                The values are normalized between 0 and 1 so it can be displayed here alongside the job data.
                A rising CPI indicates increasing living costs (inflation).
            </p>

            <h2 className="font-sans font-semibold text-2xl mt-10 text-blue-600">4. Dollar Value:</h2>
            <p className={style.chartText}>
                This line tracks the relative strength of the U.S. dollar using CPI values, with 2010 set as the baseline.
                Values above 1 mean the dollar was stronger than in 2010; values below 1 mean it lost value or became weaker.
            </p>

            {/* Section 2 */}
            <h2 className={style.headerText}>Why do these indicators matter together?</h2>

            <h3 className="font-sans font-semibold text-2xl mt-4">Layoffs vs. Creations:</h3>
            <p className={style.inflationText}>Comparing both shows whether the economy is gaining or losing overall employment. If job creation is equal to or less than job
                layoffs, it indicates a shrinking job market and underlying economic issues.
            </p>

            <h3 className={style.subheaderText}>Inflation’s Role:</h3>
            <p className={style.inflationText}>CPI helps illustrate the true mathematical level of <a href="https://www.bls.gov/data/inflation_calculator.htm" className="underline text-blue-500"> inflation</a>,
                which affects purchasing power. Even if jobs are created, high inflation will counteract real income and savings.
                If a person received an annual raise of 4% but inflation is at 6%, their real income effectively decreased by 2%.
            </p>

            <h3 className={style.subheaderText}>Dollar Value:</h3>
            <p className={style.inflationText}>
                Measuring the dollar value over a period of time shows how much value and purchasing power an individual has lost over the years.
                Since 2010, the U.S. dollar has lost roughly 30–35% of its purchasing power. That means $100 in 2010 is now worth about $65 today.
            </p>

            {/* Section 3 */}
            <h2 className={style.headerText}>Why does inflation even occur?</h2>

            <h3 className="font-sans font-semibold text-2xl mt-4">Excessive money printing by central banks:</h3>
            <p className={style.inflationText}>
                When the total amount of money grows faster
                than the production of goods and services, more dollars compete for the same amount of goods.
                Over time, this reduces the purchasing power of each dollar and contributes to higher prices.&nbsp;
                <a
                    href="https://www.federalreserve.gov/monetarypolicy.htm"
                    className={style.linkText}
                    target="_blank"
                    rel="noopener noreferrer">
                    Source: Federal Reserve
                </a>
            </p>

            <h3 className={style.subheaderText}>Increased government spending:</h3>
            <p className={style.inflationText}>
                High amounts of government spending can force the government
                to borrow when it exceeds the revenue earned that year, otherwise known as government overspending. This can contribute to inflation and
                higher overall debt.&nbsp;
                <a
                    href="https://mitsloan.mit.edu/ideas-made-to-matter/federal-spending-was-responsible-2022-spike-inflation-research-shows"
                    className={style.linkText}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Source: MIT Sloan School of Management
                </a>
            </p>

            <h3 className={style.subheaderText}>Tariffs and trade restrictions:</h3>
            <p className={style.inflationText}>
                Tariffs raise the cost of imported goods and raw
                materials. Businesses pass these higher costs on to consumers, increasing prices across
                multiple industries and further increasing inflation.&nbsp;
                <a
                    href="https://www.frbsf.org/research-and-insights/publications/economic-letter/2025/05/effects-of-tariffs-on-inflation-and-production-costs/"
                    className={style.linkText}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Source: Federal Reserve Bank of San Francisco
                </a>
            </p>

            <h3 className={style.subheaderText}>Wars:</h3>
            <p className={style.inflationText}>
                Wars disrupt global supply chains, reduce
                production, increase energy and food costs, and require significant government spending. These
                combined pressures often lead to higher inflation both domestically and globally.&nbsp;
                <a
                    href="https://www.gu.se/en/news/war-and-conflict-often-lead-to-high-inflation"
                    className={style.linkText}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Source: University of Gothenburg
                </a>
            </p>
        </div >
    );
}