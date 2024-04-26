import { render } from "@testing-library/react";
import { DynamicIcon } from "@/components/dynamic-icon/dynamic-icon";

it("renders the DynamicIcon component with the correct attributes", () => {
  const { container } = render(<DynamicIcon name="example" path="/icons" size={30} className="icon-class" />);
  const svg = container.querySelector("svg");
  const image = container.querySelector("image");

  expect(svg).toBeInTheDocument();
  expect(svg).toHaveClass("icon-class");
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("href", "/icons/example.svg");
  expect(image).toHaveAttribute("width", "100%");
  expect(image).toHaveAttribute("height", "100%");
});
