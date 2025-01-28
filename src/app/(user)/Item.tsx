import CardCreator from '@/components/ui/CardCreator'
import { Category } from '@/types/category'
import React from 'react'

const Item = async ({ category }: { category: Category }) => {
    if (category.creators.length === 0) {
        return (
            <div>
                <div className="mt-5 mb-4">
                    <h3 className="text-xl">{category.name}</h3>
                </div>
                <div className='text-center'>
                    <h3 className="text-sm">There are no creators in {category.name}</h3>
                </div>
            </div>
        )
    }
    const creatorsToDisplay = category.creators.slice(0, 8);
    const viewMoreToDisplay = category.creators.length - creatorsToDisplay.length
    return (
        <div>
            <div className="mt-5 mb-4">
                <h3 className="text-xl">{category.name}</h3>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {creatorsToDisplay.map((creator) => {
                    if(creator.status === 'active') return (<CardCreator key={creator._id} creator={creator} name={category.name} />)    
                })}
            </div>
            {viewMoreToDisplay ?
                <div className="flex flex-col items-center py-8">
                    <button className="px-4 py-2 text-sm bg-gray-800 border-2 border-gray-500 rounded-lg hover:border-orange-600 hover:text-white transition-colors duration-300 ease-in-out">
                        View more {category.name}
                    </button>
                    <p className="text-gray-500 text-sm mt-3">{category.creators.length + 1} videos</p>
                </div> :
                <div className='border border-gray-800 mt-10'>

                </div>}

        </div>
    )
}

export default Item
