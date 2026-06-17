import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HomePage } from "../HomePage";

describe("HomePage", () => {
  const onBook = vi.fn();

  it("renders hero section", () => {
    render(<HomePage onBook={onBook} />);
    // Text is split by <br>: "Clean Water<br/>Delivered Fast"
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Clean Water/);
    expect(heading).toHaveTextContent(/Delivered Fast/);
  });

  it("shows stats in hero", () => {
    render(<HomePage onBook={onBook} />);
    expect(screen.getByText("12,000+")).toBeInTheDocument();
    expect(screen.getByText("198")).toBeInTheDocument();
    expect(screen.getByText("4.8★")).toBeInTheDocument();
  });

  it("shows how-it-works section", () => {
    render(<HomePage onBook={onBook} />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
    expect(screen.getByText("Enter Location")).toBeInTheDocument();
    expect(screen.getByText("Choose & Book")).toBeInTheDocument();
    expect(screen.getByText("Track & Receive")).toBeInTheDocument();
  });

  it("renders all four tanker options", () => {
    render(<HomePage onBook={onBook} />);
    expect(screen.getByText("Mini Tanker")).toBeInTheDocument();
    expect(screen.getByText("Standard Tanker")).toBeInTheDocument();
    expect(screen.getByText("Large Tanker")).toBeInTheDocument();
    expect(screen.getByText("Mega Tanker")).toBeInTheDocument();
  });

  it("shows tanker prices", () => {
    render(<HomePage onBook={onBook} />);
    expect(screen.getByText("₹299")).toBeInTheDocument();
    expect(screen.getByText("₹499")).toBeInTheDocument();
    expect(screen.getByText("₹999")).toBeInTheDocument();
    expect(screen.getByText("₹1799")).toBeInTheDocument();
  });

  it("shows tanker tags", () => {
    render(<HomePage onBook={onBook} />);
    expect(screen.getByText("Best for apartments")).toBeInTheDocument();
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
    expect(screen.getByText("Ideal for villas & offices")).toBeInTheDocument();
    expect(screen.getByText("For construction & bulk")).toBeInTheDocument();
  });

  it("calls onBook with the Standard Tanker when Book Now is clicked", () => {
    render(<HomePage onBook={onBook} />);
    fireEvent.click(screen.getByText("Book Now"));
    expect(onBook).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 2,
        name: "Standard Tanker",
        price: 499,
      })
    );
  });

  it("calls onBook with correct tanker when individual Book buttons are clicked", () => {
    render(<HomePage onBook={onBook} />);
    const bookButtons = screen.getAllByText("Book");
    fireEvent.click(bookButtons[0]);
    expect(onBook).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: "Mini Tanker",
        price: 299,
      })
    );
  });

  it("shows trust badges", () => {
    render(<HomePage onBook={onBook} />);
    expect(screen.getByText("BIS Certified")).toBeInTheDocument();
    expect(screen.getByText("On-Time Delivery")).toBeInTheDocument();
    expect(screen.getByText("Live GPS Tracking")).toBeInTheDocument();
    expect(screen.getByText("24/7 Support")).toBeInTheDocument();
  });

  it("shows testimonials section", () => {
    render(<HomePage onBook={onBook} />);
    expect(screen.getByText("What Bengalureans Say")).toBeInTheDocument();
    expect(screen.getByText("Priya Sharma")).toBeInTheDocument();
    expect(screen.getByText("Rajan Nair")).toBeInTheDocument();
    expect(screen.getByText("Meenakshi Reddy")).toBeInTheDocument();
  });

  it("shows tanker ratings", () => {
    render(<HomePage onBook={onBook} />);
    expect(screen.getByText("4.7")).toBeInTheDocument();
    expect(screen.getByText("4.9")).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
    expect(screen.getByText("4.6")).toBeInTheDocument();
  });
});
