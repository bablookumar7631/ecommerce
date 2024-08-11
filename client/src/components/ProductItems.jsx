import React from 'react'

const ProductItems = () => {

    const products = [
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 50,
            thumbnail: './product/prod1.webp'
        },
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 15,
            thumbnail: './product/prod1.webp'
        },
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 15,
            thumbnail: './product/prod1.webp'
        },
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 15,
            thumbnail: './product/prod1.webp'
        },
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 15,
            thumbnail: './product/prod1.webp'
        },
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 15,
            thumbnail: './product/prod1.webp'
        },
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 15,
            thumbnail: './product/prod1.webp'
        },
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 15,
            thumbnail: './product/prod1.webp'
        },
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 15,
            thumbnail: './product/prod1.webp'
        },
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 15,
            thumbnail: './product/prod1.webp'
        },
        {
            title: 'New blue shirts mens',
            price: 1200,
            discount: 15,
            thumbnail: './product/prod1.webp'
        }
    ]

  return (
    <div>
      <div className="md:p-14 p-8">
        <h1 className="text-3xl font-bold text-center">Products</h1>
        <p className="text-center mx-auto text-gray-600 md:w-7/12 mt-2 mb-16">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod accusantium iusto, consequatur, officiis sapiente iure nisi aspernatur est corporis dolor ratione adipisci</p>

        <div className="md:w-10/12 mx-auto grid md:grid-cols-4 gap-12">
            {
                products.map((item, index)=>(
                    <div key={index} className="bg-white shadow-lg border">
                        <img src={item.thumbnail} />
                        <div className="p-4">
                            <h1 className="text-lg font-semibold">{item.title}</h1>
                            <div className="space-x-2">
                                <label className="font-bold text-lg">₹{item.price-(item.price*item.discount)/100}</label>
                                <del>₹{item.price}</del>
                                <label className="text-gray-600">({item.discount}%)</label>
                            </div>
                            <button className="bg-green-500 py-2 w-full rounded text-white font-semibold mt-4">Buy Now</button>
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default ProductItems
