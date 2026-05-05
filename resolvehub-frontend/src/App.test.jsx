import { render } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    Routes: ({ children }) => <div>{children}</div>,
    Route: () => <div>Mock Route</div>,
  };
});

vi.mock("./Navbar", () => ({
  default: () => <div>Mock Navbar</div>,
}));

vi.mock("./Landing", () => ({
  default: () => <div>Mock Landing</div>,
}));

vi.mock("./AdminLogin", () => ({
  default: () => <div>Mock AdminLogin</div>,
}));

vi.mock("./UserLogin", () => ({
  default: () => <div>Mock UserLogin</div>,
}));

vi.mock("./UserRegister", () => ({
  default: () => <div>Mock UserRegister</div>,
}));

vi.mock("./MyComplaint", () => ({
  default: () => <div>Mock MyComplaint</div>,
}));

vi.mock("./ComplaintForm", () => ({
  default: () => <div>Mock ComplaintForm</div>,
}));

vi.mock("./Dashboard", () => ({
  default: () => <div>Mock Dashboard</div>,
}));

vi.mock("./ProtectedRoute", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

import App from "./App";

describe("App", () => {
  test("renders without crashing", () => {
    render(<App />);
    expect(true).toBe(true);
  });
});