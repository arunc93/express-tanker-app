interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h2
        className="text-foreground mb-1"
        style={{ fontWeight: 700, fontSize: "1.4rem" }}
      >
        {title}
      </h2>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
}
