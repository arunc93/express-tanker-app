import { Droplets, Clock, RotateCcw } from "lucide-react";
import { PageHeader } from "./shared/PageHeader";
import { StarRating } from "./shared/StarRating";
import { StatusBadge } from "./shared/StatusBadge";
import { StatCard } from "./shared/StatCard";

const ORDERS = [
  {
    id: "JSD-934521",
    tanker: "Standard Tanker",
    capacity: "1000L",
    date: "12 Jun 2025",
    time: "08:00 – 10:00 AM",
    area: "Koramangala, Bengaluru",
    status: "Delivered",
    amount: 548,
    rating: 5,
    driver: "Suresh Kumar",
  },
  {
    id: "JSD-891044",
    tanker: "Mini Tanker",
    capacity: "500L",
    date: "5 Jun 2025",
    time: "10:00 AM – 12:00 PM",
    area: "Koramangala, Bengaluru",
    status: "Delivered",
    amount: 348,
    rating: 4,
    driver: "Ravi Prasad",
  },
  {
    id: "JSD-872318",
    tanker: "Large Tanker",
    capacity: "3000L",
    date: "28 May 2025",
    time: "06:00 – 08:00 AM",
    area: "Koramangala, Bengaluru",
    status: "Delivered",
    amount: 1098,
    rating: 5,
    driver: "Anand Rao",
  },
  {
    id: "JSD-858102",
    tanker: "Standard Tanker",
    capacity: "1000L",
    date: "20 May 2025",
    time: "02:00 – 04:00 PM",
    area: "Koramangala, Bengaluru",
    status: "Cancelled",
    amount: 548,
    rating: null,
    driver: "—",
  },
];

interface OrderHistoryProps {
  onReorder: () => void;
}

export function OrderHistory({ onReorder }: OrderHistoryProps) {
  const total = ORDERS.filter((o) => o.status === "Delivered").reduce((a, o) => a + o.amount, 0);
  const deliveries = ORDERS.filter((o) => o.status === "Delivered").length;
  const water = ORDERS.filter((o) => o.status === "Delivered").reduce((a, o) => a + parseInt(o.capacity), 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader title="Order History" subtitle="All your past and upcoming deliveries" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard value={String(deliveries)} label="Deliveries" />
        <StatCard value={`${water.toLocaleString()}L`} label="Water received" />
        <StatCard value={`₹${total.toLocaleString()}`} label="Total spent" />
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {ORDERS.map((order) => {
          return (
            <div key={order.id} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-foreground text-sm" style={{ fontWeight: 700 }}>{order.tanker}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="text-muted-foreground text-xs">Order #{order.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-foreground text-sm" style={{ fontWeight: 700 }}>₹{order.amount}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Droplets size={11} />{order.capacity}</span>
                <span className="flex items-center gap-1"><Clock size={11} />{order.date} · {order.time}</span>
              </div>

              {order.rating !== null && (
                <div className="flex items-center gap-1 mb-3">
                  <StarRating rating={order.rating ?? 0} size={13} />
                  <span className="text-muted-foreground text-xs ml-1">· {order.driver}</span>
                </div>
              )}

              <button
                onClick={onReorder}
                className="flex items-center gap-1.5 text-primary text-xs cursor-pointer hover:opacity-70 transition-opacity"
                style={{ fontWeight: 600 }}
              >
                <RotateCcw size={12} />
                Reorder
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
