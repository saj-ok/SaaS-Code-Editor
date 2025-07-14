"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FLOATING_ICONS = [
  { icon: "/javascript.png", delay: 0, x: -150, y: -100, size: "w-16 h-16" },
  { icon: "/python.png", delay: 0.2, x: 120, y: -80, size: "w-14 h-14" },
  { icon: "/typescript.png", delay: 0.4, x: -180, y: 60, size: "w-12 h-12" },
  { icon: "/java.png", delay: 0.6, x: 160, y: 80, size: "w-18 h-18" },
  { icon: "/go.png", delay: 0.8, x: -120, y: 120, size: "w-14 h-14" },
  { icon: "/rust.png", delay: 1, x: 200, y: -120, size: "w-12 h-12" },
  { icon: "/cpp.png", delay: 1.2, x: -200, y: -60, size: "w-16 h-16" },
  { icon: "/csharp.png", delay: 1.4, x: 140, y: 140, size: "w-14 h-14" },
];

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating Programming Language Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FLOATING_ICONS.map((item, index) => (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3], 
              scale: 1,
              x: item.x,
              y: item.y,
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              delay: item.delay,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `calc(50% + ${item.x}px)`,
              top: `calc(50% + ${item.y}px)`,
            }}
          >
            <div className={`${item.size} rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-3 shadow-lg hover:scale-110 transition-transform duration-300`}>
              <Image 
                src={item.icon} 
                alt="Language" 
                width={40} 
                height={40}
                className="w-full h-full object-contain"
              />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 "
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-300">Next-Generation Code Editor</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 text-transparent bg-clip-text">
            Code
          </span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Nexta
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          The ultimate online IDE for developers. Write, execute, and share code in 
          <span className="text-blue-400 font-semibold"> 10+ programming languages</span> with 
          real-time collaboration and AI-powered assistance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Start Coding Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/snippets"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Explore Snippets
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/40 rounded-full "
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;