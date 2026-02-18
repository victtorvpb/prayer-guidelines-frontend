import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PrayerGuidelines from "@/pages/PrayerGuidelines";
import { CONTENT_LIMITS, PAUTA_WARNINGS } from "@/lib/constants";

describe("PrayerGuidelines", () => {
  it("shows a warning when pauta exceeds limit", () => {
    render(<PrayerGuidelines />);

    const pautaInput = screen.getByLabelText("Pauta (mensagens)");
    const longText = "a".repeat(CONTENT_LIMITS.PAUTA + 1);

    fireEvent.change(pautaInput, { target: { value: longText } });

    const warningFound = PAUTA_WARNINGS.some((warning) =>
      screen.queryByText(warning),
    );

    expect(warningFound).toBe(true);
  });

  it("toggles layout mode with pressed state", async () => {
    const user = userEvent.setup();
    render(<PrayerGuidelines />);

    const combinedButton = screen.getByRole("button", {
      name: "Layout juntos",
    });
    const sequentialButton = screen.getByRole("button", {
      name: "Layout sequencial",
    });

    expect(combinedButton).toHaveAttribute("aria-pressed", "true");
    expect(sequentialButton).toHaveAttribute("aria-pressed", "false");

    await user.click(sequentialButton);

    expect(combinedButton).toHaveAttribute("aria-pressed", "false");
    expect(sequentialButton).toHaveAttribute("aria-pressed", "true");
  });

  it("exposes formatting shortcuts with accessible labels", () => {
    render(<PrayerGuidelines />);

    expect(screen.getByRole("button", { name: "Negrito" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Italico" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tachado" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Monoespaco" }),
    ).toBeInTheDocument();
  });
});
