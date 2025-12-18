'use client';

import { useState } from 'react';
import MoreInfo from './moreinfo';

export default function InfoContainer() {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
    }

    const MoreInfoProps = {
        visible: isVisible
    };

    return (
        <div className="flex flex-col items-center">
            <span
                onClick={handleClick}
                className="group flex flex-col items-center cursor-pointer font-sans"
            >
                <p className="text-3xl font-bold underline">
                    More Info
                </p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="
                size-6
                mt-1
                transition-transform
                duration-300
                ease-out
                group-hover:translate-y-1
            "
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                    />
                </svg>
            </span>

            {isVisible && <MoreInfo {...MoreInfoProps} />}
        </div>
    )

}