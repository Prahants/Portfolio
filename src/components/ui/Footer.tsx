import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/10 mt-20 bg-[#0c0a1a]/80 backdrop-blur-md relative z-20">
            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Left */}
                <div className="text-white/60 font-mono text-sm tracking-widest">
                    PS &copy; {currentYear > 2026 ? `2026 - ${currentYear}` : "2026"} Prashant
                </div>

                {/* Center */}
                <div className="text-white/50 text-sm font-sans flex items-center gap-2">
                    Built with <span className="text-red-500 animate-pulse">❤️</span> using <span className="text-white font-medium">Next.js & Tailwind</span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">
                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors hover:scale-110 transform duration-300">
                        <Github size={20} />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#0a66c2] transition-colors hover:scale-110 transform duration-300">
                        <Linkedin size={20} />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="mailto:contact@example.com" className="text-white/50 hover:text-red-400 transition-colors hover:scale-110 transform duration-300">
                        <Mail size={20} />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>

            </div>
        </footer>
    );
}
