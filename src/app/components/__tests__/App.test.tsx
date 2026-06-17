import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../../app/App";

beforeEach(() => {
  vi.stubGlobal("innerWidth", 1024);
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      matches: false,
    })
  );
});

describe("App", () => {
  it("renders with the JalSeva brand name", () => {
    render(<App />);
    expect(screen.getAllByText("JalSeva").length).toBeGreaterThan(0);
  });

  it("starts on the home page with hero heading", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Clean Water/);
    expect(heading).toHaveTextContent(/Delivered Fast/);
  });

  it("shows navigation items", () => {
    render(<App />);
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Book Water").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Track Order").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Subscribe").length).toBeGreaterThan(0);
  });

  it("navigates to booking page when Book Water is clicked", () => {
    render(<App />);
    const navButtons = screen.getAllByText("Book Water");
    fireEvent.click(navButtons[0]);
    expect(screen.getByText("Book Water Tanker")).toBeInTheDocument();
  });

  it("navigates to tracking page when Track Order is clicked", () => {
    render(<App />);
    const navButtons = screen.getAllByText("Track Order");
    fireEvent.click(navButtons[0]);
    expect(screen.getByText("Track Your Order")).toBeInTheDocument();
  });

  it("navigates to subscription page when Subscribe is clicked", () => {
    render(<App />);
    const navButtons = screen.getAllByText("Subscribe");
    fireEvent.click(navButtons[0]);
    expect(screen.getByText("Monthly Subscriptions")).toBeInTheDocument();
  });

  it("navigates to history page", () => {
    render(<App />);
    const historyBtns = screen.getAllByText("History");
    fireEvent.click(historyBtns[0]);
    expect(screen.getByText("Order History")).toBeInTheDocument();
  });

  it("shows announcement banner only on home page", () => {
    render(<App />);
    expect(screen.getByText(/Summer water shortage/)).toBeInTheDocument();

    const navButtons = screen.getAllByText("Book Water");
    fireEvent.click(navButtons[0]);
    expect(screen.queryByText(/Summer water shortage/)).not.toBeInTheDocument();
  });

  it("shows notification badge with count", () => {
    render(<App />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("navigates back home when logo is clicked", () => {
    render(<App />);
    const bookBtns = screen.getAllByText("Book Water");
    fireEvent.click(bookBtns[0]);
    expect(screen.getByText("Book Water Tanker")).toBeInTheDocument();

    const logos = screen.getAllByText("JalSeva");
    fireEvent.click(logos[0]);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Clean Water/);
  });

  it("shows phone number link", () => {
    render(<App />);
    expect(screen.getByText("1800-123-4567")).toBeInTheDocument();
  });

  it("shows Book Now button on home page that navigates to booking", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Book Now"));
    expect(screen.getByText("Book Water Tanker")).toBeInTheDocument();
  });
});
