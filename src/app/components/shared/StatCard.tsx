interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 text-center">
      <div
        className="text-primary"
        style={{ fontWeight: 700, fontSize: "1.4rem" }}
      >
        {value}
      </div>
      <div className="text-muted-foreground text-xs mt-0.5">{label}</div>
    </div>
  );
}
