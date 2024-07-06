import { Product } from "@/types/interface"
import Image from "next/image"
import React from "react"

interface Props {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex justify-between items-center border-[1px] border-solid border-gray-600 rounded-md my-2 p-3">
      <div className="flex flex-col">
        <p className="text-gray-800">
          {product.id}. {product.title}
        </p>
        <p className="text-gray-800">
          <span className="font-bold">Category: </span>
          {product.category}
        </p>
        <p className="text-gray-800">
          <span className="font-bold">Brand: </span>
          {product.brand}
        </p>
      </div>
      <Image
        src={product.images[0]}
        alt={"product image"}
        width={70}
        height={70}
        className="w-[70px] h-[70px] object-cover"
      />
    </div>
  )
}

export default ProductCard
