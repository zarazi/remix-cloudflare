// 'use client'

import { ImageProps, ProductPhotoComponentV2 } from './product-photo'

type ProductColor = {
  name: string
  rgb: string
  image: { [k: string]: ImageProps }
}

interface ProductColorProps {
  productId: string
  color: Partial<ProductColor>
}

export function ProductBlankComponent({ productId, color }: ProductColorProps) {
  const image = color.image?.front

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative aspect-[3/4]">
        <ProductPhotoComponentV2
          src={image?.src}
          alt={image?.alt}
          sizeVariationUrls={image?.sizeVariationUrls}
        />
      </div>
    </div>
  )
}
