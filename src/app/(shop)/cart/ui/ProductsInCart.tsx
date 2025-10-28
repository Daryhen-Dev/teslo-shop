'use client';
import { useCartStore } from '@/store';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { QuantitySelector } from '@/components';
import Link from 'next/link';

export const ProductsInCart = () => {
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);
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
                  <Link className='hover:underline cursor-pointer' href={`/product/${product.slug}`}>{ `${product.size} - ${product.title}` }</Link>
                  <p>{product.price}</p>
                  <QuantitySelector quantity={product.quantity} onQuantityChanged={quantity => updateProductQuantity(product, quantity)} />
                  <button className="underline mt-3" onClick={() => removeProduct(product)}>Remover</button>
                </div>
              </div>
            ))}
    </>
  )
}
