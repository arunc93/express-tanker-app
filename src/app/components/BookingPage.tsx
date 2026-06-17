import { useState } from "react";
import { MapPin, Clock, Droplets, ChevronLeft, CheckCircle, Calendar, CreditCard, User, Phone, AlertCircle } from "lucide-react";
import { TANKERS, type Tanker } from "../data/tankers";
import { TIME_SLOTS, AREAS, FORM_INPUT_CLASS } from "../data/constants";
import { PageHeader } from "./shared/PageHeader";

interface BookingPageProps {
  selectedTanker: Tanker | null;
  onBack: () => void;
  onOrderPlaced: (orderId: string) => void;
}

export function BookingPage({ selectedTanker, onBack, onOrderPlaced }: BookingPageProps) {
  const [step, setStep] = useState(1);
  const [tankerId, setTankerId] = useState(selectedTanker?.id ?? 2);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const tanker = TANKERS.find((t) => t.id === tankerId) ?? TANKERS[1];
  const tax = Math.round(tanker.price * 0.05);
  const total = tanker.price + tax + 49;

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date(today.setDate(today.getDate() + 30)).toISOString().split("T")[0];

  function handlePlaceOrder() {
    setIsPlacing(true);
    setOrderError(null);
    setTimeout(() => {
      try {
        const orderId = "JSD" + Math.floor(100000 + Math.random() * 900000);
        setIsPlacing(false);
        onOrderPlaced(orderId);
      } catch (err) {
        console.error("[BookingPage] Failed to place order:", err);
        setIsPlacing(false);
        setOrderError(err instanceof Error ? err.message : "Failed to place order. Please try again.");
      }
    }, 1800);
  }

  const canProceedStep1 = tankerId && date && timeSlot;
  const canProceedStep2 = area && address && name && phone.length === 10;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-primary text-sm mb-6 cursor-pointer hover:opacity-70 transition-opacity" style={{ fontWeight: 500 }}>
        <ChevronLeft size={16} /> Back
      </button>
      <div className="mb-8">
        <PageHeader title="Book Water Tanker" subtitle="Fast delivery across Bengaluru" />
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8">
        {["Select & Schedule", "Address", "Payment"].map((label, i) => (
          <div key={i} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                style={{ fontWeight: 600 }}
              >
                {step > i + 1 ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${step === i + 1 ? "text-foreground" : "text-muted-foreground"}`} style={{ fontWeight: step === i + 1 ? 600 : 400 }}>
                {label}
              </span>
            </div>
            {i < 2 && <div className={`h-px w-8 sm:w-16 mx-2 ${step > i + 1 ? "bg-green-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
              {/* Tanker selection */}
              <div>
                <label className="block text-foreground mb-3 text-sm" style={{ fontWeight: 600 }}>Select Tanker Size</label>
                <div className="grid grid-cols-2 gap-3">
                  {TANKERS.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setTankerId(t.id)}
                      className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${tankerId === t.id ? "border-primary bg-secondary" : "border-border hover:border-primary/40"}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Droplets size={14} className={tankerId === t.id ? "text-primary" : "text-muted-foreground"} />
                        <span className="text-sm" style={{ fontWeight: 600 }}>{t.name}</span>
                      </div>
                      <div className="text-muted-foreground text-xs">{t.capacity}</div>
                      <div className="text-foreground text-sm mt-1" style={{ fontWeight: 700 }}>₹{t.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-foreground mb-2 text-sm" style={{ fontWeight: 600 }}>
                  <Calendar size={14} className="inline mr-2" />Delivery Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => setDate(e.target.value)}
                  className={FORM_INPUT_CLASS}
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-foreground mb-3 text-sm" style={{ fontWeight: 600 }}>
                  <Clock size={14} className="inline mr-2" />Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <div
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`border rounded-xl px-3 py-2 text-xs cursor-pointer transition-all text-center ${timeSlot === slot ? "border-primary bg-secondary text-primary" : "border-border hover:border-primary/40 text-muted-foreground"}`}
                      style={{ fontWeight: timeSlot === slot ? 600 : 400 }}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => canProceedStep1 && setStep(2)}
                disabled={!canProceedStep1}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontWeight: 600 }}
              >
                Continue to Address →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
              <div>
                <label className="block text-foreground mb-2 text-sm" style={{ fontWeight: 600 }}>
                  <User size={14} className="inline mr-2" />Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={FORM_INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-foreground mb-2 text-sm" style={{ fontWeight: 600 }}>
                  <Phone size={14} className="inline mr-2" />Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className={FORM_INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-foreground mb-2 text-sm" style={{ fontWeight: 600 }}>
                  <MapPin size={14} className="inline mr-2" />Area / Locality
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className={FORM_INPUT_CLASS}
                >
                  <option value="">Select area</option>
                  {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-foreground mb-2 text-sm" style={{ fontWeight: 600 }}>Full Address</label>
                <textarea
                  placeholder="House/Flat No., Street, Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className={`${FORM_INPUT_CLASS} resize-none`}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-border text-foreground py-3 rounded-xl cursor-pointer hover:bg-muted transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => canProceedStep2 && setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontWeight: 600 }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
              <label className="block text-foreground mb-3 text-sm" style={{ fontWeight: 600 }}>
                <CreditCard size={14} className="inline mr-2" />Payment Method
              </label>
              <div className="space-y-3">
                {[
                  { id: "upi", label: "UPI / GPay / PhonePe", icon: "📱" },
                  { id: "card", label: "Credit / Debit Card", icon: "💳" },
                  { id: "netbanking", label: "Net Banking", icon: "🏦" },
                  { id: "cod", label: "Cash on Delivery", icon: "💵" },
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`border-2 rounded-xl px-4 py-3 cursor-pointer flex items-center gap-3 transition-all ${paymentMethod === m.id ? "border-primary bg-secondary" : "border-border"}`}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <span className="text-sm" style={{ fontWeight: paymentMethod === m.id ? 600 : 400 }}>{m.label}</span>
                    {paymentMethod === m.id && <CheckCircle size={16} className="ml-auto text-primary" />}
                  </div>
                ))}
              </div>
              {paymentMethod === "upi" && (
                <div>
                  <label className="block text-foreground mb-2 text-xs" style={{ fontWeight: 600 }}>UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className={FORM_INPUT_CLASS}
                  />
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-border text-foreground py-3 rounded-xl cursor-pointer hover:bg-muted transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  ← Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-70"
                  style={{ fontWeight: 600 }}
                >
                  {isPlacing ? "Placing Order…" : `Pay ₹${total}`}
                </button>
              </div>
              {orderError && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-sm">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{orderError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl border border-border p-5 sticky top-4">
            <h3 className="text-foreground mb-4 text-sm" style={{ fontWeight: 700 }}>Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{tanker.name}</span>
                <span className="text-foreground" style={{ fontWeight: 500 }}>₹{tanker.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery charge</span>
                <span className="text-foreground" style={{ fontWeight: 500 }}>₹49</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (5%)</span>
                <span className="text-foreground" style={{ fontWeight: 500 }}>₹{tax}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-foreground" style={{ fontWeight: 700 }}>Total</span>
                <span className="text-primary" style={{ fontWeight: 700, fontSize: "1.05rem" }}>₹{total}</span>
              </div>
            </div>
            {date && (
              <div className="mt-4 p-3 bg-secondary rounded-xl text-xs text-muted-foreground space-y-1">
                <div><Calendar size={12} className="inline mr-1" />{new Date(date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}</div>
                {timeSlot && <div><Clock size={12} className="inline mr-1" />{timeSlot}</div>}
                {area && <div><MapPin size={12} className="inline mr-1" />{area}, Bengaluru</div>}
              </div>
            )}
            <div className="mt-4 flex items-center gap-2 text-xs text-green-600 bg-green-50 rounded-xl p-3">
              <CheckCircle size={14} />
              <span>100% BIS Certified water quality</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
