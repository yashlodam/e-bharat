import React, { useContext } from 'react'
import myContext from '../../../../context/data/myContext'

function AddProduct() {
    const context = useContext(myContext)
    const { products, setProducts, addProduct } = context

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>

                    <input 
                        type="text"
                        onChange={(e) => setProducts({ ...products, title: e.target.value })}
                        value={products.title}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none'
                        placeholder='Product title'
                    />

                    <input 
                        type="text"
                        onChange={(e) => setProducts({ ...products, price: e.target.value })}
                        value={products.price}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none'
                        placeholder='Product price'
                    />

                    <input 
                        type="text"
                        onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                        value={products.imageUrl}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none'
                        placeholder='Product imageUrl'
                    />

                    <input 
                        type="text"
                        onChange={(e) => setProducts({ ...products, category: e.target.value })}
                        value={products.category}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none'
                        placeholder='Product category'
                    />

                    <textarea 
                        cols="30" 
                        rows="10"
                        name='description'
                        value={products.description}  // FIXED
                        onChange={(e) => setProducts({ ...products, description: e.target.value })}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none'
                        placeholder='Product desc'
                    ></textarea>

                    <button
                        onClick={addProduct}
                        className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'
                    >
                        Add Product
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AddProduct
