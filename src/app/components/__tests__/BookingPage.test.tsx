import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookingPage } from "../BookingPage";

const STANDARD_TANKER = {
  id: 2,
  name: "Standard Tanker",
  capacity: "1000 Litres",
  price: 499,
  delivery: "1-2 hrs",
};

describe("BookingPage", () => {
  let onBack: ReturnType<typeof vi.fn>;
  let onOrderPlaced: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onBack = vi.fn();
    onOrderPlaced = vi.fn();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  function renderPage(tanker = STANDARD_TANKER) {
    return render(
      <BookingPage
        selectedTanker={tanker}
        onBack={onBack}
        onOrderPlaced={onOrderPlaced}
      />
    );
  }

  it("renders step 1 initially with tanker selection", () => {
    renderPage();
    expect(screen.getByText("Book Water Tanker")).toBeInTheDocument();
    expect(screen.getByText("Select Tanker Size")).toBeInTheDocument();
    expect(screen.getByText("Mini Tanker")).toBeInTheDocument();
    // "Standard Tanker" appears in both the form and order summary
    expect(screen.getAllByText("Standard Tanker")).toHaveLength(2);
    expect(screen.getByText("Large Tanker")).toBeInTheDocument();
    expect(screen.getByText("Mega Tanker")).toBeInTheDocument();
  });

  it("shows order summary with correct price calculation", () => {
    const { container } = renderPage();
    // Standard Tanker: price=499, tax=5%=25, delivery=49, total=573
    // ₹499 appears in the tanker card and in order summary
    const summary = container.querySelector(".sticky");
    expect(summary).not.toBeNull();
    const summaryEl = within(summary as HTMLElement);
    expect(summaryEl.getByText("₹499")).toBeInTheDocument();
    expect(summaryEl.getByText("₹49")).toBeInTheDocument();
    expect(summaryEl.getByText("₹25")).toBeInTheDocument();
    expect(summaryEl.getByText("₹573")).toBeInTheDocument();
  });

  it("updates price when selecting a different tanker", () => {
    const { container } = renderPage();
    fireEvent.click(screen.getByText("Mini Tanker"));
    const summary = container.querySelector(".sticky");
    const summaryEl = within(summary as HTMLElement);
    // Mini Tanker: price=299, tax=15, delivery=49, total=363
    expect(summaryEl.getByText("₹299")).toBeInTheDocument();
    expect(summaryEl.getByText("₹15")).toBeInTheDocument();
    expect(summaryEl.getByText("₹363")).toBeInTheDocument();
  });

  it("calls onBack when back button is clicked", () => {
    renderPage();
    fireEvent.click(screen.getByText("Back"));
    expect(onBack).toHaveBeenCalledOnce();
  });

  it("disables continue button when step 1 is incomplete", () => {
    renderPage();
    const btn = screen.getByText("Continue to Address →");
    expect(btn).toBeDisabled();
  });

  it("enables continue button when step 1 is complete", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPage();

    const dateInput = screen.getByDisplayValue("");
    await user.type(dateInput, "2026-07-01");
    fireEvent.click(screen.getByText("08:00 AM – 10:00 AM"));

    const btn = screen.getByText("Continue to Address →");
    expect(btn).not.toBeDisabled();
  });

  it("navigates to step 2 when step 1 is filled", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPage();

    const dateInput = screen.getByDisplayValue("");
    await user.type(dateInput, "2026-07-01");
    fireEvent.click(screen.getByText("08:00 AM – 10:00 AM"));
    fireEvent.click(screen.getByText("Continue to Address →"));

    expect(screen.getByPlaceholderText("e.g. Priya Sharma")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("10-digit mobile number")
    ).toBeInTheDocument();
  });

  it("renders time slot options", () => {
    renderPage();
    expect(screen.getByText("06:00 AM – 08:00 AM")).toBeInTheDocument();
    expect(screen.getByText("04:00 PM – 06:00 PM")).toBeInTheDocument();
  });

  it("shows step indicator with correct labels", () => {
    renderPage();
    expect(screen.getByText("Select & Schedule")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
  });

  it("validates phone number to 10 digits on step 2", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPage();

    const dateInput = screen.getByDisplayValue("");
    await user.type(dateInput, "2026-07-01");
    fireEvent.click(screen.getByText("08:00 AM – 10:00 AM"));
    fireEvent.click(screen.getByText("Continue to Address →"));

    const continueBtn = screen.getByText("Continue →");
    expect(continueBtn).toBeDisabled();
  });

  it("navigates back from step 2 to step 1", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPage();

    const dateInput = screen.getByDisplayValue("");
    await user.type(dateInput, "2026-07-01");
    fireEvent.click(screen.getByText("08:00 AM – 10:00 AM"));
    fireEvent.click(screen.getByText("Continue to Address →"));

    fireEvent.click(screen.getByText("← Back"));
    expect(screen.getByText("Select Tanker Size")).toBeInTheDocument();
  });

  it("shows payment methods on step 3", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPage();

    const dateInput = screen.getByDisplayValue("");
    await user.type(dateInput, "2026-07-01");
    fireEvent.click(screen.getByText("08:00 AM – 10:00 AM"));
    fireEvent.click(screen.getByText("Continue to Address →"));

    await user.type(
      screen.getByPlaceholderText("e.g. Priya Sharma"),
      "Test User"
    );
    await user.type(
      screen.getByPlaceholderText("10-digit mobile number"),
      "9876543210"
    );
    const areaSelect = screen.getByDisplayValue("Select area");
    await user.selectOptions(areaSelect, "Koramangala");
    await user.type(
      screen.getByPlaceholderText("House/Flat No., Street, Landmark"),
      "123 Test Street"
    );

    fireEvent.click(screen.getByText("Continue →"));

    expect(screen.getByText("UPI / GPay / PhonePe")).toBeInTheDocument();
    expect(screen.getByText("Credit / Debit Card")).toBeInTheDocument();
    expect(screen.getByText("Net Banking")).toBeInTheDocument();
    expect(screen.getByText("Cash on Delivery")).toBeInTheDocument();
  });

  it("shows UPI ID input when UPI is selected and hides it for card", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPage();

    const dateInput = screen.getByDisplayValue("");
    await user.type(dateInput, "2026-07-01");
    fireEvent.click(screen.getByText("08:00 AM – 10:00 AM"));
    fireEvent.click(screen.getByText("Continue to Address →"));

    await user.type(
      screen.getByPlaceholderText("e.g. Priya Sharma"),
      "Test User"
    );
    await user.type(
      screen.getByPlaceholderText("10-digit mobile number"),
      "9876543210"
    );
    const areaSelect = screen.getByDisplayValue("Select area");
    await user.selectOptions(areaSelect, "Koramangala");
    await user.type(
      screen.getByPlaceholderText("House/Flat No., Street, Landmark"),
      "123 Test Street"
    );
    fireEvent.click(screen.getByText("Continue →"));

    expect(screen.getByPlaceholderText("yourname@upi")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Credit / Debit Card"));
    expect(screen.queryByPlaceholderText("yourname@upi")).not.toBeInTheDocument();
  });

  it("places order and calls onOrderPlaced", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPage();

    const dateInput = screen.getByDisplayValue("");
    await user.type(dateInput, "2026-07-01");
    fireEvent.click(screen.getByText("08:00 AM – 10:00 AM"));
    fireEvent.click(screen.getByText("Continue to Address →"));

    await user.type(
      screen.getByPlaceholderText("e.g. Priya Sharma"),
      "Test User"
    );
    await user.type(
      screen.getByPlaceholderText("10-digit mobile number"),
      "9876543210"
    );
    const areaSelect = screen.getByDisplayValue("Select area");
    await user.selectOptions(areaSelect, "Koramangala");
    await user.type(
      screen.getByPlaceholderText("House/Flat No., Street, Landmark"),
      "123 Test Street"
    );
    fireEvent.click(screen.getByText("Continue →"));

    await user.type(
      screen.getByPlaceholderText("yourname@upi"),
      "testuser@upi"
    );
    fireEvent.click(screen.getByText("Pay ₹573"));
    expect(screen.getByText("Placing Order…")).toBeInTheDocument();

    vi.advanceTimersByTime(2000);
    await waitFor(() => {
      expect(onOrderPlaced).toHaveBeenCalledOnce();
    });

    const orderId = onOrderPlaced.mock.calls[0][0];
    expect(orderId).toMatch(/^JSD\d{6}$/);
  });
});
