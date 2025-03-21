import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBars, FaSistrix } from 'react-icons/fa6'

import LeftMenu from './LeftMenu'

const NavBar = () => {

    return (
        <nav className='fixed bg-[--background] w-full z-20 top-0 start-0 border-b border-gray-700'>
            <div className='relative max-w-7xl mx-auto'>
                <div className='flex items-center justify-between pt-1'>
                    <Suspense fallback={<FaBars />}>
                        <LeftMenu />
                    </Suspense>

                    <Link href={'/'}>
                        <Image src='/hummingbird-309492.svg' alt="" width={50} height={50} priority />
                    </Link>
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <FaSistrix />
                        </div>
                        <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm border rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 text-white" placeholder="Search..." />
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default NavBar