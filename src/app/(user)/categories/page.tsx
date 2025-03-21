import React from 'react'

import { getCategories } from '@/apis/category'

import Breadcrumb from '@/components/ui/BreadCrumb'
import CardCategory from '@/components/ui/CardCategory'

const breadCrumb = [
  { label: "Categories" }
]

const CategoriesPage = async () => {
  const categories = await getCategories('category', 0, 'active')
  return (
    <div className='m-4'>
      <Breadcrumb items={breadCrumb} />
      <div className="my-4">
        <p>List all categories</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {categories.data.map((category) => (<CardCategory key={category._id} category={category} />))}
      </div>
    </div>

  )
}

export default CategoriesPage
