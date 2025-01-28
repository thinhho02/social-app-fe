import { getCategories } from '@/apis/category'
import Breadcrumb from '@/components/ui/BreadCrumb'
import CardCategory from '@/components/ui/CardCategory'
import React from 'react'

const breadCrumb = [
  { label: "Categories" }
]

const CategoriesPage = async () => {
  const categories = await getCategories('category')
  return (
    <div className='m-4'>
      <Breadcrumb items={breadCrumb} />
      <div className="my-4">
        <p>List all categories</p>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {categories.data.map((category) => (<CardCategory key={category._id} category={category} />))}
      </div>
    </div>

  )
}

export default CategoriesPage
