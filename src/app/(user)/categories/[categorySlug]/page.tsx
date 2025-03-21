import React from 'react'

import { getCategories, getCategoryBySlug } from '@/apis/category'

import Breadcrumb from '@/components/ui/BreadCrumb'
import CardCreator from '@/components/ui/CardCreator'
import { notFound } from 'next/navigation'


export async function generateStaticParams() {
    const categories = await getCategories('category')

    return categories.data.map((category) => ({
        categorySlug: category.slug,
    }))
}

const CategoryPage = async ({ params }: { params: Promise<{ categorySlug: string }> }) => {
    const { categorySlug } = await params
    const category = await getCategoryBySlug('category/slug/', categorySlug, 'active')
    if (!category || !category.data) {
        return notFound();
    }
    const breadCrumb = [
        { label: "Categories", href: "/categories" },
        { label: category.data.name }
    ]
    return (
        <div className='m-4'>
            <Breadcrumb items={breadCrumb} />
            <div className="my-4">
                <p>List all creators</p>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {category.data.creators.map((creator) => 
                    (<CardCreator key={creator._id} creator={creator} name={category.data.name} />)
                )}
            </div>
        </div>
    )
}

export default CategoryPage
