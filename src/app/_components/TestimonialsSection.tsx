"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Slider from "react-slick";
import TestimonialsLoadingSkeleton from "./TestimonialsLoadingSkeleton";

function TestimonialsSection() {
  
  const feedbacks = useQuery(api.feedback.getAllFeedback);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        }
      }
    ]
  };
  
    // Show loading skeleton while feedbacks are being fetched
  if (feedbacks === undefined) {
    return <TestimonialsLoadingSkeleton />;
  }

  // Show empty state or fallback if no feedbacks
  if (!feedbacks || feedbacks.length === 0) {
    return (
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">No testimonials available at the moment.</p>
        </div>
      </section>
    );
  }

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

        {/* Testimonials Slider */}
        <div className="mb-10">
          <div className="testimonials-slider-container">
            <style jsx>{`
              .testimonials-slider-container .slick-list {
                margin: 0 -12px;
              }
              
              .testimonials-slider-container .slick-slide {
                padding: 0 12px;
              }
              
              .testimonials-slider-container .slick-slide > div {
                height: 100%;
              }
              
              .testimonials-slider-container .slick-track {
                display: flex;
                align-items: stretch;
              }
              
              .testimonials-slider-container .slick-slide > div > div {
                height: 100%;
              }
              
              .testimonials-slider-container .slick-dots {
                bottom: -60px;
              }
              
              .testimonials-slider-container .slick-dots li button:before {
                color: #6b7280;
                font-size: 12px;
                opacity: 0.5;
              }
              
              .testimonials-slider-container .slick-dots li.slick-active button:before {
                color: #3b82f6;
                opacity: 1;
              }
              
              @media (max-width: 768px) {
                .testimonials-slider-container .slick-list {
                  margin: 0 -8px;
                }
                .testimonials-slider-container .slick-slide {
                  padding: 0 8px;
                }
                .testimonials-slider-container .slick-dots {
                  bottom: -40px;
                }
              }
            `}</style>

            <Slider {...settings}>
              {feedbacks?.map((feedback) => (
                <div key={feedback._id}>
                  <div className="mx-5 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-6 border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 h-[410px] flex flex-col relative overflow-hidden group">
                    
                    {/* Subtle background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Header: Stars and Quote */}
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-7 h-7 transition-all duration-300 ${
                              i < feedback.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Quote Mark */}
                      <div className="text-6xl  font-bold text-gray-600 leading-none">
                        <Quote/>
                      </div>
                    </div>

                    {/* Feedback Content */}
                    <div className=" hover:cursor-pointer glassf bg-gradient-to-r from-primary/5 to-secondary/5 px-3 py-2 h-auto rounded-xl flex-grow mb-6 relative z-10 transition-all duration-300">
                      <p className="text-gray-300  text-base leading-relaxed max-w-prose text-justify hyphens-auto ">
                        "{feedback.content}"
                      </p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 mt-auto relative z-10">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700/50 group-hover:border-blue-500/50 transition-colors duration-300">
                          <img
                            src={feedback.userProfileUrl}
                            alt={feedback.userName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-base truncate group-hover:text-blue-300 transition-colors duration-300">
                          {feedback.userName}
                        </h3>
                        <p className="text-gray-400 text-sm truncate">
                          {feedback.userRole || 'Developer'}
                        </p>
                      </div>
                    </div>

                    {/* Hover effect border */}
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/20 transition-colors duration-300 pointer-events-none" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;