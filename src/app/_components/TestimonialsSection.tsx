"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Full Stack Developer",
    company: "TechCorp",
    content: "CodeNexta has revolutionized my development workflow. The multi-language support and real-time collaboration features are game-changers. I can prototype ideas faster than ever before.",
    rating: 5,
    avatar: "SC",
    delay: 0.1
  },
  {
    name: "Marcus Rodriguez",
    role: "Software Engineer",
    company: "StartupXYZ",
    content: "The AI-powered code suggestions in CodeNexta are incredibly accurate. It's like having a senior developer pair programming with me 24/7. The learning curve was practically non-existent.",
    rating: 5,
    avatar: "MR",
    delay: 0.2
  },
  {
    name: "Emily Johnson",
    role: "Computer Science Student",
    company: "MIT",
    content: "As a student, CodeNexta has been invaluable for my coursework. The ability to quickly switch between languages and share code with classmates has made group projects so much easier.",
    rating: 5,
    avatar: "EJ",
    delay: 0.3
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    company: "CloudTech",
    content: "The deployment integration and CI/CD features in CodeNexta Pro are outstanding. I can go from idea to production faster than with any other platform I've used.",
    rating: 5,
    avatar: "DK",
    delay: 0.4
  },
  {
    name: "Lisa Wang",
    role: "Frontend Developer",
    company: "DesignStudio",
    content: "The themes and customization options are beautiful. CodeNexta doesn't just work well - it looks amazing too. The VS Code-like experience but in the browser is perfect.",
    rating: 5,
    avatar: "LW",
    delay: 0.5
  },
  {
    name: "Alex Thompson",
    role: "Tech Lead",
    company: "InnovateLab",
    content: "We've adopted CodeNexta for our entire team. The collaboration features and code sharing capabilities have improved our code review process significantly. Highly recommended!",
    rating: 5,
    avatar: "AT",
    delay: 0.6
  }
];

function TestimonialsSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-300">Testimonials</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              Loved by
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
              Developers Worldwide
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of developers who have transformed their coding experience with CodeNexta.
            Here's what they have to say about our platform.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: testimonial.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-8 h-8 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;