"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Mail, Github, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BookCallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
    const email = "works.prashantsingh@gmail.com";

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Background Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-2xl"
                        onClick={onClose}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />
                        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
                    </motion.div>

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0d1117]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.5),0_0_80px_rgba(139,92,246,0.08)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 p-2 rounded-full text-white/30 hover:text-white/80 hover:bg-white/[0.06] transition-all outline-none cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                        <div className="p-8 pt-10">
                            {/* Header */}
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Get in touch</h2>
                                <p className="text-white/40 text-sm">Let&apos;s build something great together.</p>
                            </div>

                            {/* Action Cards */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {/* Book a call card */}
                                <Link
                                    href="/book-call"
                                    className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:bg-purple-500/[0.06] hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center mb-4 group-hover:bg-purple-500/15 group-hover:scale-110 transition-all duration-300">
                                        <Calendar size={22} className="text-purple-400" />
                                    </div>
                                    <span className="text-sm font-semibold text-white mb-1">Book a call</span>
                                    <span className="text-[10px] font-bold tracking-[0.15em] text-white/25 uppercase">30 min</span>
                                    <ArrowRight size={14} className="absolute top-4 right-4 text-white/0 group-hover:text-purple-400 transition-all duration-300" />
                                </Link>

                                {/* Email me card */}
                                <Link
                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:bg-indigo-500/[0.06] hover:border-indigo-500/20 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center mb-4 group-hover:bg-indigo-500/15 group-hover:scale-110 transition-all duration-300">
                                        <Mail size={22} className="text-indigo-400" />
                                    </div>
                                    <span className="text-sm font-semibold text-white mb-1">Email me</span>
                                    <span className="text-[10px] font-bold tracking-[0.15em] text-white/25 uppercase">Gmail</span>
                                    <ArrowRight size={14} className="absolute top-4 right-4 text-white/0 group-hover:text-indigo-400 transition-all duration-300" />
                                </Link>
                            </div>

                            {/* Footer links */}
                            <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/[0.06]">
                                <Link
                                    href="https://github.com/Prahants"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white/25 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                                >
                                    <Github size={17} />
                                </Link>

                                <Link
                                    href="https://www.linkedin.com/in/prahants/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white/25 hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 transition-all duration-300"
                                >
                                    <Linkedin size={17} />
                                </Link>

                                <a
                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                                >
                                    <Mail size={17} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
