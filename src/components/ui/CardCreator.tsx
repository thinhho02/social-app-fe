import { Creator } from '@/types/creator';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaEye } from 'react-icons/fa6'



const CardCreator = ({ aside, creator, name }: {
    aside?: boolean;
    creator: Creator;
    name?: string;
}) => {
    return (
        <Link href={`/${creator.slug}`}>
            <div className={`${aside ? 'h-36' : 'h-52'} relative rounded-lg overflow-hidden shadow-lg  border-2 border-gray-500 hover:border-orange-600 transition-colors duration-300 ease-in-out`}>
                <Image src={creator.mediaUrl} alt="Category 1" fill />
                <span className={`absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold ${name || aside ? 'px-2 py-1' : ''} rounded`}>{aside ? creator.category.name : name}</span>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 text-xs mt-2">
                    <FaEye />
                    <span className="">{creator.views}</span>
                </div>
            </div>
            <div className="py-4">
                <p className="text-sm text-white">{creator.name}</p>
            </div>
        </Link>
    )
}

export default CardCreator
