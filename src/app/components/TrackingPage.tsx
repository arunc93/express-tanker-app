import { useState, useEffect } from "react";
import { CheckCircle, Circle, Truck, Droplets, MapPin, Phone, Clock, Star, AlertCircle } from "lucide-react";
import { BRAND_GRADIENT } from "../data/constants";
import { PageHeader } from "./shared/PageHeader";
import { StarRating } from "./shared/StarRating";

const STAGES = [
  { id: 0, label: "Order Confirmed", sub: "Payment received successfully", icon: <CheckCircle size={18} />, time: "10:02 AM" },
  { id: 1, label: "Tanker Assigned", sub: "Driver: Suresh Kumar · KA-05-HB-4921", icon: <Truck size={18} />, time: "10:08 AM" },
  { id: 2, label: "En Route", sub: "Tanker is on the way to your location", icon: <MapPin size={18} />, time: "10:25 AM" },
  { id: 3, label: "Arrived", sub: "Tanker has reached your location", icon: <Droplets size={18} />, time: "" },
  { id: 4, label: "Delivered", sub: "Water delivered successfully", icon: <CheckCircle size={18} />, time: "" },
];

interface TrackingPageProps {
  orderId: string;
  onRate: () => void;
}

export function TrackingPage({ orderId, onRate }: TrackingPageProps) {
  const [currentStage, setCurrentStage] = useState(2);
  const [eta, setEta] = useState(18);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [ratingError, setRatingError] = useState<string | null>(null);

  useEffect(() => {
    if (currentStage >= 4) return;
    const timer = setInterval(() => {
      setEta((prev) => {
        if (prev <= 1) {
          setCurrentStage((s) => Math.min(s + 1, 4));
          return prev <= 1 ? 0 : prev - 1;
        }
        return prev - 1;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [currentStage]);

  useEffect(() => {
    if (currentStage === 3) {
      const t = setTimeout(() => setCurrentStage(4), 8000);
      return () => clearTimeout(t);
    }
    if (currentStage === 4) {
      const t = setTimeout(() => setShowFeedback(true), 1000);
      return () => clearTimeout(t);
    }
  }, [currentStage]);

  function handleRating(r: number) {
    setRating(r);
    setRatingError(null);
    setTimeout(() => {
      try {
        setRated(true);
        onRate();
      } catch (err) {
        console.error("[TrackingPage] Failed to submit rating:", err);
        setRated(false);
        setRatingError(err instanceof Error ? err.message : "Failed to submit rating. Please try again.");
      }
    }, 600);
  }

  const stagesWithTime = STAGES.map((s, i) => ({
    ...s,
    time: i <= currentStage ? (s.time || new Date(Date.now() + i * 480000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })) : "",
  }));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader title="Track Your Order" subtitle={`Order ID: ${orderId}`} />

      {/* ETA Banner */}
      <div
        className="rounded-2xl p-5 mb-6 text-white flex items-center justify-between"
        style={{ background: BRAND_GRADIENT }}
      >
        <div>
          <div className="text-blue-100 text-xs mb-1" style={{ fontWeight: 500 }}>
            {currentStage < 3 ? "Estimated Arrival" : currentStage === 3 ? "Tanker Arrived!" : "Delivered!"}
          </div>
          <div className="text-white" style={{ fontWeight: 700, fontSize: "1.6rem" }}>
            {currentStage < 3 ? `${eta} min` : currentStage === 3 ? "🎉 Here now" : "✅ Done"}
          </div>
          <div className="text-blue-200 text-xs mt-1">Standard Tanker · 1000L · Koramangala</div>
        </div>
        <div className="text-right">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <Truck size={32} className={`text-white ${currentStage === 2 ? "animate-bounce" : ""}`} />
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      {currentStage < 4 && (
        <div className="relative rounded-2xl overflow-hidden bg-secondary border border-border mb-6 h-44 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&h=250&fit=crop&auto=format"
            alt="Map view"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative text-center">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-2 animate-pulse">
              <Truck size={22} className="text-white" />
            </div>
            <div className="text-foreground text-sm" style={{ fontWeight: 600 }}>Live Map Tracking</div>
            <div className="text-muted-foreground text-xs">Driver is en route via Hosur Road</div>
          </div>
        </div>
      )}

      {/* Progress stages */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-6">
        <h3 className="text-foreground mb-5 text-sm" style={{ fontWeight: 700 }}>Delivery Progress</h3>
        <div className="space-y-0">
          {stagesWithTime.map((stage, i) => {
            const done = i < currentStage;
            const active = i === currentStage;
            return (
              <div key={stage.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${done ? "bg-green-500 text-white" : active ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground"}`}
                  >
                    {done ? <CheckCircle size={16} /> : active ? stage.icon : <Circle size={16} />}
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className={`w-0.5 h-10 mt-1 ${done ? "bg-green-500" : "bg-border"}`} />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm ${done || active ? "text-foreground" : "text-muted-foreground"}`}
                      style={{ fontWeight: done || active ? 600 : 400 }}
                    >
                      {stage.label}
                    </span>
                    {stage.time && <span className="text-xs text-muted-foreground">{stage.time}</span>}
                  </div>
                  <span className="text-xs text-muted-foreground">{stage.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Driver info */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: "#0560a6", fontWeight: 700, fontSize: "1rem" }}
          >
            SK
          </div>
          <div>
            <div className="text-foreground text-sm" style={{ fontWeight: 600 }}>Suresh Kumar</div>
            <div className="flex items-center gap-1 text-amber-500 text-xs">
              <Star size={11} fill="currentColor" />
              <span style={{ fontWeight: 500 }}>4.9</span>
              <span className="text-muted-foreground">· 2,341 deliveries</span>
            </div>
            <div className="text-muted-foreground text-xs mt-0.5">KA-05-HB-4921</div>
          </div>
        </div>
        <a
          href="tel:+919876543210"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-opacity"
          style={{ fontWeight: 600 }}
        >
          <Phone size={14} />
          Call
        </a>
      </div>

      {/* Rating after delivery */}
      {showFeedback && !rated && (
        <div className="bg-card rounded-2xl border border-primary/30 p-5 text-center">
          <h3 className="text-foreground mb-1" style={{ fontWeight: 700 }}>Rate your delivery</h3>
          <p className="text-muted-foreground text-sm mb-4">How was your experience?</p>
          <StarRating rating={rating} size={32} interactive onRate={handleRating} />
          {ratingError && (
            <div className="flex items-center justify-center gap-2 text-red-600 text-sm mt-3">
              <AlertCircle size={14} />
              <span>{ratingError}</span>
            </div>
          )}
        </div>
      )}

      {rated && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
          <CheckCircle size={28} className="text-green-500 mx-auto mb-2" />
          <div className="text-green-700 text-sm" style={{ fontWeight: 600 }}>Thanks for your feedback!</div>
          <div className="text-green-600 text-xs mt-1">Your rating helps us improve service quality</div>
        </div>
      )}

      {/* Order details strip */}
      <div className="mt-4 p-4 bg-secondary rounded-xl text-xs text-muted-foreground flex flex-wrap gap-4">
        <span><Clock size={11} className="inline mr-1" />Booked 10:02 AM</span>
        <span><Droplets size={11} className="inline mr-1" />1000 L · Standard Tanker</span>
        <span><MapPin size={11} className="inline mr-1" />Koramangala, Bengaluru</span>
        <span className="text-green-600" style={{ fontWeight: 500 }}>₹548 paid via UPI</span>
      </div>
    </div>
  );
}
