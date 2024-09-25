// import fs from "fs/promises";

import { json } from "@remix-run/cloudflare";

// export async function getStoredProducts(): Promise<Partial<BaseProduct>[]> {
//   const rawFileContent = await fs.readFile('products.json', { encoding: 'utf-8' })
//   const data = JSON.parse(rawFileContent)
//   const storedProducts = data.products ?? []
//   return storedProducts.filter((product: any) => ['1-2-3-5', '1-2-3-6', '1-2-4-5', '1-2-4-8', '1-42-43-44'].includes(product.id))
// }
export async function getStoredProducts(): Promise<Partial<BaseProduct>[]> {
  // const rawFileContent = await fs.readFile('products.json', { encoding: 'utf-8' })
  const res = await fetch(
    "https://pub-fe1b9d3b1db74f4182ecbbf4daa675eb.r2.dev/products.json"
  );
  const rawFileContent = await res.json();
  const data = rawFileContent as any;
  const storedProducts = data.products ?? [];
  return storedProducts.filter((product: any) =>
    ["1-2-3-5", "1-2-3-6", "1-2-4-5", "1-2-4-8", "1-42-43-44"].includes(
      product.id
    )
  );
}

export async function getStoredProductById(
  productId?: string
): Promise<Partial<BaseProduct> | null> {
  if (!productId) return null;

  const storedProducts = await getStoredProducts();
  return storedProducts.find((product) => product.id === productId) ?? null;
}

// export function storedProducts(products: Partial<BaseProduct>) {
//   return fs.writeFile(
//     "products.json",
//     JSON.stringify({ products: products || [] })
//   );
// }
