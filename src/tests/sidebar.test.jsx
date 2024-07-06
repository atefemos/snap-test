import { render, screen, fireEvent } from "@testing-library/react"
import SideBare from "@/components/sidebare"

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: ["Category1", "Category2"] })),
}))

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

describe("SideBare component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders categories and handles click", async () => {
    render(<SideBare handleSideBare={() => {}} />)

    // Wait for categories to be loaded
    await screen.findByText("Category1")
    await screen.findByText("Category2")

    // Ensure that "All Categories" button is present
    const allCategoriesButton = screen.getByText("All Categories")
    expect(allCategoriesButton).toBeInTheDocument()

    // Simulate click on "All Categories" button
    fireEvent.click(allCategoriesButton)

    // Simulate click on a category button
    const categoryButton = screen.getByText("Category1")
    fireEvent.click(categoryButton)
  })
})
