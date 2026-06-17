import { CheckCircle, Truck, Clock, XCircle } from "lucide-react";
import type { ReactNode } from "react";

interface StatusConfig {
  color: string;
  bg: string;
  icon: ReactNode;
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
  Delivered: { color: "text-green-700", bg: "bg-green-100", icon: <CheckCircle size={13} /> },
  "En Route": { color: "text-blue-700", bg: "bg-blue-100", icon: <Truck size={13} /> },
  Scheduled: { color: "text-amber-700", bg: "bg-amber-100", icon: <Clock size={13} /> },
  Cancelled: { color: "text-red-700", bg: "bg-red-100", icon: <XCircle size={13} /> },
  Active: { color: "text-green-700", bg: "bg-green-100", icon: <CheckCircle size={13} /> },
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG["Scheduled"];
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}
      style={{ fontWeight: 600 }}
    >
      {config.icon}
      {status}
    </span>
  );
}
