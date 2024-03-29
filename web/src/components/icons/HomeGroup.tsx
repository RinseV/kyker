import React from 'react';

type HomeGroupProps = {
    color: string;
    size?: number;
};

export const HomeGroup: React.FC<HomeGroupProps> = ({ color, size = 24 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path
                fill={color}
                d="M17 16h-2v6h-3v-5H8v5H5v-6H3l7-6 7 6M6 2l4 4H9v3H7V6H5v3H3V6H2l4-4m12 1l5 5h-1v4h-3V9h-2v3h-1.66L14 10.87V8h-1l5-5z"
            ></path>
        </svg>
    );
};
