import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import {
  ProductBlankComponent,
  ProductPhotoComponentV2,
} from '~/components/product'
import { buttonVariants } from '~/components/ui/button'
import { getStoredProductById } from '~/data/products'

export default function DesignProductPage() {
  const { product, productColors } = useLoaderData<typeof loader>()
  console.log({ product, productColors })

  const colorList = productColors.map((c) => c.name)

  return (
    <main className="m-4">
      <h1>Design product</h1>
      <p className="mt-8 text-2xl">{product.name}</p>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-0">
        {productColors.map((color) => {
          return (
            <ProductBlankComponent
              key={color.name}
              productId={product.id?.toString()!}
              color={color}
            />
          )
        })}
      </div>
      <p className="text-right">
        <Link
          to={`/products/${product.id}`}
          className={`mr-2 ` + buttonVariants()}
        >
          Change item
        </Link>
        <Link
          to={`/products/${product.id}/colors/${colorList.toString()}`}
          className={`mr-2 ` + buttonVariants()}
        >
          Change color
        </Link>
      </p>
    </main>
  )
}

type LoaderData = {
  product: Partial<BaseProduct>
  productColors: ProductColor[]
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> {
  const { id, colors } = params
  invariant(id, 'Missing id param')
  invariant(colors, 'Missing colors param')

  const product = await getStoredProductById(id)
  if (!product) {
    throw new Response('Product Not Found', { status: 404 })
  }

  const productColors = product.colors?.filter((c) => colors.includes(c.name))
  if (!productColors || productColors.length === 0) {
    throw new Response('Colors Not Found', { status: 404 })
  }

  return json({ product, productColors })
}
