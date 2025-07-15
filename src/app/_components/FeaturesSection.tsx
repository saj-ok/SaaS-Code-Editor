"use client";

import { motion } from "framer-motion";
import { 
 
  Terminal,
  Globe,
} from "lucide-react";
import Image from "next/image";
import FeatureGrids from "./FeatureGrids";




const LANGUAGES = [
  { name: "JavaScript", icon: "/javascript.png", color: "bg-yellow-500/20" },
  { name: "Python", icon: "/python.png", color: "bg-blue-500/20" },
  { name: "TypeScript", icon: "/typescript.png", color: "bg-blue-600/20" },
  { name: "Java", icon: "/java.png", color: "bg-orange-500/20" },
  { name: "Go", icon: "/go.png", color: "bg-cyan-500/20" },
  { name: "Rust", icon: "/rust.png", color: "bg-orange-600/20" },
  { name: "C++", icon: "/cpp.png", color: "bg-blue-700/20" },
  { name: "C#", icon: "/csharp.png", color: "bg-purple-500/20" },
  { name: "Ruby", icon: "/ruby.png", color: "bg-red-600/20" },
  { name: "Swift", icon: "/swift.png", color: "bg-orange-500/20" },
];

function FeaturesSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              Everything You Need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Code Like a Pro
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            CodeNexta provides all the tools and features you need for modern development, 
            from beginner-friendly interfaces to advanced collaboration tools.
          </p>
        </motion.div>

        {/* Features Grid */}
          <FeatureGrids/>

        {/* Language Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 mb-8">
            <Globe className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Language Support</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Code in Your Favorite Language
          </h3>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Support for 10+ programming languages with syntax highlighting, 
            intelligent autocomplete, and real-time error detection.
          </p>

          {/* Language Icons */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {LANGUAGES.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group relative language-card"
              >
                <div className={`relative p-4 rounded-2xl ${lang.color} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 z-10`}>
                  <Image
                    src={lang.icon}
                    alt={lang.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {lang.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;