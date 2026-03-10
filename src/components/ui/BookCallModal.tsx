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
                        className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
                        onClick={onClose}
                    >
                        {/* Subtle glow blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                    </motion.div>

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0b0f1a]/90 backdrop-blur-md border border-white/10 shadow-2xl shadow-purple-500/10"
                        onClick={(e) => e.stopPropagation()}
                    >
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
                                    href="/book-call"
                                    className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-[#161b22]/50 transition-all duration-200 hover:scale-105 hover:border-purple-400"
                                >
                                    <Calendar size={28} className="text-white/60 group-hover:text-purple-400 transition-colors duration-200 mb-3" />
                                    <span className="text-base font-semibold text-white mb-1">Book a call</span>
                                    <span className="text-xs font-bold tracking-wider text-white/40 group-hover:text-white/60 transition-colors uppercase">30 MIN CALL</span>
                                </Link>

                                {/* Email me card */}
                                <Link
                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-[#161b22]/50 transition-all duration-200 hover:scale-105 hover:border-purple-400"
                                >
                                    <Mail size={28} className="text-white/60 group-hover:text-purple-400 transition-colors duration-200 mb-3" />
                                    <span className="text-base font-semibold text-white mb-1">Email me</span>
                                    <span className="text-xs font-bold tracking-wider text-white/40 group-hover:text-white/60 transition-colors uppercase">OPEN GMAIL</span>
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
