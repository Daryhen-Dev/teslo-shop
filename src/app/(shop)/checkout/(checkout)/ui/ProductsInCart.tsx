'use client';
import { useCartStore } from '@/store';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { currencyFormat } from '@/utils';

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState<boolean>(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(()=> {
        setLoaded(true);
    },[])

    if(!loaded) {
        return<p>Loading...</p>
    }

  return (
    <>
                   {/* Items del carrito */}
            {productsInCart.map((product) => (
              <div key={ `${product.slug}-${product.size}`} className="flex mb-5">
                <Image
                  src={`/products/${product.image}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <span> 
                    { product.size} - ${product.title} ({product.quantity})
                  </span>
                  <p className='font-bold'>$ {currencyFormat(product.price * product.quantity)}</p>
                </div>
              </div>
            ))}
    </>
  )
}
