"use client";

import { useEffect, useState } from "react";
import { useGeminiStore } from "@/store/useGeminiStore";
import { Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";

function RateLimitIndicator() {
  const { 
    getRemainingRequests, 
    getResetTime, 
    maxDailyLimit,
    initializeFromStorage 
  } = useGeminiStore();
  
  const [remaining, setRemaining] = useState(maxDailyLimit);
  const [resetTime, setResetTime] = useState(0);

  useEffect(() => {
    // Initialize from storage first
    initializeFromStorage();
    
    const updateInfo = () => {
      setRemaining(getRemainingRequests());
      setResetTime(getResetTime());
    };

    updateInfo();
    
    // Update every minute
    const interval = setInterval(updateInfo, 60000);
    
    return () => clearInterval(interval);
  }, [getRemainingRequests, getResetTime, initializeFromStorage]);

  const getTimeUntilReset = () => {
    const now = Date.now();
    const timeLeft = resetTime - now;
    
    if (timeLeft <= 0) return "Resetting...";
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const percentage = (remaining / maxDailyLimit) * 100;
  const isLow = remaining <= 5;
  const isEmpty = remaining === 0;

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-md ${isEmpty ? 'bg-red-500/10' : isLow ? 'bg-yellow-500/10' : 'bg-blue-500/10'}`}>
          <Zap className={`w-3.5 h-3.5 ${isEmpty ? 'text-red-400' : isLow ? 'text-yellow-400' : 'text-blue-400'}`} />
        </div>
        <div className="text-xs">
          <div className={`font-medium ${isEmpty ? 'text-red-400' : isLow ? 'text-yellow-400' : 'text-gray-300'}`}>
            {remaining}/{maxDailyLimit} AI requests
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="w-3 h-3" />
            <span>Resets in {getTimeUntilReset()}</span>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full ${
            isEmpty ? 'bg-red-500' : 
            isLow ? 'bg-yellow-500' : 
            'bg-gradient-to-r from-blue-500 to-purple-500'
          }`}
        />
      </div>
    </div>
  );
}

export default RateLimitIndicator;