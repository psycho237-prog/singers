import React from 'react';

const SanzaTrophy = ({ className }) => {
    return (
        <svg
            viewBox="0 0 100 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="goldGradientMain" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#CA8A04" />
                    <stop offset="50%" stopColor="#FACC15" />
                    <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>

                <linearGradient id="goldGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A16207" />
                    <stop offset="50%" stopColor="#CA8A04" />
                    <stop offset="100%" stopColor="#A16207" />
                </linearGradient>

                <linearGradient id="starGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>
            </defs>

            {/* --- Base Section (Three Steps) --- */}
            {/* Bottom Step */}
            <path
                d="M25 210 H75 A 3 3 0 0 1 75 216 H25 A 3 3 0 0 1 25 210 Z"
                fill="url(#goldGradientMain)"
            />
            {/* Middle Step */}
            <path
                d="M30 200 H70 A 3 3 0 0 1 70 206 H30 A 3 3 0 0 1 30 200 Z"
                fill="url(#goldGradientMain)"
            />
            {/* Top Dome/Step */}
            <path
                d="M35 190 H65 A 15 15 0 0 1 65 196 H35 A 15 15 0 0 1 35 190 Z"
                fill="url(#goldGradientMain)"
            />
            {/* Semi-Circle Dome under star */}
            <path
                d="M35 190 C 35 175, 65 175, 65 190 Z"
                fill="url(#goldGradientDark)"
            />


            {/* --- The Body (Abstract Flame Structure) --- */}

            {/* Left Blade - Large curved side element */}
            <path
                d="M35 185 
           C 15 140, 20 100, 35 70 
           C 40 100, 40 130, 45 160 
           C 35 170, 35 180, 35 185 Z"
                fill="url(#goldGradientMain)"
            />

            {/* Right Blade - Large curved side element */}
            <path
                d="M65 185 
           C 85 140, 80 100, 65 70 
           C 60 100, 60 130, 55 160 
           C 65 170, 65 180, 65 185 Z"
                fill="url(#goldGradientMain)"
            />


            {/* Center Ribbon / Top Flame Element */}
            {/* This rises higher between the two notes from the reference */}
            <path
                d="M35 70 
           C 35 30, 50 10, 50 10 
           C 50 10, 65 30, 65 70 
           C 55 50, 45 50, 35 70 Z"
                fill="url(#goldGradientDark)"
            />

            {/* Inner Swoosh details to match the layered look */}
            <path
                d="M40 80 C 45 60, 55 60, 60 80 L 50 120 Z"
                fill="url(#goldGradientMain)"
                opacity="0.8"
            />


            {/* --- The Star --- */}
            <path
                transform="translate(50, 165) scale(0.8)"
                d="M0 -10 L 2.9 -3.2 L 10 -3.2 L 4.2 1.5 L 6.4 8.5 L 0 4.2 L -6.4 8.5 L -4.2 1.5 L -10 -3.2 L -2.9 -3.2 Z"
                fill="url(#starGradient)"
            />

        </svg>
    );
};

export default SanzaTrophy;
