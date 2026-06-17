import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SubscriptionPage } from "../SubscriptionPage";

describe("SubscriptionPage", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders page title", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("Monthly Subscriptions")).toBeInTheDocument();
    expect(
      screen.getByText("Guaranteed water supply, every month")
    ).toBeInTheDocument();
  });

  it("shows all three plans", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("Basic")).toBeInTheDocument();
    expect(screen.getByText("Standard")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it("displays plan taglines", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("For small apartments")).toBeInTheDocument();
    expect(screen.getByText("Most popular choice")).toBeInTheDocument();
    expect(screen.getByText("For villas & offices")).toBeInTheDocument();
  });

  it("shows monthly prices by default", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("₹1,499")).toBeInTheDocument();
    expect(screen.getByText("₹2,799")).toBeInTheDocument();
    expect(screen.getByText("₹5,499")).toBeInTheDocument();
  });

  it("applies 10% discount for quarterly billing", () => {
    render(<SubscriptionPage />);
    fireEvent.click(screen.getByText("Quarterly", { exact: false }));
    // 1499 * 0.9 = 1349, 2799 * 0.9 = 2519, 5499 * 0.9 = 4949
    expect(screen.getByText("₹1,349")).toBeInTheDocument();
    expect(screen.getByText("₹2,519")).toBeInTheDocument();
    expect(screen.getByText("₹4,949")).toBeInTheDocument();
  });

  it("shows plan features", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("4 deliveries/month")).toBeInTheDocument();
    expect(screen.getByText("6 deliveries/month")).toBeInTheDocument();
    expect(screen.getByText("8 deliveries/month")).toBeInTheDocument();
  });

  it("highlights popular plan with badge", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("⭐ Most Popular")).toBeInTheDocument();
  });

  it("shows savings percentages", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("Save 18% vs one-time booking")).toBeInTheDocument();
    expect(screen.getByText("Save 22% vs one-time booking")).toBeInTheDocument();
    expect(screen.getByText("Save 28% vs one-time booking")).toBeInTheDocument();
  });

  it("shows subscribe buttons", () => {
    render(<SubscriptionPage />);
    const subscribeButtons = screen.getAllByText("Subscribe Now");
    expect(subscribeButtons).toHaveLength(3);
  });

  it("shows activating state when subscribing", async () => {
    render(<SubscriptionPage />);
    const subscribeButtons = screen.getAllByText("Subscribe Now");
    fireEvent.click(subscribeButtons[0]); // Subscribe to Basic
    expect(screen.getByText("Activating…")).toBeInTheDocument();
  });

  it("switches to My Plans tab after subscription completes", async () => {
    render(<SubscriptionPage />);
    const subscribeButtons = screen.getAllByText("Subscribe Now");
    fireEvent.click(subscribeButtons[0]);

    vi.advanceTimersByTime(1300);
    await waitFor(() => {
      expect(screen.getByText("Basic Plan Activated!")).toBeInTheDocument();
    });
  });

  it("shows tabs for All Plans and My Plans", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("All Plans")).toBeInTheDocument();
    expect(screen.getByText("My Plans")).toBeInTheDocument();
  });

  it("shows existing subscription in My Plans tab", () => {
    render(<SubscriptionPage />);
    fireEvent.click(screen.getByText("My Plans"));
    expect(screen.getByText("Standard Plan")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("ID: SUB-001 · Since 1 Jan 2025")).toBeInTheDocument();
  });

  it("shows subscription management buttons", () => {
    render(<SubscriptionPage />);
    fireEvent.click(screen.getByText("My Plans"));
    expect(screen.getByText("Pause")).toBeInTheDocument();
    expect(screen.getByText("Manage")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("shows subscription delivery stats", () => {
    render(<SubscriptionPage />);
    fireEvent.click(screen.getByText("My Plans"));
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("Koramangala")).toBeInTheDocument();
  });

  it("shows billing toggle options", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });

  it("shows benefits strip", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("Priority delivery")).toBeInTheDocument();
    expect(screen.getByText("Guaranteed supply")).toBeInTheDocument();
    expect(screen.getByText("Save up to 28%")).toBeInTheDocument();
    expect(screen.getByText("Dedicated support")).toBeInTheDocument();
  });

  it("shows FAQ section", () => {
    render(<SubscriptionPage />);
    expect(screen.getByText("Common Questions")).toBeInTheDocument();
    expect(
      screen.getByText("Can I pause my subscription?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Is there a contract or lock-in?")
    ).toBeInTheDocument();
  });

  it("can start on My Plans tab via prop", () => {
    render(<SubscriptionPage showMyPlans={true} />);
    expect(screen.getByText("Standard Plan")).toBeInTheDocument();
  });
});
