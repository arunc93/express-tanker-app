import { useState } from "react";
import { Droplets, Phone, ChevronRight } from "lucide-react";

interface LoginPageProps {
  onLogin: (mobileNumber: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");

  function handleSubmit() {
    const cleaned = mobile.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    // Simulate sending OTP - in real app you'd call an API here
    setStep("otp");
  }

  function handleOtpSubmit() {
    onLogin(mobile);
  }

  function formatMobile(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length > 5) {
      return `${digits.slice(0, 5)} ${digits.slice(5)}`;
    }
    return digits;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background decoration */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, #0560a6 0%, #0284c7 50%, #06b6d4 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full max-w-md">
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, #0560a6, #06b6d4)" }}
          >
            <Droplets size={32} className="text-white" />
          </div>
          <h1 className="text-white text-2xl mb-1" style={{ fontWeight: 700 }}>
            ExpressTanker
          </h1>
          <p className="text-blue-200 text-sm">Bengaluru's Trusted Water Service</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 border border-border">
          {step === "mobile" ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-foreground text-xl mb-1" style={{ fontWeight: 700 }}>
                  Welcome
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter your mobile number to get started
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-foreground mb-1.5 block" style={{ fontWeight: 600 }}>
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <Phone size={16} className="text-muted-foreground" />
                      <span className="text-foreground text-sm" style={{ fontWeight: 500 }}>+91</span>
                      <div className="w-px h-5 bg-border" />
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={formatMobile(mobile)}
                      onChange={(e) => {
                        setMobile(e.target.value);
                        setError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                      }}
                      placeholder="98765 43210"
                      className="w-full h-12 pl-20 pr-4 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      style={{ fontWeight: 500, fontSize: "1rem" }}
                      autoFocus
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠</span> {error}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={mobile.replace(/\D/g, "").length !== 10}
                  className="w-full h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Send OTP
                  <ChevronRight size={18} />
                </button>

                <p className="text-center text-muted-foreground text-xs leading-relaxed">
                  By continuing, you agree to our{" "}
                  <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>{" "}
                  and{" "}
                  <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="text-foreground text-xl mb-1" style={{ fontWeight: 700 }}>
                  Verify OTP
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter the 6-digit code sent to{" "}
                  <span className="text-foreground" style={{ fontWeight: 600 }}>+91 {formatMobile(mobile)}</span>
                </p>
              </div>

              <OtpInput onComplete={handleOtpSubmit} />

              <div className="mt-4 text-center">
                <button
                  onClick={() => setStep("mobile")}
                  className="text-muted-foreground text-sm cursor-pointer hover:text-primary transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  ← Change number
                </button>
              </div>
            </>
          )}
        </div>

        {/* Trust badges */}
        <div className="flex justify-center gap-6 mt-8">
          <div className="flex items-center gap-1.5 text-blue-200 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            BIS Certified
          </div>
          <div className="flex items-center gap-1.5 text-blue-200 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            GPS Tracked
          </div>
          <div className="flex items-center gap-1.5 text-blue-200 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            24/7 Support
          </div>
        </div>
      </div>
    </div>
  );
}

function OtpInput({ onComplete }: { onComplete: () => void }) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = Array.from({ length: 6 }, () => useState<HTMLInputElement | null>(null));

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    if (newOtp.every((d) => d !== "") && newOtp.length === 6) {
      setTimeout(() => onComplete(), 300);
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!data) return;
    const newOtp = [...otp];
    for (let i = 0; i < data.length; i++) {
      newOtp[i] = data[i];
    }
    setOtp(newOtp);
    const nextIndex = Math.min(data.length, 5);
    const nextInput = document.getElementById(`otp-${nextIndex}`);
    nextInput?.focus();
    if (newOtp.every((d) => d !== "")) {
      setTimeout(() => onComplete(), 300);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            maxLength={1}
            className="w-12 h-14 text-center rounded-xl border border-border bg-input-background text-foreground text-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            style={{ fontWeight: 700, fontSize: "1.25rem" }}
            autoFocus={index === 0}
          />
        ))}
      </div>

      <button
        onClick={onComplete}
        disabled={otp.some((d) => d === "")}
        className="w-full h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ fontWeight: 600, fontSize: "1rem" }}
      >
        Verify & Continue
        <ChevronRight size={18} />
      </button>

      <div className="text-center">
        <button className="text-primary text-sm cursor-pointer hover:underline" style={{ fontWeight: 500 }}>
          Resend OTP
        </button>
      </div>
    </div>
  );
}