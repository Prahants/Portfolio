"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden px-4"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center z-10"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-48 h-48 md:w-56 md:h-56 mb-8"
                >
                    <Image
                        src="/me.png"
                        alt="Prashant Kumar"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center tracking-tight">
                    Hi, I&apos;m <span className="text-gradient font-heading">Prashant</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/60 font-medium tracking-wide font-sans">
                    Full Stack Developer
                </p>
            </motion.div>
        </section>
    );
}
