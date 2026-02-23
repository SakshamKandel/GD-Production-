import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CameraCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Hide default cursor globally
        document.body.style.cursor = "none";

        // Also hide for links and buttons to enforce the custom cursor
        const style = document.createElement("style");
        style.innerHTML = `
      * { cursor: none !important; }
    `;
        document.head.appendChild(style);

        const moveCursor = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            gsap.to(followerRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power3.out"
            });
        };

        const handleMouseOver = (e) => {
            // Determine if hovering over a clickable element
            if (
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                e.target.classList.contains('cursor-pointer') ||
                e.target.classList.contains('nav-hover-btn')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.style.cursor = "auto";
            document.head.removeChild(style);
        };
    }, []);

    return (
        <>
            {/* Center Dot */}
            <div
                ref={cursorRef}
                className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
            />

            {/* Outer focus ring / bracket */}
            <div
                ref={followerRef}
                className={`pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-300 ease-out ${isHovering ? 'h-12 w-12' : 'h-8 w-8 rounded-full border border-white/50'
                    }`}
            >
                {isHovering && (
                    <div className="relative h-full w-full">
                        {/* Top Left Bracket */}
                        <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-red-500" />
                        {/* Top Right Bracket */}
                        <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-red-500" />
                        {/* Bottom Left Bracket */}
                        <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-red-500" />
                        {/* Bottom Right Bracket */}
                        <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-red-500" />
                    </div>
                )}
            </div>
        </>
    );
};

export default CameraCursor;
