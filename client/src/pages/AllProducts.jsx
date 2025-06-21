import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { assets } from '../assets/assets'

function AllProducts() {
    const {products,searchQuery} = useAppContext()
    const [filteredProducts,setFilteredProducts] = useState([])

    useEffect(()=>{
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter(product =>product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }else{
            setFilteredProducts(products)
        }
    },[products,searchQuery])

  return (
    <div className='mt-16 flex flex-col'>
  <div className='flex flex-col items-end w-max'>
    <p className='text-2xl font-medium uppercase'>All  Products</p>
    <div className='w-16 h-0.5 bg-primary rounded-full'></div>
  </div>

  {filteredProducts.length > 0 ? (
 <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
 {filteredProducts.filter((product)=>product.inStock).map((product,index)=>(
     <ProductCard key={index} product={product}/>
 ))}
 </div>
  ):
  (
    <div className="flex items-center justify-center w-full">
    <div className="flex flex-col items-center justify-center gap-4 p-6 ">
      <img
        src={assets.Product_Not_Found}
        alt="Product Not Found"
        className="w-60 md:w-100"
      />
      <h1 className="text-xl md:text-2xl font-semibold">
        This product is not available
      </h1>
    </div>
  </div>
  )}

  {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
{filteredProducts.filter((product)=>product.inStock).map((product,index)=>(
    <ProductCard key={index} product={product}/>
))}
  </div>
  {filteredProducts.length === 0 && (
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center gap-4 p-6 ">
            <img
              src={assets.Product_Not_Found}
              alt="Product Not Found"
              className="w-60 md:w-100"
            />
            <h1 className="text-xl md:text-2xl font-semibold">
              This product is not available
            </h1>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default AllProducts