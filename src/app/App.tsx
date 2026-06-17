import { useState } from "react";
import { Droplets, Home, BookOpen, MapPin, Star, History, Menu, X, Phone, Bell } from "lucide-react";
import { HomePage } from "./components/HomePage";
import { BookingPage } from "./components/BookingPage";
import { TrackingPage } from "./components/TrackingPage";
import { SubscriptionPage } from "./components/SubscriptionPage";
import { OrderHistory } from "./components/OrderHistory";

{/* MARKER-MAKE-KIT-INVOKED */}

type Page = "home" | "book" | "track" | "subscribe" | "history";

const TANKER_DEFAULT = { id: 2, name: "Standard Tanker", capacity: "1000 Litres", price: 499, delivery: "1-2 hrs" };

const NAV_ITEMS = [
  { id: "home" as Page, label: "Home", icon: <Home size={18} /> },
  { id: "book" as Page, label: "Book Water", icon: <Droplets size={18} /> },
  { id: "track" as Page, label: "Track Order", icon: <MapPin size={18} /> },
  { id: "subscribe" as Page, label: "Subscribe", icon: <Star size={18} /> },
  { id: "history" as Page, label: "History", icon: <History size={18} /> },
];

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedTanker, setSelectedTanker] = useState(TANKER_DEFAULT);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(2);

  function handleBook(tanker: typeof TANKER_DEFAULT) {
    setSelectedTanker(tanker);
    setPage("book");
    setMobileMenuOpen(false);
  }

  function handleOrderPlaced(orderId: string) {
    setActiveOrderId(orderId);
    setPage("track");
    setNotifications((n) => n + 1);
  }

  function navigate(p: Page) {
    setPage(p);
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0560a6, #06b6d4)" }}
            >
              <Droplets size={16} className="text-white" />
            </div>
            <div>
              <span className="text-foreground" style={{ fontWeight: 700, fontSize: "1rem" }}>ExpressTanker</span>
              <span className="hidden sm:inline text-muted-foreground text-xs ml-1">Bengaluru</span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-all ${page === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                style={{ fontWeight: page === item.id ? 600 : 400 }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {activeOrderId && (
              <button
                onClick={() => navigate("track")}
                className="hidden sm:flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 rounded-lg text-xs cursor-pointer hover:opacity-90 transition-opacity"
                style={{ fontWeight: 600 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live tracking
              </button>
            )}
            <button className="relative p-2 rounded-lg hover:bg-secondary cursor-pointer text-muted-foreground hover:text-foreground">
              <Bell size={18} />
              {notifications > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center"
                  style={{ fontSize: "9px", fontWeight: 700 }}
                >
                  {notifications}
                </span>
              )}
            </button>
            <a
              href="tel:18001234567"
              className="hidden sm:flex items-center gap-1.5 border border-border text-foreground px-3 py-1.5 rounded-lg text-xs cursor-pointer hover:bg-secondary transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Phone size={13} />
              1800-123-4567
            </a>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary cursor-pointer text-muted-foreground"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 pb-4 pt-2 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all text-left ${page === item.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}
                style={{ fontWeight: page === item.id ? 600 : 400 }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Announcement banner */}
      {page === "home" && (
        <div className="bg-accent text-accent-foreground text-center text-xs py-2" style={{ fontWeight: 500 }}>
          🌊 Summer water shortage in Bengaluru — JalSeva guarantees delivery. <span className="underline cursor-pointer" onClick={() => navigate("subscribe")}>Subscribe now</span>
        </div>
      )}

      {/* Main content */}
      <main>
        {page === "home" && <HomePage onBook={handleBook} navigate={navigate} />}
        {page === "book" && (
          <BookingPage
            selectedTanker={selectedTanker}
            onBack={() => setPage("home")}
            onOrderPlaced={handleOrderPlaced}
          />
        )}
        {page === "track" && (
          <TrackingPage
            orderId={activeOrderId ?? "JSD-934521"}
            onRate={() => setNotifications((n) => Math.max(0, n - 1))}
          />
        )}
        {page === "subscribe" && <SubscriptionPage />}
        {page === "history" && <OrderHistory onReorder={() => navigate("book")} />}
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-card border-t border-border z-40">
        <div className="flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 cursor-pointer transition-colors ${page === item.id ? "text-primary" : "text-muted-foreground"}`}
            >
              {item.icon}
              <span className="text-[10px]" style={{ fontWeight: page === item.id ? 600 : 400 }}>{item.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <footer className="hidden md:block bg-foreground text-secondary py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0560a6, #06b6d4)" }}>
                  <Droplets size={14} className="text-white" />
                </div>
                <span className="text-white" style={{ fontWeight: 700 }}>JalSeva</span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">Bengaluru's most trusted water tanker delivery service. BIS certified, GPS tracked, 24/7 support.</p>
            </div>
            {[
              { title: "Services", links: ["Book Tanker", "Monthly Plans", "Emergency Delivery", "Bulk Orders"] },
              { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
              { title: "Support", links: ["Help Centre", "Track Order", "Cancel Booking", "Contact Us"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>{col.title}</div>
                <div className="space-y-2">
                  {col.links.map((link) => (
                    <div key={link} className="text-muted-foreground text-xs cursor-pointer hover:text-white transition-colors">{link}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>© 2025 JalSeva Technologies Pvt. Ltd. · Bengaluru, Karnataka</span>
            <span>All water BIS 10500 certified · BBMP licensed operator</span>
          </div>
        </div>
      </footer>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16" />
    </div>
  );
}
