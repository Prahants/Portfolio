"use client";

import { motion } from "framer-motion";
import { Activity, MapPin, Clock } from "lucide-react";
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
        <section id="about" className="py-8 md:py-10 px-4 max-w-[1024px] mx-auto min-h-screen flex items-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full"
            >
                {/* Top Row: Name Plate */}
                <motion.div variants={itemVariants} className="glass p-4 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 w-full flex flex-col items-center justify-center py-2">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-none">PRASHANT</h2>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-2 mt-1 leading-none">KUMAR</h2>
                        <div className="w-10 h-[1px] bg-white/20 mx-auto mb-2"></div>
                        <p className="text-[8px] md:text-[9px] tracking-[0.2em] font-mono text-white/50 uppercase leading-relaxed">
                            FullStack Developer <br /> & AIML Engineer
                        </p>
                    </div>
                </motion.div>

                {/* Top Row: Hover to Read More */}
                <motion.div variants={itemVariants} className="glass p-4 md:col-span-2 flex flex-col relative overflow-hidden group">
                    <div className="text-center mb-2 w-full">
                        <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-white/40 border border-white/10 rounded-full px-3 py-1 bg-[#0b0f1a]/50 backdrop-blur-md transition-colors group-hover:bg-white/5 group-hover:text-white/60">
                            Hover to read more
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow h-full items-stretch">
                        {/* University */}
                        <div className="p-3 md:p-4 border border-white/5 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/card flex flex-col justify-center">
                            <h3 className="text-[10px] md:text-[11px] font-bold text-white mb-1.5 uppercase tracking-wider relative w-fit group-hover/card:text-purple-400 transition-colors">
                                University
                                <span className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-purple-500/50 rounded-full"></span>
                            </h3>
                            <p className="text-[10px] text-white/60 leading-snug mt-1 text-balance lg:text-pretty">
                                Pursuing Computer Science & Engineering. Focused on advanced software development and AI.
                            </p>
                        </div>

                        {/* Competitions */}
                        <div className="p-3 md:p-4 border border-white/5 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/card flex flex-col justify-center">
                            <h3 className="text-[10px] md:text-[11px] font-bold text-white mb-1.5 uppercase tracking-wider relative w-fit group-hover/card:text-blue-400 transition-colors">
                                Competitions
                                <span className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-blue-500/50 rounded-full"></span>
                            </h3>
                            <p className="text-[10px] text-white/60 leading-snug mt-1 text-balance lg:text-pretty">
                                3rd Place Winner at the Cassini Hackathon and Econverse Startup Finalist.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Left Column: Mindset */}
                <motion.div variants={itemVariants} className="glass p-5 flex flex-col justify-between group">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-3 font-heading">Mindset</h2>
                        <p className="text-xs text-white/70 mb-3 leading-relaxed tracking-wide">
                            Building <strong className="text-white font-semibold flex mb-1 mt-0.5">more than software.</strong> My passions provide the <strong className="text-white font-semibold mx-1">discipline and focus</strong> I need to grow. <br /><br />
                            Mastering body and mind is my path to <strong className="text-white font-semibold flex mt-1">excellence.</strong>
                        </p>
                    </div>

                    {/* Strava style card */}
                    <div className="relative mt-2 w-full mx-auto rounded-xl overflow-hidden bg-gradient-to-b from-[#1a2138] to-[#0b0f1a] border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_10px_25px_rgba(139,92,246,0.15)] transition-all duration-500">
                        <div className="absolute inset-x-0 h-16 top-0 bg-[url('https://images.unsplash.com/photo-1526482153915-d71629d89201?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center mix-blend-overlay opacity-40"></div>

                        <div className="relative p-4 z-10 pt-10">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <h3 className="text-[9px] uppercase tracking-wider font-semibold text-orange-500 mb-0.5">Bangalore</h3>
                                    <p className="text-white font-bold text-sm leading-tight">10K Run</p>
                                </div>
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-orange-500 text-white font-bold text-[7px]">
                                    STR
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <div>
                                    <p className="text-[9px] text-white/50 mb-0.5 font-mono uppercase tracking-wider">Distance</p>
                                    <p className="text-base font-bold text-white font-sans">10.0 <span className="text-[9px] text-white/50 font-normal">km</span></p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-white/50 mb-0.5 font-mono uppercase tracking-wider">Time</p>
                                    <p className="text-base font-bold text-white font-sans">52<span className="text-[9px] text-white/50 font-normal">m</span> 30<span className="text-[9px] text-white/50 font-normal">s</span></p>
                                </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                                <p className="text-[8px] uppercase tracking-wider text-white/50 font-bold px-2 py-0.5 bg-white/5 rounded-full inline-block border border-white/5">Running</p>
                                <Activity size={12} className="text-orange-500" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Center Column: Portrait and Location */}
                <motion.div variants={itemVariants} className="flex flex-col gap-3 h-full min-h-[300px]">
                    <div className="glass p-1.5 h-full relative overflow-hidden group flex-grow min-h-[180px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0f1a]/20 to-[#0b0f1a]/80 z-10 rounded-[10px] pointer-events-none"></div>
                        <Image
                            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
                            alt="Professional Portrait"
                            fill
                            className="object-cover rounded-[10px] transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <div className="glass p-4 relative overflow-hidden group h-[100px] shrink-0">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-110"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] to-transparent"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-full flex justify-between items-start">
                                <MapPin className="text-purple-400" size={16} />
                                <Clock className="text-white/50" size={14} />
                            </div>
                            <div className="mt-auto">
                                <h3 className="text-lg font-bold font-heading text-white tracking-wide mb-1">BANGALORE, INDIA</h3>
                                <div className="flex justify-between items-center border-t border-white/10 pt-1.5 mt-1">
                                    <p className="text-white/60 font-mono text-[9px] tracking-wider">12.97° N, 77.59° E</p>
                                    <p className="text-purple-400 font-mono text-[9px] font-semibold tracking-wider bg-purple-500/10 px-1.5 py-0.5 rounded">GMT +5:30</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Craft */}
                <motion.div variants={itemVariants} className="glass p-5 flex flex-col h-full group overflow-hidden">
                    <h2 className="text-xl md:text-2xl font-bold mb-1 font-heading">Craft</h2>
                    <div className="w-8 h-[2px] bg-purple-500 mb-4"></div>
                    <p className="text-xs text-white/70 mb-4 leading-relaxed">
                        Building scalable <strong className="text-white font-semibold flex mb-0.5 mt-0.5">apps, websites, and automations.</strong>
                        I understand what advantages modern tech can provide, helping me advise on the solutions a business actually needs.
                    </p>

                    <div className="relative w-[calc(100%+2.5rem)] -mx-5 mb-4 mt-auto bg-black/40 border-y border-white/5 py-3">
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
                            <p className="text-[11px] text-white/70 leading-relaxed max-w-[95%]">Active Open Source contributor. Look forward to solving complex bugs.</p>
                            <div className="flex items-center gap-1.5 mt-1 bg-[#0b0f1a]/50 p-2 rounded-lg border border-white/5 w-fit">
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
