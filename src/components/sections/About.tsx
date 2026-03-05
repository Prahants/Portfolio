"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Activity, MapPin } from "lucide-react";
import Image from "next/image";

const TECH_STACK = [
    { name: "C++", src: "/logos/cplusplus-original.svg" },
    { name: "CSS3", src: "/logos/css3-original.svg" },
    { name: "FastAPI", src: "/logos/fastapi-original.svg" },
    { name: "Firebase", src: "/logos/firebase-plain.svg" },
    { name: "Git", src: "/logos/git-original.svg" },
    { name: "GitHub", src: "/logos/github-original.svg" },
    { name: "HTML5", src: "/logos/html5-original.svg" },
    { name: "HuggingFace", src: "/logos/huggingface_logo-noborder.svg" },
    { name: "JavaScript", src: "/logos/javascript-original.svg" },
    { name: "Jupyter", src: "/logos/jupyter-original.svg" },
    { name: "MongoDB", src: "/logos/mongodb-original.svg" },
    { name: "MySQL", src: "/logos/mysql-original.svg" },
    { name: "Next.js", src: "/logos/nextjs-original.svg" },
    { name: "Node.js", src: "/logos/nodejs-original.svg" },
    { name: "NumPy", src: "/logos/numpy-original.svg" },
    { name: "Pandas", src: "/logos/pandas-original.svg" },
    { name: "PostgreSQL", src: "/logos/postgresql-original.svg" },
    { name: "Postman", src: "/logos/postman-original.svg" },
    { name: "Python", src: "/logos/python-original.svg" },
    { name: "PyTorch", src: "/logos/pytorch-original.svg" },
    { name: "React", src: "/logos/react-original.svg" },
    { name: "Scikit-Learn", src: "/logos/scikitlearn-original.svg" },
    { name: "Tailwind", src: "/logos/tailwindcss-original.svg" },
    { name: "TensorFlow", src: "/logos/tensorflow-original.svg" },
    { name: "TypeScript", src: "/logos/typescript-original.svg" },
    { name: "Vercel", src: "/logos/vercel-original.svg" },
    { name: "VS Code", src: "/logos/vscode-original.svg" },
];

const CARDS_DATA = [
    {
        title: "University",
        description:
            "B.Tech in Computer Science & Engineering. Focused on AI, full-stack systems, and scalable architectures. Strong foundation in data structures and algorithms.",
        accentColor: "#8b5cf6",
        glowColor: "rgba(139, 92, 246, 0.35)",
        hoverTextClass: "text-purple-400",
        underlineClass: "bg-purple-500/50",
    },
    {
        title: "Competitions",
        description:
            "Recognized as a Global Nominee – NASA Space Apps Challenge (Zurich, CH). Secured 2nd Prize at Project Expo (Arduino Day, Jain University) for innovation and technical excellence. Driven by high-impact problem solving and competitive innovation.",
        accentColor: "#6366f1",
        glowColor: "rgba(99, 102, 241, 0.35)",
        hoverTextClass: "text-indigo-400",
        underlineClass: "bg-indigo-500/50",
    },
    {
        title: "Learning",
        description:
            "Consistently contributing on GitHub and refining code quality. Focused on writing clean, scalable, production-ready code. Committed to continuous improvement.",
        accentColor: "#10b981",
        glowColor: "rgba(16, 185, 129, 0.35)",
        hoverTextClass: "text-emerald-400",
        underlineClass: "bg-emerald-500/50",
    },
];

