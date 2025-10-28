export const revalidate = 604800; // 7dias
import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/confg/fonts";
import { get } from "http";
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params:{
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const product = await getProductBySlug(slug) 
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
  }
}
 


export default async function({ params}: Props){
  const {slug} = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound()
  }


  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
          {/* Mobile slideshow */}
            <ProductMobileSlideshow 
            title={product.title} 
            images={product.images}
            className="block md:hidden"/>
          {/* Desktop */}
          <ProductSlideshow 
          title={product.title} 
          images={product.images} 
          className="hidden md:block" />
      </div>
      {/* DEtalles */}
      <div className="col-span-1 px-5 ">
          <StockLabel slug={product.slug}/>
          <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
            {product.title}
          </h1>
          <p className="text-lg mb-5 ">${product.price}</p>
          <AddToCart product={product} />
          {/*Descripcion */}
          <h3 className="font-bold text-sm">Descripción</h3>
          <p className="font-light">
              {product.description}
          </p>
      </div>
    </div>
  )
}
