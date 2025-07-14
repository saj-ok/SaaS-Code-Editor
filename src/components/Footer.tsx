"use client"

import { Blocks, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function Footer() {

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <>
      <footer className="relative border-t border-gray-800/50 mt-auto">
        <div className="absolute  inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Blocks className="size-5" />
              <span>Built for developers, by developers</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="text-gray-400 hover:text-gray-300 transition-colors">
                Support
              </Link>
              <button onClick={() => setShowPrivacyModal(true)} className="text-gray-400 hover:text-gray-300 transition-colors">
                Privacy
              </button>
              <button onClick={() => setShowTermsModal(true)} className="text-gray-400 hover:text-gray-300 transition-colors">
                Terms
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0f]/40 z-50">
          <div className="bg-[#1e1e2e] backdrop-blur-lg rounded-2xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-white">Privacy Policy</h2>
            <div className="prose max-w-none text-sm text-gray-400">
              <p>
                Your privacy is important to us. We collect minimal personal data
                and only use it to enhance your experience. We never share your
                data with third parties without your consent.
              </p>
              <p>
                For detailed information, please reach out to help section in footer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0f]/40 z-50">
          <div className="bg-[#1e1e2e] backdrop-blur-lg rounded-2xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-white">Terms of Service</h2>
            <div className="prose max-w-none text-sm text-gray-400">
              <p>
                By using CodeNexta, you agree to our terms and conditions.
                Unauthorized use is prohibited. We reserve the right to modify
                these terms at any time.
              </p>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
export default Footer;