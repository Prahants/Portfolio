"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        id: "01",
        type: "WEB APP",
        title: "StudyBuddies",
        description: "AI-powered platform where students collaborate, share resources, and study together in real time with smart AI learning assistance.",
        tags: ["REACT", "NODE.JS", "SOCKET.IO", "MONGODB", "AI INTEGRATION", "CHATTING"],
        bgClass: "from-indigo-600/80 via-purple-600/60 to-violet-500/30",
        image: "/project 1.png",
        href: "https://github.com/Prahants/StudyBuddies"
    },
    {
        id: "02",
        type: "WEB PLATFORM",
        title: "BloomWatch",
        description: "AI-powered platform that analyzes NASA satellite data to detect and predict global plant bloom events using NDVI and machine learning.",
        tags: ["FASTAPI", "MACHINE LEARNING", "NDVI ANALYSIS", "NASA MODIS DATA", "SATELLITE ANALYTICS"],
        bgClass: "from-emerald-600/80 to-blue-500/20",
        image: "/project 2.png",
        href: "https://github.com/Prahants/BloomWatch_NASA"
    },
    {
        id: "03",
        type: "AI APPLICATION",
        title: "Llama Chatbot",
        description: "AI chatbot powered by the LLaMA language model that analyzes user sentiment in real time to generate context-aware and emotionally intelligent responses.",
        tags: ["PYTHON", "LLAMA", "NLP", "SENTIMENT ANALYSIS", "HUGGING FACE", "MACHINE LEARNING"],
        bgClass: "from-indigo-600/80 via-purple-600/40 to-blue-500/20",
        image: "/project 3.png", // AI/Chatbot themed placeholder
        href: "https://github.com/Prahants/Llama-Chatbot-with-Sentiment-Analysis-Integration"
    },
    {
        id: "04",
        type: "AUTONOMOUS SYSTEM",
        title: "Self-Driving Car",
        description: "AI-based autonomous driving system that uses deep learning and computer vision to predict steering angles from road images and simulate self-driving behavior.",
        tags: ["PYTHON", "COMPUTER VISION", "DEEP LEARNING", "CNN", "OPENCV", "AUTONOMOUS DRIVING"],
        bgClass: "from-cyan-600/80 via-blue-500/40 to-indigo-500/20",
        image: "/project 4.png", // Autonomous/Tech car themed placeholder
        href: "https://github.com/Prahants/SelfDrivingCar"
    },
];

export default function Projects() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section id="projects" className="py-24 px-4 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl md:text-6xl font-bold font-heading mb-10 tracking-tight">
                    Featured <span className="text-gradient">Projects</span>
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    A curated selection of projects that made me confident in building software.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20"
            >
                {projects.map((project) => (
                    <motion.div key={project.id} variants={cardVariants} className="flex flex-col group">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-white/40 font-mono text-sm tracking-widest">{project.id}</span>
                            <div className="h-[1px] w-8 bg-white/20"></div>
                            <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase">
                                {project.type}
                            </span>
                        </div>

                        <div className="flex justify-between items-end mb-6">
                            <h3 className="text-3xl font-bold text-white tracking-wide font-heading">
                                {project.title}
                            </h3>

                            <div className="flex items-center gap-4">
                                {project.href && (
                                    <Link href={project.href} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="relative w-full aspect-[6/5] rounded-[26px] overflow-hidden group border border-black/5 bg-[#0f1423] mb-6 transition-colors duration-500 hover:border-black/20">
                            {/* Edge light hover effect layer */}
                            <div className="absolute inset-0 z-20 rounded-[26px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_25px_rgba(255,255,255,0.12)]"></div>

                            {/* Static background layer */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${project.bgClass} opacity-60 z-0`}></div>

                            <div className="absolute inset-0 z-10 pt-10 px-10 pb-0 flex flex-col justify-between">
                                <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed max-w-[90%] drop-shadow-md">
                                    {project.description}
                                </p>

                                {/* Image Pop Up (Link if available) */}
                                {project.href ? (
                                    <Link
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative block w-11/12 mx-auto mt-6 aspect-[4/3] md:aspect-[16/10] rounded-t-xl overflow-hidden shadow-2xl transition-transform duration-500 origin-bottom hover:scale-[1.03] bg-black cursor-pointer"
                                    >
                                        <div className="absolute top-0 inset-x-0 h-6 bg-[#2d2d2d] flex items-center px-3 gap-1.5 z-20">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                        </div>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 pt-6"
                                        />
                                    </Link>
                                ) : (
                                    <div className="relative w-11/12 mx-auto mt-6 aspect-[4/3] md:aspect-[16/10] rounded-t-xl overflow-hidden shadow-2xl transition-transform duration-500 origin-bottom hover:scale-[1.03] bg-black">
                                        <div className="absolute top-0 inset-x-0 h-6 bg-[#2d2d2d] flex items-center px-3 gap-1.5 z-20">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                        </div>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 pt-6"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider uppercase text-white/60 font-mono"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-20 flex justify-center">
                <Link href="https://github.com/Prahants" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors group">
                    <span className="font-semibold text-lg tracking-wide">Explore all projects on GitHub</span>
                    <ExternalLink size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </section>
    );
}
