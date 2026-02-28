"use client";

import { motion } from "framer-motion";

export default function Background() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-full w-full">
            {/* Animated glowing orbs */}
            <motion.div
                className="absolute top-[10%] left-[15%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -50, 40, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-pink-600/10 rounded-full blur-[120px]"
                animate={{
                    x: [0, -60, 40, 0],
                    y: [0, 60, -30, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
