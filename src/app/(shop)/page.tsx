export const revalidate = 60 // 1 minuto


import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { initialData } from '@/seed/seed'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
  searchParams?: { 
    page?: string;
  }
}
export default async function Home({searchParams} : Props ) {
    // Esperamos a que searchParams esté disponible
    const params = await Promise.resolve(searchParams)
    const page = Number(params?.page || 1)


    const{ products, currentPage, totalPages} = await getPaginatedProductsWithImages({page})


    if(products.length === 0){
      redirect('/')
    }

  return (
    <>
        <Title title='Tienda' subtitle='Todos los productos' className='mb-2' />
        <ProductGrid products={products} />
        <Pagination totalPages={totalPages} />
    </>
  )
}
