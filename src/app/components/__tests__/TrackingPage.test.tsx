import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { TrackingPage } from "../TrackingPage";

describe("TrackingPage", () => {
  let onRate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onRate = vi.fn();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the order ID", () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);
    expect(screen.getByText("Track Your Order")).toBeInTheDocument();
    expect(screen.getByText("JSD-934521")).toBeInTheDocument();
  });

  it("shows all delivery stages", () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);
    expect(screen.getByText("Order Confirmed")).toBeInTheDocument();
    expect(screen.getByText("Tanker Assigned")).toBeInTheDocument();
    expect(screen.getByText("En Route")).toBeInTheDocument();
    expect(screen.getByText("Arrived")).toBeInTheDocument();
    // "Delivered" as a stage label and the status text
    expect(screen.getAllByText(/Delivered/).length).toBeGreaterThanOrEqual(1);
  });

  it("shows initial ETA", () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);
    expect(screen.getByText("18 min")).toBeInTheDocument();
    expect(screen.getByText("Estimated Arrival")).toBeInTheDocument();
  });

  it("shows driver information", () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);
    expect(screen.getByText("Suresh Kumar")).toBeInTheDocument();
    expect(screen.getByText("KA-05-HB-4921")).toBeInTheDocument();
    expect(screen.getByText("4.9")).toBeInTheDocument();
  });

  it("shows call button for driver", () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);
    expect(screen.getByText("Call")).toBeInTheDocument();
  });

  it("shows map placeholder", () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);
    expect(screen.getByText("Live Map Tracking")).toBeInTheDocument();
  });

  it("decrements ETA over time", () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);
    expect(screen.getByText("18 min")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText("17 min")).toBeInTheDocument();
  });

  it("progresses through stages as ETA reaches 0", () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);

    // ETA starts at 18, decrements every 2s. At 0, stage advances (2→3)
    // 18 * 2000 = 36000ms to reach ETA=0
    act(() => {
      vi.advanceTimersByTime(37000);
    });
    // After stage 3 (Arrived), it shows "🎉 Here now"
    expect(screen.getByText(/Here now/)).toBeInTheDocument();
  });

  it("shows rating UI after delivery completes", async () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);

    // Stage 2→3: ETA counts from 18 down (18×2s = 36s)
    act(() => {
      vi.advanceTimersByTime(37000);
    });

    // Stage 3→4: timeout of 8000ms
    act(() => {
      vi.advanceTimersByTime(9000);
    });

    // Show feedback: timeout of 1000ms after stage 4
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByText("Rate your delivery")).toBeInTheDocument();
    });
  });

  it("submits rating and shows thank you message", async () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);

    // Advance to delivery completed + feedback shown
    act(() => {
      vi.advanceTimersByTime(37000);
    });
    act(() => {
      vi.advanceTimersByTime(9000);
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByText("Rate your delivery")).toBeInTheDocument();
    });

    // Click a star rating
    const ratingSection = screen.getByText("Rate your delivery").closest("div")!;
    const starButtons = ratingSection.querySelectorAll("button");
    fireEvent.click(starButtons[3]);

    act(() => {
      vi.advanceTimersByTime(700);
    });

    await waitFor(() => {
      expect(screen.getByText("Thanks for your feedback!")).toBeInTheDocument();
    });
    expect(onRate).toHaveBeenCalledOnce();
  });

  it("shows order details strip", () => {
    render(<TrackingPage orderId="JSD-934521" onRate={onRate} />);
    expect(screen.getByText(/Booked 10:02 AM/)).toBeInTheDocument();
    expect(screen.getByText(/1000 L · Standard Tanker/)).toBeInTheDocument();
    expect(screen.getByText(/Koramangala, Bengaluru/)).toBeInTheDocument();
  });
});
