import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../dashboard";

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation((url) => {
    if (url.includes("/api/products")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            name: "SuperSano",
            products: [
              { id: 1, name: "Product 1", price: 100, bowlsAvailable: 10, image: "/image1.jpg" },
              { id: 2, name: "Product 2", price: 200, bowlsAvailable: 5, image: "/image2.jpg" },
            ],
          }),
      });
    }
    return Promise.reject(new Error("Unknown URL"));
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Dashboard Component", () => {
  it("should render the dashboard with restaurant details", async () => {
    render(<Dashboard />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await screen.findByText(/SuperSano/i);

    expect(screen.getByText("SuperSano")).toBeInTheDocument();
    expect(screen.getByText(/Waiter: Alice/i)).toBeInTheDocument();
  });

  it("should display products and allow adding them to the order", async () => {
    render(<Dashboard />);

    await screen.findByText(/Product 1/i);
    await screen.findByText(/Order #/i); 
    
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();

    const addButtons = screen.getAllByText(/Add to Order/i);
    fireEvent.click(addButtons[0]);

 
  
  });

  it("should stop infinite scroll after maximum extra rows", async () => {
    render(<Dashboard />);

    await screen.findByText(/Product 1/i);

    for (let i = 0; i < 6; i++) {
      fireEvent.scroll(window, { target: { scrollY: 1000 * (i + 1) } });
    }

    expect(screen.getAllByText(/Product/i).length).toBeLessThanOrEqual(18);
  });
});
