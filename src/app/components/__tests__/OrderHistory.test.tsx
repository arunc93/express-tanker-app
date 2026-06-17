import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OrderHistory } from "../OrderHistory";

describe("OrderHistory", () => {
  const onReorder = vi.fn();

  it("renders the page title", () => {
    render(<OrderHistory onReorder={onReorder} />);
    expect(screen.getByText("Order History")).toBeInTheDocument();
    expect(
      screen.getByText("All your past and upcoming deliveries")
    ).toBeInTheDocument();
  });

  it("shows correct summary stats", () => {
    render(<OrderHistory onReorder={onReorder} />);
    // 3 delivered orders out of 4
    expect(screen.getByText("3")).toBeInTheDocument();
    // Total water: 1000 + 500 + 3000 = 4500L
    expect(screen.getByText("4,500L")).toBeInTheDocument();
    // Total spent: 548 + 348 + 1098 = 1994
    expect(screen.getByText("₹1,994")).toBeInTheDocument();
  });

  it("renders all orders", () => {
    render(<OrderHistory onReorder={onReorder} />);
    expect(screen.getByText("Order #JSD-934521")).toBeInTheDocument();
    expect(screen.getByText("Order #JSD-891044")).toBeInTheDocument();
    expect(screen.getByText("Order #JSD-872318")).toBeInTheDocument();
    expect(screen.getByText("Order #JSD-858102")).toBeInTheDocument();
  });

  it("shows correct status badges", () => {
    render(<OrderHistory onReorder={onReorder} />);
    const deliveredBadges = screen.getAllByText("Delivered");
    expect(deliveredBadges).toHaveLength(3);
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });

  it("shows order amounts", () => {
    render(<OrderHistory onReorder={onReorder} />);
    // ₹548 appears in both the order card and the total stats section
    expect(screen.getAllByText("₹548").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("₹348").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("₹1098").length).toBeGreaterThanOrEqual(1);
  });

  it("shows driver info for delivered orders", () => {
    render(<OrderHistory onReorder={onReorder} />);
    expect(screen.getByText(/Suresh Kumar/)).toBeInTheDocument();
    expect(screen.getByText(/Ravi Prasad/)).toBeInTheDocument();
    expect(screen.getByText(/Anand Rao/)).toBeInTheDocument();
  });

  it("calls onReorder when reorder button is clicked", () => {
    render(<OrderHistory onReorder={onReorder} />);
    const reorderButtons = screen.getAllByText("Reorder");
    expect(reorderButtons).toHaveLength(4);

    fireEvent.click(reorderButtons[0]);
    expect(onReorder).toHaveBeenCalledOnce();
  });

  it("shows star ratings for delivered orders", () => {
    const { container } = render(<OrderHistory onReorder={onReorder} />);
    const stars = container.querySelectorAll("svg.lucide-star");
    expect(stars.length).toBeGreaterThan(0);
  });

  it("shows capacity info for each order", () => {
    render(<OrderHistory onReorder={onReorder} />);
    // Multiple capacities appear, use getAllByText for duplicates
    expect(screen.getAllByText("1000L").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("500L").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("3000L").length).toBeGreaterThanOrEqual(1);
  });

  it("shows tanker type for each order", () => {
    render(<OrderHistory onReorder={onReorder} />);
    const standardTankers = screen.getAllByText("Standard Tanker");
    expect(standardTankers).toHaveLength(2);
    expect(screen.getByText("Mini Tanker")).toBeInTheDocument();
    expect(screen.getByText("Large Tanker")).toBeInTheDocument();
  });
});
