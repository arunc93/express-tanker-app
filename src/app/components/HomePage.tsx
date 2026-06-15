import { useState } from "react";
import { Droplets, Clock, MapPin, Shield, Star, ChevronRight, Phone, Truck } from "lucide-react";

const TANKERS = [
  {
    id: 1,
    name: "Mini Tanker",
    capacity: "500 Litres",
    price: 299,
    delivery: "2-3 hrs",
    //image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=260&fit=crop&auto=format",
    //image: "https://unsplash.com/photos/a-red-tractor-pulling-a-blue-trailer-down-a-street-fKXAjJoj3KM",
    image: "https://images.unsplash.com/photo-1718218722121-5b15e91aef8e?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Best for apartments",
    rating: 4.7,
    reviews: 238,
    color: "#0ea5e9",
  },
  {
    id: 2,
    name: "Standard Tanker",
    capacity: "1000 Litres",
    price: 499,
    delivery: "1-2 hrs",
    //image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&h=260&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1737770612497-854f4a7d3e8c?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Most Popular",
    rating: 4.9,
    reviews: 512,
    color: "#0560a6",
  },
  {
    id: 3,
    name: "Large Tanker",
    capacity: "3000 Litres",
    price: 999,
    delivery: "Same day",
    //image: "https://images.unsplash.com/photo-1545816250-0085c0b12aea?w=400&h=260&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1695601510327-1553ba5f8bb4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Ideal for villas & offices",
    rating: 4.8,
    reviews: 167,
    color: "#06b6d4",
  },
  {
    id: 4,
    name: "Mega Tanker",
    capacity: "6000 Litres",
    price: 1799,
    delivery: "Scheduled",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=260&fit=crop&auto=format",
    tag: "For construction & bulk",
    rating: 4.6,
    reviews: 94,
    color: "#0c1a2e",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    area: "Koramangala",
    text: "Booked at 8am and water was delivered by 10:30! The driver was professional and the water quality is excellent. Subscribed to the monthly plan now.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Rajan Nair",
    area: "Whitefield",
    text: "During the summer crisis, JalSeva was the only reliable option in our area. Real-time tracking is a game changer. Highly recommended!",
    rating: 5,
    avatar: "RN",
  },
  {
    name: "Meenakshi Reddy",
    area: "Indiranagar",
    text: "Monthly subscription saves me so much hassle. Every Tuesday my 1000L tank is filled without me doing anything. Pure convenience.",
    rating: 4,
    avatar: "MR",
  },
];

interface HomePageProps {
  onBook: (tanker: typeof TANKERS[0]) => void;
}

