import { useEffect,useState } from "react";
import { getProducts, type GetProductsResponse } from "@/api/products";
import type { IProduct } from "@/types";
export default function Shop() {
  const [products, setProducts] = useState<GetProductsResponse>({success:false,count:0,currentPage:0,totalPages:0,totalProducts:0,data:[]});
  useEffect(() => {
    (async()=>{
      const products = await getProducts();
      console.log("Products in Shop page:", products);
      if(!products) return;
      setProducts(products);
    })();
  }, []);
  return (
    <>
    <div className="flex gap-2 w-full bg-white py-8 px-8 text-gray-600 text-sm">
      <p>Home</p>
      <p>{">"}</p>
      <p>Casual</p>
    </div>
    <div className="flex w-full bg-white px-8">
      {/* Sidebar Filters */}
      <aside className="w-64 h-full p-6 border border-gray-200 rounded-md hidden lg:block">
        <h2 className="text-lg
         font-semibold mb-4">Filters</h2>

        {/* Categories */}
        <div className="mb-6">
          <ul className="space-y-1 text-gray-600 text-sm">
            <li>T-shirts</li>
            <li>Shorts</li>
            <li>Shirts</li>
            <li>Hoodie</li>
            <li>Jeans</li>
          </ul>
        </div>

        {/* Price Slider */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Price</h3>
          <input type="range" className="w-full" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>$50</span>
            <span>$200</span>
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Colors</h3>
          <div className="grid grid-cols-5 gap-2">
              <p className="w-6 h-6 bg-green-500 rounded-full cursor-pointer "></p>
              <p className="w-6 h-6 bg-red-500 rounded-full cursor-pointer "></p>
              <p className="w-6 h-6 bg-yellow-500 rounded-full cursor-pointer "></p>
              <p className="w-6 h-6 bg-orange-500 rounded-full cursor-pointer "></p>
              <p className="w-6 h-6 bg-sky-500 rounded-full cursor-pointer"></p>
              <p className="w-6 h-6 bg-blue-700 rounded-full cursor-pointer"></p>
              <p className="w-6 h-6 bg-purple-600 rounded-full cursor-pointer"></p>
              <p className="w-6 h-6 bg-pink-500 rounded-full cursor-pointer"></p>
              <p className="w-6 h-6  rounded-full cursor-pointer border"></p>
              <p className="w-6 h-6 bg-black rounded-full cursor-pointer"></p>
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2 text-gray-500 text-sm">
            <button className="px-3 py-1 bg-gray-100 border rounded-2xl" >XX-Small</button>
            <button className="px-3 py-1 bg-gray-100 border rounded-2xl">X-Small</button>
            <button className="px-3 py-1 bg-gray-100 border rounded-2xl">Small</button>
            <button className="px-3 py-1 bg-gray-100 border rounded-2xl">Medium</button>
            <button className="px-3 py-1 bg-black text-white border rounded-2xl">Large</button>
            <button className="px-3 py-1 bg-gray-100 border rounded-2xl">X-Large</button>
            <button className="px-3 py-1 bg-gray-100 border rounded-2xl">XX-Large</button>
            <button className="px-3 py-1 bg-gray-100 border rounded-2xl">3X-Large</button>
            <button className="px-3 py-1 bg-gray-100 border rounded-2xl">4X-Large</button>
          </div>
        </div>


        {/* Dress Style */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Dress Style</h3>
          <ul className="space-y-1 text-gray-600 text-sm">
            <li>Casual</li>
            <li>Formal</li>
            <li>Party</li>
            <li>Gym</li>
          </ul>
        </div>
        <button className="w-full bg-black text-white py-2 rounded-lg mt-4">Apply Filter</button>
      </aside>

      {/* Products Section */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Casual</h2>
          <p className="text-sm text-gray-500">Showing 1-10 of 100 Products</p>
        </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {products && products.data && products.data.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>


        {/* Previous/Next */}
        <div className="flex justify-between items-center mt-10 gap-3">
          <button className="px-4 py-2 border rounded-lg"> <span className="font-bold">← </span>Previous</button>
          <div className="flex">
          <p className="px-3 py-1  border rounded-lg cursor-pointer">1</p>
          <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">2</p>
          <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">3</p>
          <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">...</p>
          <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">8</p>
          <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">9</p>
          <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">10</p>
          </div>
          <button className="px-4 py-2 border rounded-lg">Next<span className="font-bold"> →</span></button>
        </div>
      </main>
    </div>

    </>
  );
} 

function ProductCard({product}: {product: IProduct}) {
  return(
            <div className="p-4 border rounded-xl">
               <img className="w-full h-52 rounded-lg mb-3 " src={product.thumbnail} alt="shirt1" />
              <h3 className="font-medium mb-1">{product.title}</h3>
              <p className="text-gray-500 text-sm mb-1">⭐⭐⭐☆ ({product.rating})</p>
              <p className="font-semibold">${product.price}</p>
            </div>
  )
}