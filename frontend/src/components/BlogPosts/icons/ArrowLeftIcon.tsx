import React from 'react';

interface ArrowLeftIconProps {
    className?: string;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ className }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default ArrowLeftIcon;
