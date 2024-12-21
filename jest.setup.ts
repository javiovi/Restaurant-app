import { jest } from "@jest/globals";
import "@testing-library/jest-dom";

global.IntersectionObserver = class IntersectionObserver {
  constructor(
    callback: IntersectionObserverCallback, // eslint-disable-line @typescript-eslint/no-unused-vars
    options?: IntersectionObserverInit // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {}
  observe(_target: Element) {
  
  }
  unobserve(_target: Element) {
   
  }
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  root: Document | Element | null = null;
  rootMargin: string = "0px";
  thresholds: ReadonlyArray<number> = [0];
};


jest.mock("next/router", () => {
  const actualRouter = jest.requireActual<typeof import("next/router")>("next/router");
  return {
    ...actualRouter,
    useRouter: () => ({
      route: "/",
      pathname: "/",
      query: { restaurantId: "1", waiterName: "Alice" },
      asPath: "/",
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }),
  };
});

beforeAll(() => {
  global.alert = jest.fn();
});

