import { debounce } from "@/utils/index"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useState } from "react"

interface Props {
  handleSideBare: (a: boolean) => void
}

const Header: React.FC<Props> = ({ handleSideBare }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearchChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams)
      params.delete("category")
      if (e.target.value) {
        params.set("q", e.target.value)
      } else {
        params.delete("q")
      }
      replace(`${pathname}?${params.toString()}`)
    },
    1000
  )

  return (
    <div className="flex items-center px-4 py-2">
      <button
        className="text-gray-500 md:hidden focus:outline-none focus:text-gray-700"
        onClick={() => handleSideBare(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <input
        className="mx-4 w-full border rounded-md px-4 py-2 text-gray-500"
        type="text"
        placeholder="Search"
        defaultValue={searchParams.get("q")?.toString()}
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default Header
