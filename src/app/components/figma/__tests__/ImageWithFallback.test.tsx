import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImageWithFallback } from "../ImageWithFallback";

describe("ImageWithFallback", () => {
  it("renders img with src when no error", () => {
    render(
      <ImageWithFallback src="https://example.com/photo.jpg" alt="Photo" />
    );
    const img = screen.getByAltText("Photo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("shows fallback after image load error", () => {
    render(
      <ImageWithFallback
        src="https://example.com/broken.jpg"
        alt="Broken"
        className="custom-class"
      />
    );
    const img = screen.getByAltText("Broken");
    fireEvent.error(img);

    const fallback = screen.getByAltText("Error loading image");
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveAttribute(
      "data-original-url",
      "https://example.com/broken.jpg"
    );
  });

  it("applies className to fallback container", () => {
    const { container } = render(
      <ImageWithFallback
        src="https://example.com/broken.jpg"
        alt="Broken"
        className="w-full h-40"
      />
    );
    const img = screen.getByAltText("Broken");
    fireEvent.error(img);

    const fallbackDiv = container.querySelector(".w-full.h-40");
    expect(fallbackDiv).toBeInTheDocument();
  });

  it("passes extra props to img element", () => {
    render(
      <ImageWithFallback
        src="https://example.com/photo.jpg"
        alt="Photo"
        width={200}
        height={100}
      />
    );
    const img = screen.getByAltText("Photo");
    expect(img).toHaveAttribute("width", "200");
    expect(img).toHaveAttribute("height", "100");
  });
});
