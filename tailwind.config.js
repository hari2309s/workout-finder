/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Teal-cyan color palette (light variants)
                'teal': {
                    '0': '#00897b',   // Base teal
                    '10': '#1a9588',  // 10% lighter
                    '20': '#33a195',  // 20% lighter
                    '30': '#4daca3',  // 30% lighter
                    '40': '#66b8b0',  // 40% lighter
                    '50': '#80c4bd',  // 50% lighter
                    '60': '#99d0ca',  // 60% lighter
                    '70': '#b3dcd7',  // 70% lighter
                    '80': '#cce7e5',  // 80% lighter
                    '90': '#e6f3f2',  // 90% lighter
                    '100': '#ffffff', // 100% (white)
                },
                // Dark teal variants
                'teal-dark': {
                    '0': '#00897b',   // Base teal
                    '10': '#007b6f',  // 10% darker
                    '20': '#006e62',  // 20% darker
                    '30': '#006056',  // 30% darker
                    '40': '#00524a',  // 40% darker
                    '50': '#00453e',  // 50% darker
                    '60': '#003731',  // 60% darker
                    '70': '#002925',  // 70% darker
                    '80': '#001b19',  // 80% darker
                    '90': '#000e0c',  // 90% darker
                    '100': '#000000', // 100% (black)
                },
                'foreground': '#1A1A1A',
            }
        },
    },
    plugins: [],
};