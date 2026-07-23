"use client"

import { motion } from "framer-motion"

export default function LoadingRipple() {
    return (
        <div className="flex items-center justify-center min-h-50">
            <div className="relative w-24 h-24">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border-[5px] border-blue-500"
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{ opacity: 0, scale: 1 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>
        </div>
    )
}