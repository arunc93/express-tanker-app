import { useState } from "react";
import { CheckCircle, Droplets, Clock, Zap, Shield, Gift, Star, AlertCircle } from "lucide-react";
import { StatusBadge } from "./shared/StatusBadge";
import { StatCard } from "./shared/StatCard";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    tagline: "For small apartments",
    price: 1499,
    saving: 18,
    deliveries: 4,
    tanker: "500L Mini",
    frequency: "Weekly",
    features: ["4 deliveries/month", "500L per delivery", "Any weekday slot", "Email notifications", "Basic support"],
    color: "#0ea5e9",
    popular: false,
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Most popular choice",
    price: 2799,
    saving: 22,
    deliveries: 6,
    tanker: "1000L Standard",
    frequency: "Bi-weekly",
    features: ["6 deliveries/month", "1000L per delivery", "Priority time slots", "SMS + WhatsApp alerts", "24/7 support", "Free emergency delivery/month"],
    color: "#0560a6",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For villas & offices",
    price: 5499,
    saving: 28,
    deliveries: 8,
    tanker: "3000L Large",
    frequency: "Bi-weekly",
    features: ["8 deliveries/month", "3000L per delivery", "Fixed preferred schedule", "Dedicated driver", "Priority emergency support", "2 free emergency deliveries/month", "Water quality report"],
    color: "#06b6d4",
    popular: false,
  },
];

const MY_SUBSCRIPTIONS = [
  {
    id: "SUB-001",
    plan: "Standard",
    status: "Active",
    since: "1 Jan 2025",
    nextDelivery: "18 Jun 2025",
    delivered: 11,
    area: "Koramangala",
    price: 2799,
  },
];

interface SubscriptionPageProps {
  showMyPlans?: boolean;
}

