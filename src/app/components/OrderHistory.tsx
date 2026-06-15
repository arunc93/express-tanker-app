import { Clock, CheckCircle, Truck, XCircle, Droplets, RotateCcw, Star } from "lucide-react";

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

const STATUS_CONFIG = {
  Delivered: { color: "text-green-700", bg: "bg-green-100", icon: <CheckCircle size={13} /> },
  "En Route": { color: "text-blue-700", bg: "bg-blue-100", icon: <Truck size={13} /> },
  Scheduled: { color: "text-amber-700", bg: "bg-amber-100", icon: <Clock size={13} /> },
  Cancelled: { color: "text-red-700", bg: "bg-red-100", icon: <XCircle size={13} /> },
};

interface OrderHistoryProps {
  onReorder: () => void;
}

export function OrderHistory({ onReorder }: OrderHistoryProps) {
  const total = ORDERS.filter((o) => o.status === "Delivered").reduce((a, o) => a + o.amount, 0);
  const deliveries = ORDERS.filter((o) => o.status === "Delivered").length;
  const water = ORDERS.filter((o) => o.status === "Delivered").reduce((a, o) => a + parseInt(o.capacity), 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: "1.4rem" }}>Order History</h2>
      <p className="text-muted-foreground text-sm mb-6">All your past and upcoming deliveries</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-2xl border border-border p-4 text-center">
          <div className="text-primary" style={{ fontWeight: 700, fontSize: "1.4rem" }}>{deliveries}</div>
          <div className="text-muted-foreground text-xs mt-0.5">Deliveries</div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 text-center">
          <div className="text-primary" style={{ fontWeight: 700, fontSize: "1.4rem" }}>{water.toLocaleString()}L</div>
          <div className="text-muted-foreground text-xs mt-0.5">Water received</div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 text-center">
          <div className="text-primary" style={{ fontWeight: 700, fontSize: "1.4rem" }}>₹{total.toLocaleString()}</div>
          <div className="text-muted-foreground text-xs mt-0.5">Total spent</div>
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {ORDERS.map((order) => {
          const statusCfg = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
          return (
            <div key={order.id} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-foreground text-sm" style={{ fontWeight: 700 }}>{order.tanker}</span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${statusCfg.bg} ${statusCfg.color}`}
                      style={{ fontWeight: 600 }}
                    >
                      {statusCfg.icon}
                      {order.status}
                    </span>
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
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < (order.rating ?? 0) ? "text-amber-400" : "text-muted"}
                      fill={i < (order.rating ?? 0) ? "currentColor" : "none"}
                    />
                  ))}
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
