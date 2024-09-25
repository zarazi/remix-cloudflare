type BaseProduct = {
  id: string
  name: string
  colors: ProductColor[]
}
type ProductColor = {
  id: string
  name: string
  rgb: string
  image: Record<string, any>
}
