"use client";

import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Slider from "react-slick";


function TestimonialsSection() {
  
  const feedbacks = useQuery(api.feedback.getAllFeedback);

   const settings = {
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          centerMode: false,
        }
      }
    ]
  };



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
        <div className="mb-16">
          <div className="slider-container max-w-8xl mx-auto ">
            <style>{`
              .slick-slide > div {
                padding: 0 12px;
              }
              
              .slick-dots {
                bottom: -50px;
              }
              
              .slick-dots li button:before {
                color: white;
                font-size: 12px;
              }
              
              .slick-dots li.slick-active button:before {
                color: #fff;
              }
              
              @media (max-width: 768px) {
                .slick-slide > div {
                  padding: 0 8px;
                }
              }
           /* Center-slide hover effect */
              .slick-center .glass {
                transform: scale(1.05);
                --tw-shadow-color: rgba(147,197,253,0.3);
                box-shadow:
                  0 10px 15px -3px var(--tw-shadow-color),
                  0 4px 6px -2px var(--tw-shadow-color);
                transition: all 0.5s;
              }
              .slick-center .glass .bg-gradient-to-br { opacity: 1; }
              .slick-center .glass .absolute.top-0 { transform: scaleX(1); }
            `}</style>

            <Slider {...settings} >
              {feedbacks?.map((feedback, index) => (
                <div key={feedback._id} >
                  <div
                    className="h-[550px] md:h-[530px] mx-1 md:mx-5 my-6 glass hover:shadow-glow group animate-slide-up hover:scale-105 hover:shadow-lg hover:shadow-blue-300/30 transition-all duration-500 relative overflow-hidden rounded-xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Background gradients */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                    {/* Card content wrapper */}
                    <div className="p-6 relative z-10 flex flex-col h-full">
                      {/* Main content grows */}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={` md:w-7 md:h-7  transition-colors duration-200 ${i < feedback.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-muted-foreground/30'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-5 mb-6">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-3 border-background shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                              <img
                                src={feedback.userProfileUrl}
                                alt={feedback.userName}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-3 border-background flex items-center justify-center shadow-lg">
                              <Zap className="w-3 h-3 text-white" />
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                              {feedback.userName}
                            </h3>
                          </div>
                        </div>
                        <div className=" pt-4 relative border-t border-border">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <p className="max-w-prose text-justify hyphens-auto text-muted-foreground leading-relaxed relative z-10 p-2 group-hover:text-foreground transition-colors duration-300">
                              "{feedback.content}"
                            </p>
                          </div>
                        </div>
                      </div> 
                    </div>

                    {/* Decorative pings */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-ping"></div>
                      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-secondary rounded-full animate-ping delay-300"></div>
                      <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 bg-accent rounded-full animate-ping delay-600"></div>
                    </div>
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