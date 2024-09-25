// 'use client'

import { useState } from 'react'
import { ImageProps, ProductPhotoComponentV2 } from './product-photo'
import { Check } from 'lucide-react'

// const colors = [
//   { name: 'Black', class: 'bg-[rgb(0,0,0)]' },
//   { name: 'White', class: 'bg-[rgb(255,255,255)]' },
//   { name: 'Grey melange', class: 'bg-[rgb(193,193,193)]' },
//   { name: 'Sand', class: 'bg-[rgb(207,177,148)]' },
//   { name: 'Maroon', class: 'bg-[rgb(77,38,56)]' },
// ]

type ProductColor = {
  name: string
  rgb: string
  image: { [k: string]: ImageProps }
}

interface ProductCardProps {
  productId: string
  productName: string
  productPrice: string
  colors: Partial<ProductColor>[]
  currentColorName: string
  checked?: boolean
}

export function ProductCardComponent({
  productId,
  productName,
  productPrice,
  colors,
  currentColorName,
  checked,
}: ProductCardProps) {
  const currentColorId = colors.findIndex(
    (color) => color.name == currentColorName
  )
  const currentColor = colors[currentColorId] ?? colors[0]
  const [selectedColor, setSelectedColor] = useState(currentColor.name)
  const image = currentColor?.image?.model

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative aspect-[3/4]">
        <label htmlFor={'select-product-' + productId}>
          <ProductPhotoComponentV2
            src={image?.src}
            alt={image?.alt}
            sizeVariationUrls={image?.sizeVariationUrls}
          />
        </label>
        <div className="absolute top-2 left-2 bg-white rounded-full p-1.5">
          <input
            type="radio"
            id={'select-product-' + productId}
            className="sr-only peer"
            name="product"
            value={productId}
            defaultChecked={checked === true}
          />
          <label
            htmlFor={'select-product-' + productId}
            className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500"
          >
            <Check className="w-4 h-4 text-white stroke-4 peer-checked:text-black" />
          </label>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{productName}</h2>
        <p className="text-sm text-gray-600 mt-1">From {productPrice}</p>
        <fieldset className="mt-3">
          <legend className="sr-only">Choose a color</legend>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <label key={color.name} className="relative">
                <input
                  type="radio"
                  name={`color-choice-` + productId}
                  value={color.name}
                  checked={selectedColor === color.name}
                  onChange={() => setSelectedColor(color.name)}
                  className="sr-only"
                />
                <span
                  style={{ backgroundColor: color.rgb }}
                  className={`
                    w-6 h-6 rounded-full cursor-pointer block
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                    ${
                      selectedColor === color.name
                        ? 'ring-2 ring-gray-500'
                        : 'ring-1 ring-gray-200'
                    }
                  `}
                  aria-hidden="true"
                ></span>
                <span className="sr-only">{color.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  )
}
