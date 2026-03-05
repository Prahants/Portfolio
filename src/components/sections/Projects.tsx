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
        description: "AI-powered platform where students collaborate, share resources, and study together in real time.",
        tags: ["REACT", "NODE.JS", "SOCKET.IO", "MONGODB", "AI INTEGRATION"],
        bgClass: "from-blue-600/80 to-indigo-500/20",
        image: "/project 1.png",
        href: "https://github.com/Prahants/StudyBuddies"
    },
    {
        id: "02",
        type: "MOBILE APP",
        title: "Improvement Tree",
        description: "Full-stack mobile app with cloud server that gamifies personal development.",
        tags: ["REACT NATIVE", "EXPO", "JAVA", "SPRING BOOT"],
        bgClass: "from-green-500/80 to-green-400/20",
        badge: { icon: Star, text: "Star", color: "text-purple-300", bg: "bg-purple-600" },
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "03",
        type: "DESKTOP APP",
        title: "Nebula",
        description: "Arcade runner game with procedural terrain generation and dynamic gameplay.",
        tags: ["PYTHON", "KIVY", "GAME DEV", "PROCEDURAL GENERATION"],
        bgClass: "from-pink-500/80 to-purple-500/20",
        image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "04",
        type: "MOBILE APP",
        title: "Guess Who?",
        description: "Mobile adaptation of the classic board game with camera and gallery integration for custom boards.",
        tags: ["FLUTTER", "DART", "WEB SOCKETS", "MULTIPLAYER"],
        bgClass: "from-cyan-500/80 to-cyan-400/20",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
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
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight">
                    Featured <span className="text-gradient">Projects</span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                    A curated selection of projects that made me confident in building software.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
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
                                    <Link href={project.href} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                    </Link>
                                )}
                                {project.badge && (
                                    <div
                                        className={`${project.badge.bg} ${project.badge.color} px-3 py-1 pb-[6px] rounded-lg flex items-center gap-1.5`}
                                    >
                                        <project.badge.icon size={12} fill="currentColor" />
                                        <span className="text-xs font-bold leading-none capitalize pt-1">{project.badge.text}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden group border border-white/5 bg-[#0f1423] mb-6 transition-colors duration-500 hover:border-white/20">
                            {/* Edge light hover effect layer */}
                            <div className="absolute inset-0 z-20 rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]"></div>

                            {/* Static background layer */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${project.bgClass} opacity-80 z-0`}></div>

                            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
                                <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed max-w-[90%] drop-shadow-md">
                                    {project.description}
                                </p>

                                {/* Image Pop Up (Link if available) */}
                                {project.href ? (
                                    <Link
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative block w-11/12 mx-auto mt-6 aspect-[16/9] md:aspect-[2/1] rounded-t-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 hover:-translate-y-2 bg-black cursor-pointer"
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
                                    <div className="relative w-11/12 mx-auto mt-6 aspect-[16/9] md:aspect-[2/1] rounded-t-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 hover:-translate-y-2 bg-black">
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
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors group">
                    <span className="font-semibold text-lg tracking-wide">Explore all projects on GitHub</span>
                    <ExternalLink size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </section>
    );
}
