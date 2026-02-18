import { render, screen, fireEvent } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import userEvent from "@testing-library/user-event";
import PrayerGuidelines from "@/pages/PrayerGuidelines";
import { LanguageProvider } from "@/contexts/LanguageProvider";
import { CONTENT_LIMITS, PAUTA_WARNINGS } from "@/lib/constants";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

describe("PrayerGuidelines", () => {
  it("shows a warning when pauta exceeds limit", () => {
    customRender(<PrayerGuidelines />);

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
    customRender(<PrayerGuidelines />);

    const combinedButton = screen.getByRole("button", {
      name: "Juntos",
    });
    const sequentialButton = screen.getByRole("button", {
      name: "Sequencial",
    });

    expect(combinedButton).toHaveAttribute("aria-pressed", "true");
    expect(sequentialButton).toHaveAttribute("aria-pressed", "false");

    await user.click(sequentialButton);

    expect(combinedButton).toHaveAttribute("aria-pressed", "false");
    expect(sequentialButton).toHaveAttribute("aria-pressed", "true");
  });

  it("exposes formatting shortcuts with accessible labels", () => {
    customRender(<PrayerGuidelines />);

    expect(screen.getByRole("button", { name: "Negrito" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Itálico" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tachado" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Monoespaço" }),
    ).toBeInTheDocument();
  });
});