function InfoCards({ itemVariants }: { itemVariants: Variants }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.div
            variants={itemVariants}
            className="glass md:col-span-2 flex flex-col relative"
            style={{
                minHeight: "160px",
                clipPath: "inset(0 round 0.75rem)",
            }}
        >
            {/* "Hover to Read More" hint */}
            <p className={`text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-mono pt-3 pb-1 text-center relative z-30 transition-opacity duration-300 ${hoveredIndex !== null ? "opacity-0" : "opacity-100"}`}>
                <span className="md:hidden">Tap to Read More</span>
                <span className="hidden md:inline">Hover to Read More</span>
            </p>

            {/* Desktop: cards peeking from bottom, reveal on hover */}
            <div
                className="relative flex-grow hidden md:block"
                style={{ perspective: "1200px" }}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {[0, 2, 1].map((index) => {
                    const card = CARDS_DATA[index];
                    const isCenter = index === 1;
                    const isActive = hoveredIndex === index;
                    const isOther = hoveredIndex !== null && hoveredIndex !== index;

                    // Center always in front (30), side cards max 20 when hovered
                    const currentZ = isCenter ? 30 : (isActive ? 20 : 10);

                    return (
                        <motion.div
                            key={card.title}
                            className={`absolute border rounded-xl backdrop-blur-md cursor-pointer flex flex-col justify-start ${isCenter ? "p-2.5 pb-14" : "p-3"}`}
                            style={{
                                width: isCenter ? "38%" : "30%",
                                top: isCenter ? "25%" : "50%",
                                left: index === 0 ? "1%" : index === 1 ? "31%" : "69%",
                                zIndex: currentZ,
                                backgroundColor: isActive
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(255,255,255,0.03)",
                                borderColor: isActive
                                    ? `${card.accentColor}88`
                                    : "rgba(255,255,255,0.08)",
                                boxShadow: isActive
                                    ? `0 -8px 40px ${card.glowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`
                                    : "0 2px 12px rgba(0,0,0,0.3)",
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            animate={{
                                y: isActive ? -45 : 0,
                                scale: isActive ? 1.02 : 1,
                                opacity: isActive ? 1 : (isCenter ? 0.85 : 0.7),
                            }}
                            transition={{
                                duration: 0.35,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            initial={{ y: 0 }}
                        >
                            <h3
                                className={`text-[10px] md:text-xs font-bold mb-1 uppercase tracking-wider relative w-fit transition-colors duration-300 ${isActive ? card.hoverTextClass : "text-white"
                                    } ${isCenter ? "self-center" : index === 2 ? "self-end" : "self-start"}`}
                            >
                                {card.title}
                                <span
                                    className={`absolute -bottom-0.5 left-0 h-[1.5px] rounded-full transition-all duration-300 ${card.underlineClass} ${isActive ? "w-full" : "w-1/2"
                                        }`}
                                ></span>
                            </h3>
                            <p className={`text-[10px] md:text-[10px] leading-snug mt-1 transition-colors duration-300 ${isActive ? "text-white/70" : "text-white/40"
                                } ${isCenter ? "text-center" : index === 2 ? "text-right" : "text-left"}`}>
                                {card.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Mobile: staggered cards matching desktop layout, tap to expand */}
            <div
                className="relative flex-grow md:hidden"
                style={{ minHeight: "140px" }}
                onClick={(e) => {
                    // If tapping outside cards, reset
                    if (e.target === e.currentTarget) setHoveredIndex(null);
                }}
            >
                {[0, 2, 1].map((index) => {
                    const card = CARDS_DATA[index];
                    const isCenter = index === 1;
                    const isActive = hoveredIndex === index;

                    const currentZ = isCenter ? 30 : (isActive ? 20 : 10);

                    return (
                        <motion.div
                            key={card.title}
                            className={`absolute border rounded-xl backdrop-blur-md cursor-pointer flex flex-col justify-start ${isCenter ? "p-2.5 pb-10" : "p-2.5"}`}
                            style={{
                                width: isCenter ? "40%" : "32%",
                                top: isCenter ? "15%" : "40%",
                                left: index === 0 ? "0%" : index === 1 ? "30%" : "68%",
                                zIndex: currentZ,
                                backgroundColor: isActive
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(255,255,255,0.03)",
                                borderColor: isActive
                                    ? `${card.accentColor}88`
                                    : "rgba(255,255,255,0.08)",
                                boxShadow: isActive
                                    ? `0 -8px 40px ${card.glowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`
                                    : "0 2px 12px rgba(0,0,0,0.3)",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setHoveredIndex(isActive ? null : index);
                            }}
                            animate={{
                                y: isActive ? -35 : 0,
                                scale: isActive ? 1.02 : 1,
                                opacity: isActive ? 1 : (isCenter ? 0.85 : 0.7),
                            }}
                            transition={{
                                duration: 0.35,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            initial={{ y: 0 }}
                        >
                            <h3
                                className={`text-[9px] font-bold mb-0.5 uppercase tracking-wider relative w-fit transition-colors duration-300 ${isActive ? card.hoverTextClass : "text-white"
                                    } ${isCenter ? "self-center" : index === 2 ? "self-end" : "self-start"}`}
                            >
                                {card.title}
                                <span
                                    className={`absolute -bottom-0.5 left-0 h-[1px] rounded-full transition-all duration-300 ${card.underlineClass} ${isActive ? "w-full" : "w-1/2"
                                        }`}
                                ></span>
                            </h3>
                            <p className={`text-[8px] leading-snug mt-0.5 transition-colors duration-300 ${isActive ? "text-white/70" : "text-white/40"
                                } ${isCenter ? "text-center" : index === 2 ? "text-right" : "text-left"}`}>
                                {card.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default function About() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="about" className="py-8 md:py-10 px-4 max-w-[1050px] mx-auto min-h-screen flex items-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 w-full"
            >
                {/* Top Row: Name Plate */}
                <motion.div variants={itemVariants} className="glass p-2 flex flex-col items-center justify-center text-center relative overflow-hidden group order-1 md:order-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 w-full flex flex-col items-center justify-center py-1">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-none">PRASHANT</h2>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-1 mt-0.5 leading-none">KUMAR</h2>
                        <div className="w-12 h-[1px] bg-white/20 mx-auto mb-1.5"></div>
                        <p className="text-[9px] md:text-[10px] tracking-[0.2em] font-mono text-white/50 uppercase leading-relaxed">
                            FullStack Developer <br /> & AIML Engineer
                        </p>
                    </div>
                </motion.div>

                {/* Top Row: 3 Interactive Info Cards */}
                <div className="col-span-2 md:col-span-2 order-3 md:order-none">
                    <InfoCards itemVariants={itemVariants} />
                </div>

                {/* Left Column: Mindset */}
                <motion.div variants={itemVariants} className="glass p-5 md:p-7 flex flex-col justify-between group col-span-1 order-4 md:order-none">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 font-heading">Mindset</h2>
                        <div className="w-10 h-[2px] bg-purple-500 mb-4"></div>
                        <p className="text-sm text-white/70 mb-4 leading-relaxed tracking-wide">
                            Building <strong className="text-white font-semibold">more than software.</strong> My passions provide the <strong className="text-white font-semibold">discipline and focus</strong> I need to grow.
                        </p>
                        <p className="text-sm text-white/70 mb-4 leading-relaxed tracking-wide">
                            Mastering body and mind is my path to <strong className="text-white font-semibold">excellence.</strong>
                        </p>
                    </div>

                    {/* Strava style card */}
                    <div className="relative mt-2 w-full mx-auto rounded-xl overflow-hidden bg-gradient-to-br from-[#151b2e] via-[#111827] to-[#0d1117] border border-white/[0.08] shadow-[0_5px_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] group-hover:border-purple-500/20 transition-all duration-500">
                        {/* SVG Route Line Background */}
                        <svg className="absolute inset-0 w-full h-full opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700" viewBox="0 0 300 200" preserveAspectRatio="none">
                            <path d="M 20 160 Q 60 120, 80 140 T 140 100 T 200 80 T 260 60 T 290 40" stroke="url(#routeGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                            </defs>
                        </svg>


                        <div className="relative p-4 z-10">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-[9px] uppercase tracking-[0.15em] font-semibold text-purple-400 mb-1 font-mono">Bangalore</h3>
                                    <p className="text-white font-bold text-base leading-tight">10K Run</p>
                                </div>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 shadow-[0_2px_8px_rgba(249,115,22,0.3)]">
                                    <Activity size={14} className="text-white" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                                <div>
                                    <p className="text-[8px] text-white/40 mb-1 font-mono uppercase tracking-wider">Distance</p>
                                    <p className="text-sm font-bold text-white">10.0 <span className="text-[8px] text-white/40 font-normal">km</span></p>
                                </div>
                                <div>
                                    <p className="text-[8px] text-white/40 mb-1 font-mono uppercase tracking-wider">Time</p>
                                    <p className="text-sm font-bold text-white">52<span className="text-[8px] text-white/40 font-normal">m</span> 30<span className="text-[8px] text-white/40 font-normal">s</span></p>
                                </div>
                                <div>
                                    <p className="text-[8px] text-white/40 mb-1 font-mono uppercase tracking-wider">Pace</p>
                                    <p className="text-sm font-bold text-white">5:15 <span className="text-[8px] text-white/40 font-normal">/km</span></p>
                                </div>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                    </span>
                                    <p className="text-[8px] uppercase tracking-[0.15em] text-white/50 font-semibold font-mono">Running</p>
                                </div>
                                <p className="text-[7px] uppercase tracking-wider text-white/30 font-mono">via Strava</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Center Column: Portrait and Location */}
                <motion.div variants={itemVariants} className="flex flex-col gap-3 h-full min-h-[280px] md:min-h-[300px] order-2 md:order-none">
                    <div className="glass p-1.5 h-full relative overflow-hidden group flex-grow min-h-[260px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/20 to-[#0a0a0f]/80 z-10 rounded-[10px] pointer-events-none"></div>
                        <Image
                            src="/Prashant.png"
                            alt="Prashant Kumar"
                            fill
                            className="object-cover rounded-[10px]"
                        />
                    </div>

                    <div className="glass p-4 relative overflow-hidden h-[130px] shrink-0">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-15"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent"></div>

                        {/* Animated sweep line - moves left to right */}
                        <div className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-purple-400/60 to-transparent z-20 animate-sweep-line shadow-[0_0_8px_rgba(167,139,250,0.5)]"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <p className="text-[8px] font-mono uppercase tracking-[0.15em] text-white/40">Live</p>
                            </div>
                            <div className="mt-auto">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <MapPin className="text-purple-400 shrink-0" size={16} />
                                    <h3 className="text-lg font-bold font-heading text-white tracking-wide">BANGALORE, INDIA</h3>
                                </div>
                                <div className="flex justify-between items-center border-t border-white/[0.08] pt-2 mt-1">
                                    <p className="text-white/50 font-mono text-[9px] tracking-wider">12.97° N, 77.59° E</p>
                                    <p className="text-purple-400 font-mono text-[9px] font-semibold tracking-wider bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">GMT +5:30</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Craft */}
                <motion.div variants={itemVariants} className="glass p-6 md:p-7 flex flex-col h-full group overflow-hidden col-span-1 order-5 md:order-none">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 font-heading">Craft</h2>
                    <div className="w-10 h-[2px] bg-purple-500 mb-4"></div>
                    <p className="text-sm text-white/70 mb-4 leading-relaxed">
                        Building scalable <strong className="text-white font-semibold">apps, websites, and automations.</strong>
                    </p>
                    <p className="text-sm text-white/70 mb-4 leading-relaxed">
                        I understand what advantages modern tech can provide, helping me advise on the solutions a business actually needs.
                    </p>

                    <div className="relative w-[calc(100%+3rem)] -mx-6 md:w-[calc(100%+3.5rem)] md:-mx-7 mb-4 mt-auto bg-black/40 border-y border-white/5 py-3">
                        <div className="flex overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                            <div className="flex gap-4 w-max shrink-0 items-center animate-marquee pr-4">
                                {TECH_STACK.map((tech, i) => (
                                    <span key={`tech-1-${i}`} className="flex items-center gap-2 text-[9px] md:text-[10px] uppercase font-mono text-white/60 tracking-wider shrink-0 whitespace-nowrap">
                                        <img src={tech.src} alt={tech.name} className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain opacity-60" />
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4 w-max shrink-0 items-center animate-marquee pr-4" aria-hidden="true">
                                {TECH_STACK.map((tech, i) => (
                                    <span key={`tech-2-${i}`} className="flex items-center gap-2 text-[9px] md:text-[10px] uppercase font-mono text-white/60 tracking-wider shrink-0 whitespace-nowrap">
                                        <img src={tech.src} alt={tech.name} className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain opacity-60" />
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                        <div className="flex flex-col gap-1.5">
                            <p className="text-xs text-white/70 leading-relaxed max-w-[95%]">Active Open Source contributor. Look forward to solving complex bugs.</p>
                            <div className="flex items-center gap-1.5 mt-1 bg-[#0a0a0f]/50 p-2 rounded-lg border border-white/5 w-fit">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                </span>
                                <p className="text-[9px] text-white/90 font-medium tracking-wide">Open to collaboration</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
