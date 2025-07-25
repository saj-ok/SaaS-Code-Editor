"use client"

import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function CopyButton({ code }: { code: string }) {

      const [copied, setCopied] = useState(false);
      const copyToClipboard = async () => {
            await navigator.clipboard.writeText(code);
            toast.success("Code copied to clipboard");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
      };
      return (
            <button
                  onClick={copyToClipboard}
                  type="button"
                  className="p-2 hover:cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-200 group relative"
            >
                  {copied ? (
                        <Check className="size-4 text-green-400" />
                  ) : (
                        <Copy className=" size-4 text-gray-400 group-hover:text-gray-300" />
                  )}
            </button>
      );
}

export default CopyButton;