"use client"

import { getCategories } from "@/api/urls"
import axios from "axios"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

interface Props {
  handleSideBare: (a: boolean) => void
}

const SideBare: React.FC<Props> = ({ handleSideBare }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  const [categoryList, setCategoryList] = useState<string[]>([])

  useEffect(() => {
    axios
      .get(getCategories)
      .then((res) => {
        setCategoryList(res.data)
      })
      .catch((error) => {
        console.error("Error fetching categories:", error)
      })
  }, [])

  const handleClick = (item: string) => {
    params.delete("q")
    params.set("skip", "0")
    if (item !== "all") {
      params.set("category", item)
    } else {
      params.delete("category")
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <div className="text-white font-bold uppercase flex justify-around w-full">
          Categories{" "}
          <button
            className="hover:bg-slate-600 rounded w-6 md:hidden"
            onClick={() => handleSideBare(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800">
          <div
            onClick={() => handleClick("all")}
            className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 font-bold"
          >
            All Categories
          </div>
          {categoryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item?.name)}
              className={`flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 focus:bg-gray-700 ${
                item === params.get("category") && "bg-gray-700"
              }`}
            >
              <svg
                viewBox="0 0 18 10"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-4 fill-gray-500"
              >
                <circle cx="5" cy="5" r="5" />
              </svg>
              {item?.name}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

export default SideBare
