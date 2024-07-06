// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    replace: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue(),
  useSearchParams: jest.fn().mockReturnValue(),
}))

import React from "react"
import { render, screen } from "@testing-library/react"
import Pagination from "@/components/pagination"

describe("Pagination component", () => {
  test("renders pagination buttons correctly", () => {
    const total = 20 // Total number of items
    render(<Pagination total={total} />)

    // Find all buttons with role 'button'
    const buttons = screen.getAllByRole("button")

    // Check if "Next" button is rendered
    const nextButton = buttons.find((button) =>
      button.textContent.match(/next/i)
    )
    expect(nextButton).toBeInTheDocument()

    // Check if "Previous" button is rendered
    const previousButton = buttons.find((button) =>
      button.textContent.match(/previous/i)
    )
    expect(previousButton).toBeInTheDocument()

    // Check if page numbers are rendered correctly
    for (let i = 1; i <= Math.ceil(total / 10); i++) {
      const pageButton = buttons.find(
        (button) => button.textContent === i.toString()
      )
      expect(pageButton).toBeInTheDocument()
    }
  })
})
