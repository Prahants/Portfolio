"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const skills = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
];

export default function Skills() {
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const frameRef = useRef<number>(0);
    const hoverRef = useRef<boolean>(false);
    const activeRef = useRef<boolean>(false);
    
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [activeSkill, setActiveSkill] = useState<typeof skills[0] | null>(null);

    useEffect(() => {
        let t = 0;

        // Distribute items evenly on a sphere using Fibonacci lattice equivalent
        const items = skills.map((_, i) => {
            const phi = Math.acos(-1 + (2 * i) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;
            return {
                x: Math.cos(theta) * Math.sin(phi),
                y: Math.sin(theta) * Math.sin(phi),
                z: Math.cos(phi),
            };
        });

        const animate = () => {
            // Pause rotation if hovered OR if a skill is actively clicked/centered
            if (!hoverRef.current && !activeRef.current) {
                t -= 0.005; // rotation speed
            }

            const radius = window.innerWidth < 768 ? 140 : 220;

            itemsRef.current.forEach((item, i) => {
                if (!item) return;

                const { x, y, z } = items[i];

                // Rotate around Y axis mathematically
                const rotX = x * Math.cos(t) - z * Math.sin(t);
                const rotZ = x * Math.sin(t) + z * Math.cos(t);

                // Actual 3D position
                const px = rotX * radius;
                const py = y * radius;
                const pz = rotZ * radius;

                // Transform the object
                item.style.transform = `translate3d(${px}px, ${py}px, ${pz}px)`;

                // Normalize Z to alter appearance (back is faded and blurred)
                const zNorm = (rotZ + 1) / 2; // roughly 0 to 1
                
                // If there's an active skill, fade out orbiting items more to draw attention to center
                if (activeRef.current) {
                     item.style.opacity = (0.1 + zNorm * 0.2).toFixed(2);
                     item.style.filter = `blur(${Math.max(2, (1 - zNorm) * 5)}px)`;
                } else {
                     item.style.opacity = (0.3 + zNorm * 0.7).toFixed(2);
                     item.style.filter = `blur(${Math.max(0, (1 - zNorm) * 2.5)}px)`;
                }
                
                item.style.zIndex = Math.round(zNorm * 100).toString();
            });

            frameRef.current = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(frameRef.current);
    }, []);

    const handleMouseEnter = (skillName: string) => {
        setHoveredSkill(skillName);
        hoverRef.current = true;
    };

    const handleMouseLeave = () => {
        setHoveredSkill(null);
        hoverRef.current = false;
    };
    
    const handleItemClick = (skill: typeof skills[0]) => {
        // Toggle active skill. If clicking same, turn off.
        if (activeSkill?.name === skill.name) {
            setActiveSkill(null);
            activeRef.current = false;
        } else {
            setActiveSkill(skill);
            activeRef.current = true;
        }
    };

    // Close active skill if click outside sphere
    const handleBackgroundClick = () => {
        if (activeSkill) {
            setActiveSkill(null);
            activeRef.current = false;
        }
    };

    return (
        <section id="skills" className="py-24 px-4 w-full overflow-hidden relative">
            <div className="max-w-6xl mx-auto text-center mb-16 relative z-20">
                <p className="text-white/50 text-sm tracking-[0.2em] uppercase font-bold mb-4 font-mono">
                    Tech Stack
                </p>
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight">
                    My <span className="text-gradient">Skills</span>
                </h2>
            </div>

            <div 
                className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-[2000px] cursor-pointer"
                onClick={handleBackgroundClick}
            >
                
                {/* Wireframe Globe Background Base - Accurately matches reference */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[480px] md:h-[480px] transform-style-3d pointer-events-none">
                    {/* Center glowing core */}
                    <div className={`absolute inset-0 rounded-full bg-blue-500/5 blur-[80px] transition-opacity duration-500 ${activeSkill ? 'opacity-0' : 'opacity-100'}`} />
                    
                    {/* Longitude and Latitude rings */}
                    <div className={`transition-opacity duration-500 ${activeSkill ? 'opacity-20' : 'opacity-100'}`}>
                        <div className="absolute inset-0 rounded-full border border-indigo-500/20 shadow-[inset_0_0_80px_rgba(79,70,229,0.1)]"></div>
                        <div className="absolute inset-0 rounded-full border border-blue-500/20" style={{ transform: 'rotateY(45deg)' }}></div>
                        <div className="absolute inset-0 rounded-full border border-purple-500/20" style={{ transform: 'rotateY(90deg)' }}></div>
                        <div className="absolute inset-0 rounded-full border border-fuchsia-500/20" style={{ transform: 'rotateY(135deg)' }}></div>
                        <div className="absolute inset-0 rounded-full border border-indigo-500/20" style={{ transform: 'rotateX(45deg)' }}></div>
                        <div className="absolute inset-0 rounded-full border border-blue-500/20" style={{ transform: 'rotateX(90deg)' }}></div>
                        <div className="absolute inset-0 rounded-full border border-purple-500/20" style={{ transform: 'rotateX(135deg)' }}></div>
                    </div>
                </div>
                
                {/* Active Centered Card Overlay */}
                <div 
                    className={`absolute z-[200] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none transition-all duration-500
                        ${activeSkill ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                >
                    {activeSkill && (
                        <>
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-[#161a2b]/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(139,92,246,0.3)] flex items-center justify-center mb-6 relative overflow-hidden">
                                {/* Inner glowing ring */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-50"></div>
                                
                                <div className="w-20 h-20 md:w-24 md:h-24 relative filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] z-10 transition-transform hover:scale-110 duration-300">
                                    <Image
                                        src={activeSkill.icon}
                                        alt={activeSkill.name}
                                        fill
                                        className={`object-contain
                                            ${activeSkill.name === 'Next.js' || activeSkill.name === 'Vercel' || activeSkill.name === 'GitHub' ? 'invert' : ''}
                                        `}
                                    />
                                </div>
                            </div>
                            
                            <div className="px-6 py-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-white font-mono tracking-widest text-sm md:text-base">
                                {activeSkill.name}
                            </div>
                        </>
                    )}
                </div>
                
                {/* Rotating Sphere Container */}
                <div className="relative w-full h-full transform-style-3d pointer-events-none">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            ref={(el) => {
                                if (el) itemsRef.current[index] = el;
                            }}
                            className="absolute left-1/2 top-1/2 -mt-6 -ml-6 md:-mt-8 md:-ml-8 transition-transform duration-0 pointer-events-auto group"
                            onMouseEnter={() => handleMouseEnter(skill.name)}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick(skill);
                            }}
                        >
                            <div 
                                className={`relative flex items-center justify-center p-3 md:p-4 rounded-xl transition-all duration-300 cursor-pointer
                                  ${hoveredSkill === skill.name && activeSkill?.name !== skill.name ? 'bg-white/10 scale-125 border border-white/20 shadow-[0_0_30px_rgba(139,92,246,0.3)]' : 'bg-transparent border border-transparent scale-100'}
                                  ${activeSkill?.name === skill.name ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100'}
                                `}
                            >
                                <div className="w-10 h-10 md:w-16 md:h-16 relative filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                                    <Image
                                        src={skill.icon}
                                        alt={skill.name}
                                        fill
                                        className={`object-contain transition-all duration-500
                                          ${skill.name === 'Next.js' || skill.name === 'Vercel' || skill.name === 'GitHub' ? 'invert' : ''}
                                        `}
                                    />
                                </div>
                                
                                {/* Tooltip (hidden when active card is shown) */}
                                <div 
                                    className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-[#0b0f1a]/90 backdrop-blur-md rounded border border-white/10 text-xs font-mono text-white transition-all duration-300 pointer-events-none shadow-lg
                                    ${hoveredSkill === skill.name && !activeSkill ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                                >
                                    {skill.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
            `}} />
        </section>
    );
}
