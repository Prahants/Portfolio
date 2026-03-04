"use client";

import { useEffect, useRef } from "react";

export default function DotGrid() {
    const dotLayerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dotLayer = dotLayerRef.current;
        const glow = glowRef.current;
        if (!dotLayer || !glow) return;

        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;

            // Reveal dots only around cursor using CSS mask
            const mask = `radial-gradient(circle 180px at ${x}px ${y}px, black 0%, transparent 100%)`;
            dotLayer.style.maskImage = mask;
            dotLayer.style.webkitMaskImage = mask;

            // Move purple glow
            glow.style.opacity = "1";
            glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
        };

        const handleMouseLeave = () => {
            // Hide all dots when mouse leaves
            const hideMask = "linear-gradient(transparent, transparent)";
            dotLayer.style.maskImage = hideMask;
            dotLayer.style.webkitMaskImage = hideMask;
            glow.style.opacity = "0";
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <>
            {/* Dot grid - fully masked (hidden) by default, revealed only near cursor */}
            <div
                ref={dotLayerRef}
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 50,
                    backgroundImage:
                        "radial-gradient(circle, rgba(255, 255, 255, 0.5) 1.5px, transparent 1.5px)",
                    backgroundSize: "40px 40px",
                    backgroundPosition: "20px 20px",
                    maskImage: "linear-gradient(transparent, transparent)",
                    WebkitMaskImage: "linear-gradient(transparent, transparent)",
                }}
            />

            {/* Purple glow that follows cursor */}
            <div
                ref={glowRef}
                className="fixed top-0 left-0 pointer-events-none"
                style={{
                    zIndex: 49,
                    width: "400px",
                    height: "400px",
                    opacity: 0,
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)",
                    borderRadius: "50%",
                    transition: "opacity 0.3s ease",
                    willChange: "transform",
                }}
            />
        </>
    );
}
