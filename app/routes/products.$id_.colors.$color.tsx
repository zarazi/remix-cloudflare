import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'

import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import invariant from 'tiny-invariant'
import { ProductColorComponent } from '~/components/product/product-color'
import { Button, buttonVariants } from '~/components/ui/button'
import { getStoredProductById } from '~/data/products'

export default function CreateProductColorPage() {
  const { product, productColors } = useLoaderData<LoaderData>()
  console.log({ product, productColors })

  const data = useActionData<typeof action>()
  const actionProduct = data?.product ?? null
  console.log({ actionProduct })

  const productColorNames = productColors?.map((c) => c.name) ?? []
  console.log({ productColorNames })
  const actionColors =
    (
      actionProduct && [
        Object.keys(actionProduct)
          .filter((k) => k.startsWith('color-choice-'))
          .map((k) => actionProduct[k]),
      ]
    )?.flat() ?? []
  const chosenColors = [productColorNames, ...actionColors].flat()
  console.log({ productColorNames, actionColors, chosenColors })

  const [isReadyForNext, setIsReadyForNext] = useState<Boolean>(false)

  // Ready when:
  // - actionProduct === null && productColorNames > 0
  // - actionProduct !== null && actionColors > 0
  useEffect(() => {
    setIsReadyForNext(
      (!actionProduct && productColorNames.length > 0) ||
        (!!actionProduct && actionColors.length > 0)
    )
    console.log(document.forms)
  }, [actionProduct, actionColors.length, productColorNames.length])

  const submit = useSubmit()

  return (
    <main className="m-4">
      <h1>Select colors</h1>

      <Form
        method="post"
        id="colorForm"
        onChange={(event) => {
          submit(event.currentTarget)
        }}
      >
        <input type="hidden" name="productId" value={product.id} />
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-0">
          {product.colors?.map((color, index) => {
            return (
              <ProductColorComponent
                key={color.name}
                productId={product.id?.toString()!}
                color={color}
                colorIndex={index}
                checked={chosenColors?.includes(color.name)}
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
          <Button
            type="submit"
            disabled={isReadyForNext === false}
            name="nextStep"
            value="redirect"
          >
            Apply
          </Button>
        </p>
      </Form>
    </main>
  )
}

type LoaderData = {
  product: Partial<BaseProduct>
  productColors?: ProductColor[]
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> {
  const { id, color } = params
  invariant(id, 'Missing id param')
  invariant(color, 'Missing color param')

  const product = await getStoredProductById(id)
  if (!product) {
    throw new Response('Product Not Found', { status: 404 })
  }

  const colorList = color.includes(',') ? color.split(',') : [color]
  console.log({ colorList })

  const productColors = product.colors?.filter((c) =>
    colorList.includes(c.name)
  )
  if (!productColors || productColors.length === 0) {
    throw new Response('Colors Not Found', { status: 404 })
  }
  console.log({ productColors })

  return json({ product, productColors })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const product = Object.fromEntries(formData)
  console.log({ product })

  if (product.nextStep !== 'redirect') {
    return json({ product })
  }

  const productId = product['productId']?.toString()
  const colors = Object.keys(product)
    .filter((k) => k.startsWith('color-choice-'))
    .map((k) => product[k])
  // const color = product['color-choice-' + productId]?.toString()
  return redirect(`/designs/${productId}/colors/${colors.toString()}`)
}
