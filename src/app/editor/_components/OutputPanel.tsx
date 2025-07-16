"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Loader, Terminal } from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";
import toast from "react-hot-toast";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LoginButton from "@/components/LoginButton";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";



const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);


function OutputPanel() {
  const { output, error, isRunning , editor} = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);
  const [isAIruning, setIsAIruning] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    toast.success("Copied!");
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };
 

const handleAIforError = async () => {
  if (!hasContent) return;
  setIsAIruning(true);
  console.log('clicked');
  try {
    const errorMsg = error || "";
    const language = localStorage.getItem("editor-language") || "javascript";
    const code = localStorage.getItem(`editor-code-${language}`);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-001",
      generationConfig: {
        temperature: 0.4,
        topP: 0.9,
      },
    });

    const prompt = `
      You are an expert ${language} developer.
      You will be given a snippet of ${language} code and the exact compiler/runtime error message it produces.
      Your job is to correct the code so that it compiles/runs without changing its original behavior.

      Language: ${language}

      Original Code:
      \`\`\`${language}
      ${code}
      \`\`\`

      Error Message:
      \`\`\`
      ${errorMsg}
      \`\`\`

      Return only the corrected ${language} code, with no explanations or markdown formatting.
    `;

    const aiResult = await model.generateContent(prompt);

    // 1) Pull the full text string
    const raw = await aiResult.response.text();

    // 2) Strip markdown fences if present
    const match = raw.match(/```(?:\w+)?\n([\s\S]*?)```$/);
    const onlyCode = match ? match[1].trim() : raw.trim();

    // 3) Send it to console and editor
    console.log(onlyCode);
    editor?.setValue(onlyCode);

  } catch (e) {
    console.error("AI error fixer failed:", e);
  } finally {
    setIsAIruning(false);
  }
};



  return (
    <div className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>
        
        {/* solve error using AI */}
       {hasContent === error && (
          <Button 
           onClick={handleAIforError}
           className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#343467] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
           >
             {isAIruning ? (
               <><Loader className="animate-spin w-5 h-5 mr-2 text-blue-400"/>
                    Fixing the error<span className="animate-pulse">...</span>
               </>
             )
            :
            (
              <> 
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400"/>
              Solve Error Using AI
              </>
            )}
          </Button>
       )} 

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Output Area */}
      <div className="relative">
        <div
          className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
        rounded-xl p-4 h-[600px] overflow-auto font-mono text-sm"
        >
          <SignedIn>
            {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">Execution Error</div>
                <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-center">Run your code to see the output here...</p>
            </div>
          )}
          </SignedIn>
          <SignedOut>
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p className="text-center mb-5 ">Sign in to Run your code and see the output here...</p>
               <LoginButton  />
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;