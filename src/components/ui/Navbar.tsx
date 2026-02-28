"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Other", href: "#other" },
];

export default function Navbar() {
    const [activeTab, setActiveTab] = useState("Home");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (href: string, name: string) => {
        setActiveTab(name);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[95%] max-w-6xl transition-all duration-300",
                scrolled ? "opacity-95" : "opacity-100"
            )}
        >
            {/* Left side: Dark Mode Toggle */}
            <div className="flex-1 flex justify-start">
                <button className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10 backdrop-blur-md bg-white/5 transition-all outline-none cursor-pointer">
                    <Moon size={20} className="text-white/80" />
                </button>
            </div>

            {/* Center: Navigation Links */}
            <div className="flex items-center gap-1 p-1.5 rounded-full border border-white/10 bg-[#0b0f1a]/60 backdrop-blur-lg">
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

            {/* Right side: Book a Call */}
            <div className="flex-1 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10 backdrop-blur-md bg-white/5 transition-all text-sm font-medium outline-none text-white cursor-pointer h-12">
                    <Calendar size={16} />
                    <span>Book a Call</span>
                </button>
            </div>
        </nav>
    );
}
