import "@testing-library/jest-dom/vitest";
import * as React from "react";

declare global {
	var React: typeof import("react");
}

globalThis.React = React;

export {};
