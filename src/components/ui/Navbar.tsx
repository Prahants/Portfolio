"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Calendar, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import BookCallModal from "./BookCallModal";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Other", href: "#other" },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isManualScroll = useRef(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll spy: auto-detect active section
    useEffect(() => {
        const sectionIds = navItems.map((item) => item.href.replace("#", ""));
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (isManualScroll.current) return;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const name = navItems.find(
                            (item) => item.href === `#${entry.target.id}`
                        )?.name;
                        if (name) setActiveTab(name);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const scrollTo = (href: string, name: string) => {
        isManualScroll.current = true;
        setActiveTab(name);
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setTimeout(() => {
            isManualScroll.current = false;
        }, 1000);
    };

    return (
        <>
            <nav
                className={cn(
                    "fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[95%] max-w-6xl transition-all duration-300",
                    scrolled ? "opacity-95" : "opacity-100"
                )}
            >
                {/* Left side: Dark Mode Toggle */}
                <div className="flex-1 flex justify-start">
                    <button
                        className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-white/[0.15] backdrop-blur-2xl bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all outline-none cursor-pointer"
                    >
                        <Moon size={20} className="text-white/80" />
                    </button>
                </div>

                {/* Center: Navigation Links - Desktop only */}
                <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full border border-white/[0.15] bg-[#0c0a1a]/40 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.3)]">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollTo(item.href, item.name)}
                            className="relative px-5 py-2.5 text-sm font-medium transition-colors outline-none cursor-pointer rounded-full"
                        >
                            {activeTab === item.name ? (
                                <span className="relative z-10 text-white font-semibold flex items-center h-full break-normal whitespace-nowrap">
                                    {item.name}
                                </span>
                            ) : (
                                <span className="relative z-10 text-white/50 hover:text-white transition-colors flex items-center h-full break-normal whitespace-nowrap">
                                    {item.name}
                                </span>
                            )}
                            {activeTab === item.name && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 backdrop-blur-md bg-white/5 transition-all outline-none cursor-pointer hover:bg-white/10"
                    >
                        {mobileMenuOpen ? (
                            <X size={20} className="text-white/80" />
                        ) : (
                            <Menu size={20} className="text-white/80" />
                        )}
                    </button>
                </div>

                {/* Right side: Book a Call - Desktop only */}
                <div className="flex-1 flex justify-end">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-white/[0.15] backdrop-blur-2xl bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all text-sm font-medium outline-none text-white cursor-pointer h-12"
                    >
                        <Calendar size={16} />
                        <span>Book a Call</span>
                    </button>
                    {/* Mobile: Book a Call icon only */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="md:hidden flex items-center justify-center w-12 h-12 rounded-full border border-white/[0.15] backdrop-blur-2xl bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all outline-none cursor-pointer hover:bg-white/10"
                    >
                        <Calendar size={20} className="text-white/80" />
                    </button>
                </div>
            </nav>

            {/* Mobile Full-Screen Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-[#0c0a1a]/95 backdrop-blur-xl" />

                        {/* Menu Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 px-6">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: index * 0.07, duration: 0.3 }}
                                    onClick={() => scrollTo(item.href, item.name)}
                                    className={cn(
                                        "w-full max-w-sm py-4 text-lg font-medium rounded-2xl transition-all outline-none cursor-pointer",
                                        activeTab === item.name
                                            ? "bg-purple-500/80 text-white font-semibold shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                                            : "text-white/50 hover:text-white/80 hover:bg-white/5"
                                    )}
                                >
                                    {item.name}
                                </motion.button>
                            ))}

                            {/* Book a Call - in mobile menu */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: navItems.length * 0.07, duration: 0.3 }}
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center justify-center gap-2 w-full max-w-sm py-4 mt-4 text-lg font-medium text-white/70 hover:text-white rounded-2xl border border-white/10 hover:bg-white/5 transition-all outline-none cursor-pointer"
                            >
                                <Calendar size={18} />
                                <span>Book a Call</span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Book A Call Modal */}
            <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