export function SubscriptionPage({ showMyPlans = false }: SubscriptionPageProps) {
  const [tab, setTab] = useState<"plans" | "my">(showMyPlans ? "my" : "plans");
  const [selected, setSelected] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState<string | null>(null);
  const [billing, setBilling] = useState<"monthly" | "quarterly">("monthly");
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  function handleSubscribe(planId: string) {
    setSelected(planId);
    setSubscribeError(null);
    setTimeout(() => {
      try {
        setSubscribed(planId);
        setTab("my");
      } catch (err) {
        console.error("[SubscriptionPage] Failed to subscribe:", err);
        setSelected(null);
        setSubscribeError(err instanceof Error ? err.message : "Failed to activate subscription. Please try again.");
      }
    }, 1200);
  }

  const displayPlans = PLANS.map((p) => ({
    ...p,
    effectivePrice: billing === "quarterly" ? Math.round(p.price * 0.9) : p.price,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: "1.4rem" }}>Monthly Subscriptions</h2>
          <p className="text-muted-foreground text-sm">Guaranteed water supply, every month</p>
        </div>
        <div className="flex gap-1 bg-muted rounded-xl p-1">
          {(["plans", "my"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm cursor-pointer transition-all ${tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
              style={{ fontWeight: tab === t ? 600 : 400 }}
            >
              {t === "plans" ? "All Plans" : "My Plans"}
            </button>
          ))}
        </div>
      </div>

      {tab === "plans" && (
        <>
          {/* Benefits strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: <Zap size={16} />, label: "Priority delivery" },
              { icon: <Shield size={16} />, label: "Guaranteed supply" },
              { icon: <Gift size={16} />, label: "Save up to 28%" },
              { icon: <Star size={16} />, label: "Dedicated support" },
            ].map((b) => (
              <div key={b.label} className="bg-secondary rounded-xl px-3 py-2.5 flex items-center gap-2">
                <span className="text-primary">{b.icon}</span>
                <span className="text-sm text-foreground" style={{ fontWeight: 500 }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Billing toggle */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 bg-muted rounded-xl p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 rounded-lg text-sm cursor-pointer transition-all ${billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                style={{ fontWeight: 600 }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("quarterly")}
                className={`px-5 py-2 rounded-lg text-sm cursor-pointer transition-all ${billing === "quarterly" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                style={{ fontWeight: 600 }}
              >
                Quarterly <span className="text-xs opacity-80">Save 10%</span>
              </button>
            </div>
          </div>

          {subscribeError && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-sm mb-6">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{subscribeError}</span>
            </div>
          )}

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displayPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-card border-2 rounded-2xl overflow-hidden transition-all hover:shadow-xl ${plan.popular ? "border-primary" : "border-border"}`}
                style={{ boxShadow: plan.popular ? `0 4px 24px ${plan.color}22` : undefined }}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-xs text-center py-1.5" style={{ fontWeight: 600 }}>
                    ⭐ Most Popular
                  </div>
                )}
                <div className="p-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white"
                    style={{ backgroundColor: plan.color }}
                  >
                    <Droplets size={20} />
                  </div>
                  <h3 className="text-foreground mb-0.5" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{plan.name}</h3>
                  <p className="text-muted-foreground text-xs mb-4">{plan.tagline}</p>
                  <div className="mb-1">
                    <span className="text-foreground" style={{ fontWeight: 800, fontSize: "1.8rem" }}>₹{plan.effectivePrice.toLocaleString()}</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                  <div className="text-green-600 text-xs mb-5" style={{ fontWeight: 500 }}>Save {plan.saving}% vs one-time booking</div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Droplets size={13} className="text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{plan.tanker} · {plan.deliveries}x/month</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={13} className="text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{plan.frequency} delivery</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={13} className="text-green-500 flex-shrink-0" />
                        <span className="text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={selected === plan.id || subscribed === plan.id}
                    className={`w-full py-2.5 rounded-xl text-sm cursor-pointer transition-all ${plan.popular ? "bg-primary text-primary-foreground hover:opacity-90" : "border-2 border-primary text-primary hover:bg-secondary"} disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{ fontWeight: 600 }}
                  >
                    {selected === plan.id ? "Activating…" : subscribed === plan.id ? "✓ Active" : "Subscribe Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-12 bg-card rounded-2xl border border-border p-6">
            <h3 className="text-foreground mb-4" style={{ fontWeight: 700 }}>Common Questions</h3>
            <div className="space-y-4">
              {[
                { q: "Can I pause my subscription?", a: "Yes, you can pause up to 2 months per year from the app at no charge." },
                { q: "What if I'm not home during delivery?", a: "Our driver will fill your overhead tank directly. You can also specify a neighbour or guard to assist." },
                { q: "Is there a contract or lock-in?", a: "No lock-in. Cancel anytime with 5 days notice before your next billing cycle." },
                { q: "How is water quality ensured?", a: "All tankers are cleaned and sanitised weekly. Water is BIS 10500 certified. Quality reports on request." },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="text-foreground text-sm mb-1" style={{ fontWeight: 600 }}>{q}</div>
                  <div className="text-muted-foreground text-sm">{a}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "my" && (
        <div className="space-y-4">
          {MY_SUBSCRIPTIONS.length === 0 && !subscribed ? (
            <div className="text-center py-16">
              <Droplets size={48} className="text-muted-foreground mx-auto mb-4" />
              <div className="text-foreground mb-1" style={{ fontWeight: 600 }}>No Active Subscriptions</div>
              <p className="text-muted-foreground text-sm mb-4">Subscribe to a plan for guaranteed monthly delivery</p>
              <button onClick={() => setTab("plans")} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm cursor-pointer hover:opacity-90" style={{ fontWeight: 600 }}>
                View Plans
              </button>
            </div>
          ) : (
            <>
              {MY_SUBSCRIPTIONS.map((sub) => (
                <div key={sub.id} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-foreground" style={{ fontWeight: 700 }}>{sub.plan} Plan</h3>
                        <StatusBadge status={sub.status} />
                      </div>
                      <div className="text-muted-foreground text-xs">ID: {sub.id} · Since {sub.since}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground" style={{ fontWeight: 700, fontSize: "1.1rem" }}>₹{sub.price.toLocaleString()}/mo</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <StatCard value={String(sub.delivered)} label="Delivered" />
                    <StatCard value={sub.nextDelivery} label="Next delivery" />
                    <StatCard value={sub.area} label="Location" />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 border border-border text-foreground py-2 rounded-xl text-sm cursor-pointer hover:bg-muted transition-colors" style={{ fontWeight: 500 }}>
                      Pause
                    </button>
                    <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-opacity" style={{ fontWeight: 500 }}>
                      Manage
                    </button>
                    <button className="flex-1 border border-red-200 text-red-500 py-2 rounded-xl text-sm cursor-pointer hover:bg-red-50 transition-colors" style={{ fontWeight: 500 }}>
                      Cancel
                    </button>
                  </div>
                </div>
              ))}

              {subscribed && !MY_SUBSCRIPTIONS.find((s) => s.plan.toLowerCase() === subscribed) && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
                  <CheckCircle size={32} className="text-green-500 mx-auto mb-2" />
                  <div className="text-green-700" style={{ fontWeight: 700 }}>
                    {PLANS.find((p) => p.id === subscribed)?.name} Plan Activated!
                  </div>
                  <p className="text-green-600 text-sm mt-1">Your first delivery will be scheduled shortly</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
