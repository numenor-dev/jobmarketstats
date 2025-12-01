'use client';

import { useState } from 'react';
import MoreInfo from './moreinfo';

export default function InfoContainer() {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleClick = () => {
        if (!isVisible) {
            setIsVisible(true);
        }
        setIsVisible(!isVisible);
    }

    return (
        <div>
            <span
                className="w-32 cursor-pointer group flex items-center font-sans -ml-5"
                onClick={handleClick}
            >
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 duration-500 ease-in-out">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

                <p
                    className="text-xl underline transition-transform duration-500 ease-in-out group-hover:translate-x-4"
                >
                    More Info
                </p>
            </span>
            {isVisible && <MoreInfo />}
        </div>
    )

}