import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import styled from "styled-components";

type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const BaseButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case "secondary":
        return `
          background: #f0f4f7;
          color: #2c4957;
          &:hover { background: #e0e8f0; }
        `;
      case "outline":
        return `
          border: 1px solid rgba(211, 223, 231, 0.9);
          background: #ffffff;
          color: #2c4957;
          &:hover { background: #f8fafb; }
        `;
      case "ghost":
        return `
          background: transparent;
          color: #2c4957;
          &:hover { background: rgba(47, 138, 134, 0.08); }
        `;
      case "destructive":
        return `
          background: #dc2626;
          color: white;
          &:hover { background: #b91c1c; }
        `;
      default:
        return `
          background: var(--accent);
          color: white;
          &:hover { background: var(--accent-dark); }
        `;
    }
  }};

  ${({ $size }) => {
    switch ($size) {
      case "sm":
        return `height: 36px; border-radius: 6px; padding: 8px 12px;`;
      case "lg":
        return `height: 44px; border-radius: 6px; padding: 8px 32px;`;
      case "icon":
        return `height: 40px; width: 40px; padding: 0;`;
      default:
        return `height: 40px; padding: 8px 16px;`;
    }
  }};
`;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "default", size = "default", asChild = false, ...props },
    ref,
  ) => {
    if (asChild) {
      return <Slot ref={ref} {...props} />;
    }
    return (
      <BaseButton
        ref={ref}
        $variant={variant}
        $size={size}
        {...(props as any)}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
