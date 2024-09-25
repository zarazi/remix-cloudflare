// 'use client'

import { Check } from 'lucide-react'
import { ImageProps, ProductPhotoComponentV2 } from './product-photo'

type ProductColor = {
  name: string
  rgb: string
  image: { [k: string]: ImageProps }
}

interface ProductColorProps {
  productId: string
  color: Partial<ProductColor>
  colorIndex: number
  checked?: boolean
}

export function ProductColorComponent({
  productId,
  color,
  colorIndex,
  checked,
}: ProductColorProps) {
  const image = color.image?.model

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative aspect-[3/4]">
        <label htmlFor={'color-choice-' + colorIndex}>
          <ProductPhotoComponentV2
            src={image?.src}
            alt={image?.alt}
            sizeVariationUrls={image?.sizeVariationUrls}
          />
        </label>
        <div className="absolute top-2 left-2 bg-white rounded-full p-1.5">
          <input
            type="checkbox"
            id={'color-choice-' + colorIndex}
            className="sr-only peer"
            name={'color-choice-' + colorIndex}
            value={color.name}
            defaultChecked={checked === true}
          />
          <label
            htmlFor={'color-choice-' + colorIndex}
            className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500"
          >
            <Check className="w-4 h-4 text-white stroke-4 peer-checked:text-black" />
          </label>
        </div>
      </div>

      <div className="p-4">
        <label
          htmlFor={'color-choice-' + colorIndex}
          className="cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <span
              style={{ backgroundColor: color.rgb }}
              className={`
                    w-6 h-6 rounded-full block
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                    ring-2 ring-gray-500
                  `}
              aria-hidden="true"
            ></span>
            <p className="text-sm text-gray-700">{color.name}</p>
          </div>
        </label>
      </div>
    </div>
  )
}
