export const revalidate = 60; // 1 minuto

import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@/app/generated/prisma";
import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

import { redirect } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
  params: {
    gender: Category;
  },
  searchParams?: { 
    page?: string;
  }
}

export default async function ({ params, searchParams }: Props) {
  const { gender } = await params;

      const page = searchParams?.page ? parseInt(searchParams.page) : 1
  
      const{ products, currentPage, totalPages} = await getPaginatedProductsWithImages({page, gender: gender as Gender})
  
  
      if(products.length === 0){
        redirect(`/gender/${gender}`)
      }


  const labels: Record<string, string> = {
    'men':'para hombres',
    'women':'para mujeres',
    'kid':'para niños',
    'unisex': 'para todos'
  }
  // if (id === 'kids') {
  //   notFound()
  // }
  return (
    <>
      <Title title={`Articulos ${labels[gender]}`} subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
      {/* <div>Category Page {id}</div> */}
    </>
  );
}
