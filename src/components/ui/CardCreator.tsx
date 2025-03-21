import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { FaComment, FaEye, FaHand } from 'react-icons/fa6'

import { Creator } from '@/types/creator';



const CardCreator = ({ aside, creator, name }: {
    aside?: boolean;
    creator: Creator;
    name?: string;
}) => {
    return (
        <div>
            <div className={`${aside ? 'h-36' : 'h-52'} flex flex-col relative rounded-lg overflow-hidden shadow-lg border-2 border-gray-500`}>
                <span className={`absolute z-10 top-2 left-2 bg-orange-600 text-white text-xs font-bold ${name || aside ? 'px-2 py-1' : ''} rounded`}>{aside ? creator.category.name : name}</span>
                <Link href={`/${creator.slug}`} className='relative h-full hover:border-2 rounded-lg hover:border-orange-600 transition-colors duration-300 ease-in-out'>
                    <Image src={creator.mediaUrl} className='rounded-lg' alt="Category 1" fill loading="lazy" />
                </Link>

                {!aside && <div className='flex items-center justify-between border-t text-sm w-full p-2'>
                    <button className='flex items-center justify-between gap-2 mx-auto px-4 py-1 rounded-lg hover:bg-gray-700 '>
                        <FaHand />
                        <p>Like</p>
                    </button>
                    <button className='flex items-center justify-between gap-2 mx-auto px-4 py-1 rounded-lg hover:bg-gray-700 '>
                        <FaComment />
                        <p>Comment</p>
                    </button>
                </div>}
            </div>
            <div className="flex items-center justify-between py-2">
                <p className="text-sm text-white truncate pr-2">{creator.name}</p>
                <div className="flex items-center justify-center gap-1 text-xs">
                    <FaEye />
                    <span className="">{creator.views}</span>
                </div>
            </div>
        </div>
    )
}

export default CardCreator
