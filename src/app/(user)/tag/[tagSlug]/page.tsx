import React from 'react'
import dynamic from 'next/dynamic'

import { getTagBySlug, getTags } from '@/apis/tag'
import { incrementViews } from '@/libs/action'

import Breadcrumb from '@/components/ui/BreadCrumb'
import CardCreator from '@/components/ui/CardCreator'
const WrapperCompClient = dynamic(() => import('@/components/ui/WrapperCompClient'))


export async function generateStaticParams() {
    const tags = await getTags('tag')

    return tags.data.map((tag) => ({
        tagSlug: tag.slug,
    }))
}

const CategoryPage = async ({ params }: { params: Promise<{ tagSlug: string }> }) => {
    const { tagSlug } = await params
    const tag = await getTagBySlug('tag/slug/', tagSlug, 'active')
    const breadCrumb = [
        { label: `${tag.data.name}` }
    ]
    return (
        <div className='m-4'>
            <WrapperCompClient slug={tagSlug} path='tag/increment-views/' handleIncrement={incrementViews} />
            <Breadcrumb items={breadCrumb} />
            <div className="my-4">
                <p>List creators by {`${tag.data.name}`}</p>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {tag.data.creators.map((creator) => 
                    (<CardCreator key={creator._id} creator={creator} />)
                )}
            </div>
        </div>
    )
}

export default CategoryPage
