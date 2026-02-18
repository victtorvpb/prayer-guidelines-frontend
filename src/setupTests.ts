import "@testing-library/jest-dom/vitest";
import * as React from "react";

// Expose React for styled-components in the test runtime.
(globalThis as typeof globalThis & { React?: typeof React }).React = React;

export {};
