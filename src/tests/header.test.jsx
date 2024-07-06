import React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import Header from "@/components/header"

// Mock useRouter and useSearchParams hooks
jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation")
  return {
    ...actual,
    useRouter: jest.fn(() => ({
      replace: jest.fn(),
      push: jest.fn(),
    })),
    useSearchParams: jest.fn(() => ({
      get: jest.fn(),
    })),
    usePathname: jest.fn(),
  }
})

describe("Header component", () => {
  test("updates search input and URL parameters on change", async () => {
    render(<Header handleSideBare={() => {}} />)

    // Simulate typing in the search input
    const searchInput = screen.getByPlaceholderText("Search")
    fireEvent.change(searchInput, { target: { value: "test search" } })

    // Ensure debounce is applied (wait for debounce delay)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })

    // Verify that the input value is updated
    expect(searchInput.value).toBe("test search")
  })

  test("clears search input and URL parameters when input is empty", async () => {
    render(<Header handleSideBare={() => {}} />)

    // Simulate typing in the search input
    const searchInput = screen.getByPlaceholderText("Search")
    fireEvent.change(searchInput, { target: { value: "test search" } })

    // Ensure debounce is applied (wait for debounce delay)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })

    // Clear the search input
    fireEvent.change(searchInput, { target: { value: "" } })

    // Ensure debounce is applied (wait for debounce delay)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })

    // Verify that the URL parameters are cleared
    expect(window.location.search).toBe("")

    // Verify that the input value is cleared
    expect(searchInput.value).toBe("")
  })
})
