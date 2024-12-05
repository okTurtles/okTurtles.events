import sbp from "@sbp/sbp";
import "../index.js";

describe("okTurtles.events", () => {
  test("on returns cleanup function", () => {
    const handler = jest.fn();
    const cleanup = sbp("okTurtles.events/on", "test-event", handler);

    expect(typeof cleanup).toBe("function");

    // Emit an event
    sbp("okTurtles.events/emit", "test-event", "data");
    expect(handler).toHaveBeenCalledWith("data");

    // Call cleanup
    cleanup();

    // Emit again
    sbp("okTurtles.events/emit", "test-event", "more-data");
    expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
  });

  test("once returns cleanup function", () => {
    const handler = jest.fn();
    const cleanup = sbp("okTurtles.events/once", "test-event", handler);

    expect(typeof cleanup).toBe("function");

    // Emit an event
    sbp("okTurtles.events/emit", "test-event", "data");
    expect(handler).toHaveBeenCalledWith("data");

    // Emit again
    sbp("okTurtles.events/emit", "test-event", "more-data");
    expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
  });
});
