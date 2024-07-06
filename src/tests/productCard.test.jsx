import React from "react"
import { render, screen } from "@testing-library/react"
import ProductCard from "@/components/productCard"

describe("ProductCard component", () => {
  test("renders product information correctly", () => {
    // Mock product data
    const product = {
      id: 1,
      title: "Product Title",
      category: "PCategory",
      brand: "PBrand",
      images: ["/_next/image?url=%2Fimage-url&w=256&q=75"],
    }

    // Render ProductCard component with mock product
    render(<ProductCard product={product} />)

    // Check if product information is rendered correctly
    expect(
      screen.getByText(`${product.id}. ${product.title}`)
    ).toBeInTheDocument()
    expect(screen.getByText(`${product.category}`)).toBeInTheDocument()
    expect(screen.getByText(`${product.brand}`)).toBeInTheDocument()

    // Check if product image is rendered correctly
    const productImage = screen.getByAltText("product image")
    expect(productImage).toBeInTheDocument()
    expect(productImage).toHaveAttribute("width", "70")
    expect(productImage).toHaveAttribute("height", "70")
  })
})
