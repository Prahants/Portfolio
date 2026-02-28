"use client";

import { motion } from "framer-motion";
import { MessageSquare, Trophy, Link as LinkIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

const cards = [
    {
        title: "Guestbook",
        description: "Leave a message for future visitors.",
        icon: MessageSquare,
        href: "#",
        color: "from-blue-500/20 to-blue-600/5",
        iconColor: "text-blue-400"
    },
    {
        title: "Achievements",
        description: "Hackathons, awards, and milestones.",
        icon: Trophy,
        href: "#",
        color: "from-yellow-500/20 to-orange-600/5",
        iconColor: "text-yellow-400"
    },
    {
        title: "My Links",
        description: "Connect with me across the web.",
        icon: LinkIcon,
        href: "#",
        color: "from-purple-500/20 to-pink-600/5",
        iconColor: "text-purple-400"
    }
];

export default function Other() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="other" className="py-24 px-4 max-w-6xl mx-auto">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {cards.map((card) => (
                    <motion.div key={card.title} variants={cardVariants} className="h-full">
                        <Link href={card.href} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-[2rem]">
                            <div className="glass p-8 h-full flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.2)] border-white/10 hover:border-white/20">
                                {/* Background gradient effect on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                        <card.icon className={`${card.iconColor}`} size={28} />
                                    </div>

                                    <h3 className="text-2xl font-bold font-heading text-white tracking-wide mb-3">{card.title}</h3>
                                    <p className="text-white/60 leading-relaxed font-sans">{card.description}</p>
                                </div>

                                <div className="relative z-10 mt-12 flex items-center justify-between text-white/50 group-hover:text-white transition-colors duration-300">
                                    <span className="font-semibold text-sm tracking-wider uppercase">Explore</span>
                                    <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
