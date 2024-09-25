export interface ImageProps {
  src?: string
  alt?: string
  sizes?: string
  sizeVariationUrls?: {
    width: number
    url: string
  }[]
}

export function ProductPhotoComponent({ src, alt }: ImageProps) {
  return (
    <div className="flex aspect-[3/4]">
      <img
        alt={alt}
        loading="lazy"
        decoding="async"
        data-nimg="fill"
        className="grow object-cover object-top"
        sizes="30vw"
        // srcSet="https://cdn.sanity.io/images/d23kb9v2/production/192300606211e44e277e95e97dac0c6eccac39b8-2700x3300.png?rect=472,83,1755,3135&amp;w=256&amp;q=85&amp;auto=format 256w, https://cdn.sanity.io/images/d23kb9v2/production/192300606211e44e277e95e97dac0c6eccac39b8-2700x3300.png?rect=472,83,1755,3135&amp;w=384&amp;q=85&amp;auto=format 384w, https://cdn.sanity.io/images/d23kb9v2/production/192300606211e44e277e95e97dac0c6eccac39b8-2700x3300.png?rect=472,83,1755,3135&amp;w=640&amp;q=85&amp;auto=format 640w, https://cdn.sanity.io/images/d23kb9v2/production/192300606211e44e277e95e97dac0c6eccac39b8-2700x3300.png?rect=472,83,1755,3135&amp;w=1080&amp;q=85&amp;auto=format 1080w, https://cdn.sanity.io/images/d23kb9v2/production/192300606211e44e277e95e97dac0c6eccac39b8-2700x3300.png?rect=472,83,1755,3135&amp;w=1920&amp;q=85&amp;auto=format 1920w"
        src={src}
      ></img>
    </div>
  )
}

export function ProductPhotoComponentV2({
  src,
  alt,
  sizes,
  sizeVariationUrls = [],
}: ImageProps) {
  const srcSet = sizeVariationUrls
    .map(
      (variation: { url: any; width: any }) =>
        `${variation.url} ${variation.width}w`
    )
    .join(', ')
  console.log({ srcSet })
  return (
    <>
      <img
        src={src}
        alt={alt}
        sizes={sizes ?? '16vw'}
        srcSet={srcSet}
        className="absolute h-full w-full grow object-cover object-top cursor-pointer"
      />
    </>
  )
}
