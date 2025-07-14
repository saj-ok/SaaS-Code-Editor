"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Palette, 
  Zap, 
  Users, 
  Shield, 
  Sparkles,
  Terminal,
  Globe,
  Layers
} from "lucide-react";
import Image from "next/image";

const FEATURES = [
  {
    icon: Code2,
    title: "Multi-Language Support",
    description: "Write and execute code in JavaScript, Python, Java, C++, Go, Rust, and more.",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1
  },
  {
    icon: Palette,
    title: "Beautiful Themes",
    description: "Choose from 5 carefully crafted themes including VS Dark, GitHub Dark, and Monokai.",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant code execution with our optimized runtime environment and caching.",
    gradient: "from-yellow-500 to-orange-500",
    delay: 0.3
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Share code snippets, collaborate with developers, and learn from the community.",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.4
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your code is protected with enterprise-grade security and privacy controls.",
    gradient: "from-red-500 to-rose-500",
    delay: 0.5
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Get intelligent code suggestions and error detection powered by advanced AI.",
    gradient: "from-indigo-500 to-purple-500",
    delay: 0.6
  }
];

const LANGUAGES = [
  { name: "JavaScript", icon: "/javascript.png", color: "bg-yellow-500/20" },
  { name: "Python", icon: "/python.png", color: "bg-blue-500/20" },
  { name: "TypeScript", icon: "/typescript.png", color: "bg-blue-600/20" },
  { name: "Java", icon: "/java.png", color: "bg-orange-500/20" },
  { name: "Go", icon: "/go.png", color: "bg-cyan-500/20" },
  { name: "Rust", icon: "/rust.png", color: "bg-orange-600/20" },
  { name: "C++", icon: "/cpp.png", color: "bg-blue-700/20" },
  { name: "C#", icon: "/csharp.png", color: "bg-purple-500/20" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

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
                className="group relative"
              >
                <div className={`relative p-4 rounded-2xl ${lang.color} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300`}>
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