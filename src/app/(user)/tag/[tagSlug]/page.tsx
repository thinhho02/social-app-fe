import { getTagBySlug, getTags, incrementViewsTag } from '@/apis/tag'
import Breadcrumb from '@/components/ui/BreadCrumb'
import CardCreator from '@/components/ui/CardCreator'
import React from 'react'

export async function generateStaticParams() {
    const tags = await getTags('tag')

    return tags.data.map((tag) => ({
        tagSlug: tag.slug,
    }))
}

async function logPageVisit(tagSlug: string) {
    try {
        const res = await incrementViewsTag('tag/increment-views/', tagSlug)
        if (!res.message) {
            throw new Error('Failed to log page visit')
        }
    } catch (error) {
        throw new Error('Something wrong')
    }
}

const CategoryPage = async ({ params }: { params: Promise<{ tagSlug: string }> }) => {
    const { tagSlug } = await params
    const tag = await getTagBySlug('tag/slug/', tagSlug)
    await logPageVisit(tagSlug)
    const breadCrumb = [
        { label: `${tag.data.name}#${tag.data.slug}` }
    ]
    return (
        <div className='m-4'>
            <Breadcrumb items={breadCrumb} />
            <div className="my-4">
                <p>List creators by {`${tag.data.name}#${tag.data.slug}`}</p>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {tag.data.creators.map((creator) => {
                    if (creator.status === 'active') return (<CardCreator key={creator._id} creator={creator} />)
                })}
            </div>
        </div>
    )
}

export default CategoryPage