export function HomePage({ onBook }: HomePageProps) {
  const [hoveredTanker, setHoveredTanker] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0560a6 0%, #0284c7 50%, #06b6d4 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
              <Droplets size={14} className="text-cyan-200" />
              <span className="text-sm text-cyan-100">Bengaluru's Trusted Water Service</span>
            </div>
            <h1 className="text-4xl md:text-5xl text-white mb-4" style={{ fontWeight: 700, lineHeight: 1.15 }}>
              Clean Water<br />Delivered Fast
            </h1>
            <p className="text-blue-100 mb-8 max-w-md" style={{ fontSize: "1.1rem" }}>
              Book a water tanker in under 2 minutes. Tracked delivery, certified clean water, covering all 198 wards of Bengaluru.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onBook(TANKERS[1])}
                className="bg-white text-primary px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-50 transition-all"
                style={{ fontWeight: 600 }}
              >
                Book Now
              </button>
              <button
                className="border border-white/40 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-white/10 transition-all"
                style={{ fontWeight: 500 }}
              >
                View Plans
              </button>
            </div>
            <div className="flex gap-6 mt-8">
              <div>
                <div className="text-white" style={{ fontWeight: 700, fontSize: "1.4rem" }}>12,000+</div>
                <div className="text-blue-200 text-sm">Happy Customers</div>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <div className="text-white" style={{ fontWeight: 700, fontSize: "1.4rem" }}>198</div>
                <div className="text-blue-200 text-sm">Wards Covered</div>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <div className="text-white" style={{ fontWeight: 700, fontSize: "1.4rem" }}>4.8★</div>
                <div className="text-blue-200 text-sm">Avg Rating</div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72">
              <div
                className="absolute inset-0 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
              />
              <div className="absolute inset-8 rounded-full bg-white/10 flex items-center justify-center">
                <Droplets size={100} className="text-white opacity-80" />
              </div>
              <div className="absolute -top-2 -right-2 bg-white rounded-2xl px-3 py-2 shadow-lg">
                <div className="text-xs text-muted-foreground">Live Tracking</div>
                <div className="text-primary" style={{ fontWeight: 600, fontSize: "0.85rem" }}>EN route · 12 min</div>
              </div>
              <div className="absolute -bottom-2 -left-2 bg-white rounded-2xl px-3 py-2 shadow-lg">
                <div className="text-xs text-muted-foreground">Water Quality</div>
                <div className="text-green-600" style={{ fontWeight: 600, fontSize: "0.85rem" }}>BIS Certified ✓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-foreground mb-2" style={{ fontWeight: 700 }}>How It Works</h2>
          <p className="text-center text-muted-foreground mb-10">Get water delivered in 3 simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <MapPin size={28} />, step: "01", title: "Enter Location", desc: "Enter your address or use GPS. We cover all of Bengaluru including outskirts." },
              { icon: <Truck size={28} />, step: "02", title: "Choose & Book", desc: "Pick tanker size, preferred time slot, and pay securely online." },
              { icon: <Droplets size={28} />, step: "03", title: "Track & Receive", desc: "Watch your tanker on a live map and get notified when it arrives." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground mb-4">
                  {item.icon}
                </div>
                <div className="text-muted-foreground text-xs mb-1" style={{ fontWeight: 600, letterSpacing: "0.1em" }}>STEP {item.step}</div>
                <h3 className="text-foreground mb-2" style={{ fontWeight: 600 }}>{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tanker Options */}
      <section className="py-14 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-foreground mb-1" style={{ fontWeight: 700 }}>Choose Your Tanker</h2>
              <p className="text-muted-foreground text-sm">Right-size water delivery for your needs</p>
            </div>
            <span className="text-primary text-sm cursor-pointer flex items-center gap-1" style={{ fontWeight: 500 }}>
              View all <ChevronRight size={14} />
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TANKERS.map((t) => (
              <div
                key={t.id}
                className="bg-card rounded-2xl overflow-hidden border border-border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ boxShadow: hoveredTanker === t.id ? `0 8px 32px ${t.color}22` : undefined }}
                onMouseEnter={() => setHoveredTanker(t.id)}
                onMouseLeave={() => setHoveredTanker(null)}
              >
                <div className="relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className="text-white text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: t.color, fontWeight: 600 }}
                    >
                      {t.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-foreground" style={{ fontWeight: 600 }}>{t.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                      <Star size={12} fill="currentColor" />
                      <span style={{ fontWeight: 600 }}>{t.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                    <Droplets size={12} />
                    <span>{t.capacity}</span>
                    <span className="mx-1">·</span>
                    <Clock size={12} />
                    <span>{t.delivery}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-foreground" style={{ fontWeight: 700, fontSize: "1.1rem" }}>₹{t.price}</span>
                      <span className="text-muted-foreground text-xs"> /delivery</span>
                    </div>
                    <button
                      onClick={() => onBook(t)}
                      className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ fontWeight: 600 }}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-10 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={24} />, label: "BIS Certified", sub: "Quality guaranteed" },
              { icon: <Clock size={24} />, label: "On-Time Delivery", sub: "98.2% on-time rate" },
              { icon: <MapPin size={24} />, label: "Live GPS Tracking", sub: "Real-time updates" },
              { icon: <Phone size={24} />, label: "24/7 Support", sub: "Always here to help" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
                <div className="text-primary">{item.icon}</div>
                <div>
                  <div className="text-foreground text-sm" style={{ fontWeight: 600 }}>{item.label}</div>
                  <div className="text-muted-foreground text-xs">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-foreground mb-2" style={{ fontWeight: 700 }}>What Bengalureans Say</h2>
          <p className="text-center text-muted-foreground mb-10 text-sm">Trusted by thousands across the city</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: "#0560a6", fontWeight: 700 }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-foreground text-sm" style={{ fontWeight: 600 }}>{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.area}, Bengaluru</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
