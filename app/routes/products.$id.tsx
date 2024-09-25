import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'

import { Form, useActionData, useLoaderData, useSubmit } from '@remix-run/react'
import { Key, useEffect, useState } from 'react'
import { ProductCardComponent } from '~/components/product'
import { Button } from '~/components/ui/button'
import { getStoredProductById, getStoredProducts } from '~/data/products'

export default function CreateProductPage() {
  const { products, productId } = useLoaderData<typeof loader>()
  console.log({ products, productId })

  const data = useActionData<typeof action>()
  const actionProduct = data?.product ?? null
  console.log({ actionProduct })

  const actionProductId = actionProduct?.product
  const chosenProductId = actionProductId ?? productId
  console.log({ actionProductId, chosenProductId })

  const [isReadyForNext, setIsReadyForNext] = useState<Boolean>(false)

  // Ready when:
  // - productId !== null && actionProductId === null
  // - productId !== null && actionProductId !== null
  // - productId === null && actionProductId !== null
  useEffect(() => {
    setIsReadyForNext(
      (productId !== null && !actionProductId) || !!actionProductId
    )
  }, [actionProduct?.product != null])

  const submit = useSubmit()

  return (
    <main className="m-4">
      <h1>Select item</h1>

      <Form
        method="post"
        id="productForm"
        onChange={(event) => {
          submit(event.currentTarget)
        }}
      >
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-0">
          {products.map((product) => {
            const productId = product.id?.toString()!
            const currentColorName =
              actionProduct?.['color-choice-' + productId] ?? 'Black'

            return (
              <ProductCardComponent
                key={product.id}
                productId={product.id?.toString()!}
                productName={product.name?.toString()!}
                productPrice="$7.99"
                colors={product.colors ?? []}
                currentColorName={currentColorName.toString()}
                checked={chosenProductId === product.id}
              />
            )
          })}
        </div>
        <p className="text-right">
          <Button
            type="submit"
            disabled={!isReadyForNext}
            name="nextStep"
            value="redirect"
          >
            Next
          </Button>
        </p>
      </Form>
    </main>
  )
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { id: productId } = params
  console.log({ productId })

  if (productId && productId !== 'new') {
    const product = productId && (await getStoredProductById(productId))
    if (!product) {
      throw new Response('Product Not Found', { status: 404 })
    }
  }

  const products = await getStoredProducts()

  return json({ products, productId: productId === 'new' ? null : productId })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const product = Object.fromEntries(formData)
  console.log({ product })

  if (product.nextStep !== 'redirect') {
    return json({ product })
  }

  const productId = product['product']?.toString()
  const color = product['color-choice-' + productId]?.toString()
  return redirect(`/products/${productId}/colors/${color}`, 302)

  // const url = new URL(request.url)
  // console.log(url)
  // url.searchParams.set('p', p)
  // const redirectUrl = `${url.origin}${url.pathname}${url.search}`
}
