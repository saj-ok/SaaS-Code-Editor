import { motion } from "framer-motion";
import { Star} from "lucide-react";

function TestimonialsLoadingSkeleton() {
  // Create skeleton cards - show 3 by default, responsive breakpoints match original
  const skeletonCards = Array(3).fill(null);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background - same as original */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header - same as original */}
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

        {/* Loading Skeleton Cards */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {skeletonCards.map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-6 border border-gray-800/50 h-[410px] flex flex-col relative overflow-hidden animate-pulse"
              >
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50" />
                
                {/* Header: Stars and Quote skeleton */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  {/* Stars skeleton */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 bg-gray-600/50 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  
                  {/* Quote Mark skeleton */}
                  <div className="w-10 h-10 bg-gray-600/50 rounded-lg animate-pulse" />
                </div>

                {/* Feedback Content skeleton */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-3 py-2 h-auto rounded-xl flex-grow mb-6 relative z-10 flex flex-col gap-3">
                  {/* Text lines skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-600/30 rounded-md animate-pulse" />
                    <div className="h-4 bg-gray-600/30 rounded-md animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-600/30 rounded-md animate-pulse w-4/5" />
                    <div className="h-4 bg-gray-600/30 rounded-md animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-600/30 rounded-md animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-600/30 rounded-md animate-pulse w-2/3" />
                  </div>
                </div>

                {/* User Info skeleton */}
                <div className="flex items-center gap-3 mt-auto relative z-10">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-600/50 border-2 border-gray-700/50 animate-pulse" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="h-4 bg-gray-600/40 rounded-md animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-600/30 rounded-md animate-pulse w-1/2" />
                  </div>
                </div>

                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            ))}
          </div>
          
          {/* Skeleton dots indicator */}
          <div className="flex justify-center mt-16 gap-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-gray-600/50 rounded-full animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsLoadingSkeleton;