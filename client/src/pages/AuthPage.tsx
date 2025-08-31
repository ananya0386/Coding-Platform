import React, { useState } from "react";

const AuthPage: React.FC = () => {
  const [step, setStep] = useState<"login" | "verify">("login");
  const [code, setCode] = useState("");

  const handleGoogleLogin = () => {
    // In real app: redirect to Google OAuth
    console.log("Redirecting to Google login...");
    setStep("verify"); // simulate redirecting and then showing verification step
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Code entered:", code);
    // In real app: verify with backend
    alert("✅ Code verified! Redirecting...");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        {step === "login" ? (
          <>
            <h2 className="text-center text-2xl font-bold mb-6">
              Sign In / Sign Up
            </h2>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 w-full rounded-lg border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              {/* Inline Google "G" icon */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 488 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#EA4335"
                  d="M488 261.8C488 403.3 391.1 504 248.5 504 111.3 504 0 392.7 0 255.5S111.3 7 248.5 7c66.5 0 122 24.4 163.8 64.6l-66.3 63.3C322.3 105.6 288 91.5 248.5 91.5c-90 0-163 74-163 164s73 164 163 164c83.4 0 139-58.1 144.6-112.6H248.5v-89.1H488v43z"
                />
              </svg>
              Continue with Google
            </button>
          </>
        ) : (
          <>
            <h2 className="text-center text-2xl font-bold mb-6">
              Verify Your Code
            </h2>
            <p className="mb-4 text-center text-gray-600">
              Enter the code you received via Gmail
            </p>
            <form onSubmit={handleVerify} className="space-y-4">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                required
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 transition"
              >
                Verify
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
