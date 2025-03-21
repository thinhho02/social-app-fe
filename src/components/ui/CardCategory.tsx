import Image from 'next/image';
import Link from 'next/link';
import { FaFolderOpen } from 'react-icons/fa6';

import { Category } from '@/types/category';


const CardCategory = ({ category }: { category?: Category }) => {
    const linkHref = category ? `/categories/${category.slug}` : `/categories`;
    const content = category ? (
        <>
            <h3 className="text-sm truncate">{category.name}</h3>
            <p className="text-gray-500 text-xs">{category.creators.length} videos</p>
        </>
    ) : (
        <p className="text-sm py-2">All Categories</p>
    );

    return (
        <Link
            href={linkHref}
            className="flex relative z-0 rounded-lg border-2 border-gray-500 hover:border-orange-600 transition-colors duration-300 ease-in-out"
        >
            <div className="w-3/12 relative overflow-hidden">
                {category ?
                    <Image
                        src={category.mediaUrl}
                        alt={category.name}
                        fill
                        className="rounded-tl-lg rounded-bl-lg"
                        loading="lazy"
                    /> :
                    <div className='w-full h-full flex items-center justify-center text-lg border-r border-gray-500'>
                        <FaFolderOpen />
                    </div>}

            </div>

            <div className="w-9/12 flex flex-col p-2 pl-4 justify-center">
                <div className="h-9">{content}</div>
            </div>
        </Link>
    );
};

export default CardCategory
