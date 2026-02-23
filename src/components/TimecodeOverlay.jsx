import React, { useEffect, useState } from 'react';

const TimecodeOverlay = () => {
    const [timecode, setTimecode] = useState('00:00:00:00');

    useEffect(() => {
        let start = Date.now();
        const interval = setInterval(() => {
            const ms = Date.now() - start;

            const hours = Math.floor(ms / 3600000).toString().padStart(2, '0');
            const minutes = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
            const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
            const frames = Math.floor((ms % 1000) / 41.66).toString().padStart(2, '0'); // Approx 24fps

            setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
        }, 41.66);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] h-dvh w-screen overflow-hidden text-red-600/60 font-mono text-[10px] md:text-xs">
            {/* Top Left - REC indicator */}
            <div className="absolute left-6 top-6 flex items-center gap-2">
                <div className="size-2 md:size-3 rounded-full bg-red-600 animate-pulse" />
                <span className="tracking-widest font-bold">REC</span>
            </div>

            {/* Top Right - Resolution/Format */}
            <div className="absolute right-6 top-6 tracking-widest font-bold hidden md:block">
                8K // RAW
            </div>

            {/* Bottom Center - Timecode */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 tracking-widest font-bold text-sm md:text-base">
                [ {timecode} ]
            </div>

            {/* Middle Crosshairs */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
                <div className="relative size-12">
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-red-600/50 -translate-x-1/2" />
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-600/50 -translate-y-1/2" />
                </div>
            </div>

            {/* Frame Corners */}
            <div className="absolute left-10 top-10 h-6 w-6 border-l-2 border-t-2 border-red-600/40" />
            <div className="absolute right-10 top-10 h-6 w-6 border-r-2 border-t-2 border-red-600/40" />
            <div className="absolute left-10 bottom-10 h-6 w-6 border-l-2 border-b-2 border-red-600/40" />
            <div className="absolute right-10 bottom-10 h-6 w-6 border-r-2 border-b-2 border-red-600/40" />
        </div>
    );
};

export default TimecodeOverlay;
