import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { FaEye, FaPlay } from 'react-icons/fa6'

import { getCategories, getCategoryByID } from '@/apis/category'
import { getCreatorBySlug, getCreators } from '@/apis/creator'
import { incrementViews } from '@/libs/action'

import Breadcrumb from '@/components/ui/BreadCrumb'
import CardCategory from '@/components/ui/CardCategory'
import CardCreator from '@/components/ui/CardCreator'
const WrapperCompClient = dynamic(() => import('@/components/ui/WrapperCompClient'))


export async function generateStaticParams() {
    const creators = await getCreators('creator')

    return creators.data.map((creator) => ({
        creatorSlug: creator.slug,
    }))
}

const CreatorPage = async ({ params }: { params: Promise<{ creatorSlug: string }> }) => {
    const { creatorSlug } = await params
    const categories = await getCategories('category', 9, 'active')
    const creator = await getCreatorBySlug('creator/slug/', creatorSlug)
    const categoryByID = await getCategoryByID('category/', creator.data.category._id, 'active')

    const moreCreator = categoryByID.data.creators.filter((data) => data.slug !== creatorSlug)
    const breadCrumb = [
        { label: creator.data.category.name, href: `/categories/${creator.data.category.slug}` },
        { label: creator.data.name }
    ]
    return (
        <div className="text-white min-h-screen p-6">
            <WrapperCompClient slug={creatorSlug} path='creator/increment-views/' handleIncrement={incrementViews} />
            <Breadcrumb items={breadCrumb} />

                <div className="flex flex-col gap-5 mt-7">
                    <div className="">
                        <button className="relative rounded-lg w-full h-[500px] bg-black">
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-white z-10'><FaPlay /></div>
                            <Image src={creator.data.mediaUrl} alt='' fill objectFit='contain' />
                        </button>
                    </div>
                    <div className="flex-1">
                        <div className='w-full flex items-center justify-between'>
                            <h2 className="text-2xl font-bold mb-4">{creator.data.name}</h2>
                            <p className="text-xs mb-4 flex items-center gap-2"><FaEye /> {creator.data.views}</p>
                        </div>
                        <p className="text-gray-400 text-sm py-5 mb-6 border-b border-t border-gray-700">
                            {creator.data.description}
                        </p>
                        <div className='mb-5'>
                            <div className="mb-4">
                                <p>Categories</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                                {categories.data.map((category) => (<CardCategory key={category._id} category={category} />))}
                                <CardCategory />
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <p>Tags</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">

                                {creator.data.tags.map((tag) => (
                                    <Link
                                        href={`/tag/${tag.slug}`}
                                        key={tag._id}
                                        className="bg-gray-800 py-1 px-2 text-xs rounded-lg hover:bg-gray-700"
                                    >
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-4">More:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {moreCreator.map((dataCreator) => {
                            return (<CardCreator key={dataCreator._id} creator={dataCreator} name={categoryByID.data.name} />)
                        })}
                    </div>
                </div>
        </div>
    )
}

export default CreatorPage
