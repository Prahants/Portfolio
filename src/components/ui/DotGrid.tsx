"use client";

import { useEffect, useRef } from "react";

export default function DotGrid() {
    const brightLayerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const brightLayer = brightLayerRef.current;
        if (!brightLayer) return;

        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;

            // Brighten dots near cursor
            const mask = `radial-gradient(circle 400px at ${x}px ${y}px, black 0%, black 40%, transparent 100%)`;
            brightLayer.style.maskImage = mask;
            brightLayer.style.webkitMaskImage = mask;
        };

        const handleMouseLeave = () => {
            const hideMask = "linear-gradient(transparent, transparent)";
            brightLayer.style.maskImage = hideMask;
            brightLayer.style.webkitMaskImage = hideMask;
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const dotStyle = {
        backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, var(--dot-opacity)) 0.5px, transparent 0.5px)",
        backgroundSize: "30px 30px",
        backgroundPosition: "10px 10px",
    };

    return (
        <>
            {/* Base dots - always visible at low opacity */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 1,
                    backgroundImage:
                        "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0.5px, transparent 0.5px)",
                    backgroundSize: "30px 30px",
                    backgroundPosition: "30px 30px",
                }}
            />

            {/* Bright dots - only visible near cursor (layered on top to boost brightness) */}
            <div
                ref={brightLayerRef}
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 1,
                    backgroundImage:
                        "radial-gradient(circle, rgba(255, 255, 255, 0.35) 0.1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                    backgroundPosition: "30px 30px",
                    maskImage: "linear-gradient(transparent, transparent)",
                    WebkitMaskImage: "linear-gradient(transparent, transparent)",
                }}
            />
        </>
    );
}
