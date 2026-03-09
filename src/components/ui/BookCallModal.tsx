"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Mail, Github, Linkedin } from "lucide-react";
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
            document.body.style.overflow = "hidden"; // Prevent scrolling
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
                        className="absolute inset-0 bg-black/40 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-[500px] overflow-hidden rounded-[24px] bg-[#111111]/95 backdrop-blur-xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Accent Line */}
                        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all outline-none"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            <div className="mb-8 text-left">
                                <h2 className="text-[32px] md:text-4xl font-bold text-white mb-2 tracking-tight">Get in touch</h2>
                                <p className="text-white/60 text-[15px]">Let&apos;s build something great together.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {/* Book a call card */}
                                <Link
                                    href="https://cal.com/prashant"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:scale-[1.05] hover:border-purple-400/50 hover:bg-purple-500/5 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                                >
                                    <Calendar size={20} className="text-purple-400" />
                                    <div className="flex flex-col gap-1.5 mt-auto">
                                        <span className="text-[15px] font-semibold text-white">Book a call</span>
                                        <span className="text-[11px] font-bold tracking-wider text-white/40 group-hover:text-white/60 transition-colors uppercase">30 MIN CALL</span>
                                    </div>
                                </Link>

                                {/* Email me card */}
                                <Link
                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:scale-[1.05] hover:border-blue-400/50 hover:bg-blue-500/5 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                >
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <span className="text-xs font-semibold tracking-wider text-white/80 group-hover:text-white whitespace-nowrap">OPEN GMAIL</span>
                                </Link>
                            </div>

                            {/* Footer links */}
                            <div className="flex items-center justify-center gap-6 pt-6 border-t border-white/10">
                                <Link
                                    href="https://github.com/Prahants"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/40 hover:text-white transition-colors duration-300 hover:scale-110"
                                >
                                    <Github size={18} />
                                    <span className="sr-only">GitHub</span>
                                </Link>

                                <Link
                                    href="https://www.linkedin.com/in/prahants/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/40 hover:text-[#0a66c2] transition-colors duration-300 hover:scale-110"
                                >
                                    <Linkedin size={18} />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>

                                <Link
                                    href={`mailto:${email}`}
                                    className="text-white/40 hover:text-red-400 transition-colors duration-300 hover:scale-110"
                                >
                                    <Mail size={18} />
                                    <span className="sr-only">Email</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
