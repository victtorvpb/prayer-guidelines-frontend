import * as React from "react";
import styled from "styled-components";

const InputElement = styled.input`
  display: flex;
  height: 40px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgba(211, 223, 231, 0.9);
  background: #ffffff;
  padding: 8px 12px;
  font-size: 0.875rem;
  font-family: inherit;
  color: #1f313b;
  transition: all 0.2s ease;

  &::placeholder {
    color: #9aa9b2;
  }

  &:focus-visible {
    outline: none;
    border-color: rgba(var(--accent-rgb), 0.5);
    box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[type="file"]::file-selector-button {
    border: none;
    background: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    margin-right: 12px;
  }
`;

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, ...props }, ref) => (
    <InputElement type={type} ref={ref} {...props} />
  ),
);
Input.displayName = "Input";

export { Input };
