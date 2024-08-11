import React from 'react'

const CategoryBar = () => {

    const category = [
        {
            thumbnail: './category/mobile&tablet.webp',
            name: 'Mobiles & Tablets'
        },
        {
            thumbnail: './category/Tv&applience.webp',
            name: 'TVs & Appliances'
        },
        {
            thumbnail: './category/electronics.webp',
            name: 'Electronics'
        },
        {
            thumbnail: './category/fashion.webp',
            name: 'Fashion'
        },
        {
            thumbnail: './category/beauty.webp',
            name: 'Beauty'
        },
        {
            thumbnail: './category/home&kitchen.webp',
            name: 'Home & Kitchen'
        },
        {
            thumbnail: './category/furniture.webp',
            name: 'Furniture'
        },
        {
            thumbnail: './category/grocery.webp',
            name: 'Grocery'
        },
    ]

  return (
    <div className='bg-white flex gap-16 justify-center items-center py-2 pt-4'>
        {
            category.map((cat, index) => {
                return(
                    <div className='flex flex-col justify-center items-center'>
                        <img src={cat.thumbnail} alt="category-img" className='w-12 h-12 '/>
                        <p className='flex items-center justify-center pt-1 font-bold text-sm'>{cat.name}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default CategoryBar
