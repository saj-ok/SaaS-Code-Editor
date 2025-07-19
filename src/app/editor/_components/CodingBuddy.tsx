"use client"

import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'
import React, { useState } from 'react'

function CodingBuddy() {
const [isOpen, setIsOpen] = useState(false);
      return (
       <>
            <Button
                  className="animated-border-button"
                  onClick={isOpen ? () => setIsOpen(false) : () => setIsOpen(true)}
            >
                  <style>{`
                @property --angle {
                  syntax: "<angle>";
                  initial-value: 0deg;
                  inherits: false;
                }

                @keyframes fadeInUp {
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                @keyframes spin {
                  from { --angle: 0deg; }
                  to   { --angle: 360deg; }
                }

                .animated-border-button {
                  position: relative;
                  padding: 3px;
                  border-radius: 1rem;
                  opacity: 0;
                  animation: fadeInUp 0.6s ease-out forwards;
                  isolation: isolate;
                }

                .animated-border-button:hover::before,
                .animated-border-button:hover::after {
                  content: "";
                  position: absolute;
                  inset: 0;
                  padding: 3px;
                  border-radius: 1rem;
                  background-image: conic-gradient(from var(--angle), #ff4545, #00ff99, #006aff, #ff0095, #ff4545);
                  animation: spin 2.5s linear infinite;
                  z-index: -1;
                }

                .animated-border-button:hover::before {
                  filter: blur(1.5rem);
                  opacity: 0.5;
                }

                .button-content {
                  position: relative;
                  z-index: 1;
                  background: #000; 
                  border-color: #555879;
                  height: 100%;
                  padding: 1rem 1rem;
                  display: flex;
                  border-radius: 1rem;
                  align-items: center;
                  justify-content: space-between;
                  gap: 1rem;
                }
              `}</style>
                  <p className="button-content">
                        <Brain className="w-10 h-10 text-sky-400" />
                        Coding Buddy
                  </p>
            </Button>
            {}
            {isOpen && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm">Halo</div>
            )}
       </>
      )
}

export default CodingBuddy