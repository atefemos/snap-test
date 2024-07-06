"use client"

import { getProducts } from "@/api/urls"
import Header from "@/components/header"
import Pagination from "@/components/pagination"
import ProductCard from "@/components/productCard"
import SideBare from "@/components/sidebare"
import { Product } from "@/types/interface"
import axios from "axios"
import { useEffect, useState } from "react"

interface SearchParams {
  q?: string
  skip?: string
  category?: string
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const q = searchParams?.q || ""
  const category = searchParams?.category || ""
  const skip = searchParams?.skip || ""

  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const [pagination, setPagination] = useState({ limit: 10, skip: 0, total: 0 })

  const [products, setProducts] = useState<Product[]>([])

  const makeQuery = () => {
    if (category) {
      return `/category/${category}?limit=10&skip=${skip}`
    } else if (q) {
      return `/search?q=${q}&limit=10&skip=${skip}`
    } else {
      return `?limit=10&skip=${skip}`
    }
  }

  useEffect(() => {
    axios.get(getProducts(makeQuery())).then((res) => {
      setProducts(res.data?.products)
      setPagination({ ...pagination, total: res.data?.total })
    })
  }, [searchParams])

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div
          data-testid="sidebar"
          className={`${
            showSidebar ? "flex" : "hidden"
          } md:flex flex-col w-64 bg-gray-800 absolute md:static h-full`}
        >
          <SideBare handleSideBare={setShowSidebar} />
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <div
            className="flex items-center justify-between h-16 bg-white border-b border-gray-200"
            data-testid="header"
          >
            <Header handleSideBare={setShowSidebar} />
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to my dashboard!
            </h1>
            <p className="mt-2 text-gray-600">List Of Products ...</p>
            <div data-testid="products">
              {products?.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
          <div data-testid="pagination">
            <Pagination total={pagination.total} />
          </div>
        </div>
      </div>
    </>
  )
}
